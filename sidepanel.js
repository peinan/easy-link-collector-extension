// Side panel script for URL Collector extension

let isCollectionMode = false;
let urlList = [];

// DOM elements
const modeToggle = document.getElementById('modeToggle');
const modeStatus = document.getElementById('modeStatus');
const urlListContainer = document.getElementById('urlList');
const urlCount = document.getElementById('urlCount');
const completeButton = document.getElementById('completeButton');
const clearAllButton = document.getElementById('clearAllButton');
const exportClipboard = document.getElementById('exportClipboard');
const exportCSV = document.getElementById('exportCSV');
const exportJSON = document.getElementById('exportJSON');
const notification = document.getElementById('notification');
const addCurrentPageBtn = document.getElementById('addCurrentPageBtn');
const addAllLinksBtn = document.getElementById('addAllLinksBtn');

// Initialize
updateURLList();
updateCompleteButton();

// Quick action buttons
addCurrentPageBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      urlList.push(tab.url);
      updateURLList();
      showNotification('Current page URL added');
    }
  } catch (error) {
    console.error('Failed to add current page URL:', error);
    showNotification('Failed to add current page URL', 'error');
  }
});

addAllLinksBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject content script if not already injected
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    } catch (e) {
      // Script might already be injected, continue
    }
    
    // Request all links from the page
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_ALL_LINKS' });
    
    if (response && response.links && response.links.length > 0) {
      const addedCount = response.links.length;
      urlList.push(...response.links);
      updateURLList();
      showNotification(`Added ${addedCount} links from the page`);
    } else {
      showNotification('No links found on the page', 'error');
    }
  } catch (error) {
    console.error('Failed to add all links:', error);
    showNotification('Failed to add all links', 'error');
  }
});

// Mode toggle event
modeToggle.addEventListener('change', async (e) => {
  isCollectionMode = e.target.checked;
  updateModeStatus();
  
  // Get current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (isCollectionMode) {
    // Inject content script and enable collection mode
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      
      // Send message to enable collection mode
      await chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_COLLECTION' });
    } catch (error) {
      console.error('Failed to inject content script:', error);
      showNotification('Failed to inject content script', 'error');
      modeToggle.checked = false;
      isCollectionMode = false;
      updateModeStatus();
    }
  } else {
    // Disable collection mode
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'DISABLE_COLLECTION' });
    } catch (error) {
      console.error('Failed to disable collection mode:', error);
    }
  }
});

// Update mode status display
function updateModeStatus() {
  if (isCollectionMode) {
    modeStatus.textContent = 'Collecting';
    modeStatus.classList.add('active');
  } else {
    modeStatus.textContent = 'Stopped';
    modeStatus.classList.remove('active');
  }
}

// Listen for URL collection messages and mode changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'URL_COLLECTED') {
    addURL(message.url);
  } else if (message.type === 'COLLECTION_MODE_CHANGED') {
    // Update UI to reflect mode change from keyboard shortcut
    isCollectionMode = message.enabled;
    modeToggle.checked = isCollectionMode;
    updateModeStatus();
  }
});

// Add URL to list
function addURL(url) {
  urlList.push(url);
  updateURLList();
  showNotification('URL added');
}

// Update URL list display
function updateURLList() {
  urlCount.textContent = urlList.length;
  
  // Enable/disable clear all button
  clearAllButton.disabled = urlList.length === 0;
  
  // Update complete button state
  updateCompleteButton();
  
  if (urlList.length === 0) {
    urlListContainer.innerHTML = `
      <div class="empty-state">
        Turn on selection mode and click links on the page
      </div>
    `;
    return;
  }
  
  urlListContainer.innerHTML = '';
  
  urlList.forEach((url, index) => {
    const item = document.createElement('div');
    item.className = 'url-item';
    
    const input = document.createElement('textarea');
    input.value = url;
    input.rows = 1;
    input.addEventListener('input', (e) => {
      urlList[index] = e.target.value;
      // Auto-resize textarea
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    });
    // Initial resize
    setTimeout(() => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    }, 0);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = 'Delete';
    deleteBtn.style.marginTop = '8px';
    deleteBtn.addEventListener('click', () => {
      urlList.splice(index, 1);
      updateURLList();
    });
    
    item.appendChild(input);
    item.appendChild(deleteBtn);
    urlListContainer.appendChild(item);
  });
}

// Update complete button state based on checkboxes
function updateCompleteButton() {
  const anyChecked = exportClipboard.checked || exportCSV.checked || exportJSON.checked;
  completeButton.disabled = !anyChecked || urlList.length === 0;
}

// Add listeners to checkboxes
exportClipboard.addEventListener('change', updateCompleteButton);
exportCSV.addEventListener('change', updateCompleteButton);
exportJSON.addEventListener('change', updateCompleteButton);

// Clear all button event
clearAllButton.addEventListener('click', () => {
  if (confirm('Delete all URLs?')) {
    urlList = [];
    updateURLList();
    showNotification('All URLs deleted');
  }
});

// Complete button event
completeButton.addEventListener('click', async () => {
  if (urlList.length === 0) {
    showNotification('No URLs collected', 'error');
    return;
  }
  
  const actions = [];
  
  // Clipboard copy
  if (exportClipboard.checked) {
    actions.push(copyToClipboard());
  }
  
  // CSV download
  if (exportCSV.checked) {
    actions.push(downloadCSV());
  }
  
  // JSON download
  if (exportJSON.checked) {
    actions.push(downloadJSON());
  }
  
  if (actions.length === 0) {
    showNotification('Please select an export method', 'error');
    return;
  }
  
  try {
    await Promise.all(actions);
    showNotification('Export completed');
  } catch (error) {
    console.error('Export failed:', error);
    showNotification('Export failed', 'error');
  }
});

// Copy to clipboard
async function copyToClipboard() {
  const text = urlList.join('\n');
  await navigator.clipboard.writeText(text);
}

// Download CSV
function downloadCSV() {
  return new Promise((resolve) => {
    const csv = urlList.map(url => `"${url.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const filename = `url-list-${getTimestamp()}.csv`;
    downloadBlob(blob, filename);
    resolve();
  });
}

// Download JSON
function downloadJSON() {
  return new Promise((resolve) => {
    const json = JSON.stringify(urlList, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const filename = `url-list-${getTimestamp()}.json`;
    downloadBlob(blob, filename);
    resolve();
  });
}

// Download blob helper
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get timestamp for filename
function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

// Show notification
function showNotification(message, type = 'success') {
  notification.textContent = message;
  notification.style.background = type === 'error' ? '#f44336' : '#4CAF50';
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
