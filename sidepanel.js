// Side panel script for URL Collector extension

let isCollectionMode = false;

// DOM elements
const modeToggle = document.getElementById('modeToggle');
const exportClipboard = document.getElementById('exportClipboard');
const exportCSV = document.getElementById('exportCSV');
const exportJSON = document.getElementById('exportJSON');
const exportButton = document.getElementById('exportButton');
const clearAllButton = document.getElementById('clearAllButton');
const addCurrentPageBtn = document.getElementById('addCurrentPageBtn');
const addAllLinksBtn = document.getElementById('addAllLinksBtn');

// Initialize
updateURLList();
updateExportButton();

// Quick action buttons
addCurrentPageBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      addURL(tab.url);
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
      response.links.forEach(url => addURL(url));
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
  updateModeStatus(isCollectionMode);

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
      updateModeStatus(isCollectionMode);
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

// Listen for URL collection messages and mode changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'URL_COLLECTED') {
    addURL(message.url);
    showNotification('URL added');
  } else if (message.type === 'COLLECTION_MODE_CHANGED') {
    // Update UI to reflect mode change from keyboard shortcut
    isCollectionMode = message.enabled;
    modeToggle.checked = isCollectionMode;
    updateModeStatus(isCollectionMode);
  }
});

// Add listeners to checkboxes
exportClipboard.addEventListener('change', updateExportButton);
exportCSV.addEventListener('change', updateExportButton);
exportJSON.addEventListener('change', updateExportButton);

// Clear all button event
clearAllButton.addEventListener('click', () => {
  if (confirm('Delete all URLs?')) {
    clearAllURLs();
    showNotification('All URLs deleted');
  }
});

// Export button event
exportButton.addEventListener('click', async () => {
  const urlList = getURLList();

  if (urlList.length === 0) {
    showNotification('No URLs collected', 'error');
    return;
  }

  const actions = [];

  // Clipboard copy
  if (exportClipboard.checked) {
    actions.push(copyToClipboard(urlList));
  }

  // CSV download
  if (exportCSV.checked) {
    actions.push(downloadCSV(urlList));
  }

  // JSON download
  if (exportJSON.checked) {
    actions.push(downloadJSON(urlList));
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
