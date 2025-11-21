// URL Manager - Handles URL list operations

let urlList = [];

// Add URL to list
function addURL(url) {
  urlList.push(url);
  updateURLList();
  return true;
}

// Update URL list display
function updateURLList() {
  const urlListContainer = document.getElementById('urlList');
  const urlCount = document.getElementById('urlCount');
  const clearAllButton = document.getElementById('clearAllButton');

  if (!urlListContainer || !urlCount || !clearAllButton) return;

  urlCount.textContent = urlList.length;

  // Enable/disable clear all button
  clearAllButton.disabled = urlList.length === 0;

  // Update export button state
  if (typeof updateExportButton === 'function') {
    updateExportButton();
  }

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

// Clear all URLs
function clearAllURLs() {
  urlList = [];
  updateURLList();
}

// Get URL list
function getURLList() {
  return urlList;
}

// Set URL list (for initialization)
function setURLList(list) {
  urlList = list || [];
  updateURLList();
}

