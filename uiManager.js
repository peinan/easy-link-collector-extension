// UI Manager - Handles UI updates

// Update mode status display
function updateModeStatus(isCollectionMode) {
  const modeStatus = document.getElementById('modeStatus');
  if (!modeStatus) return;

  if (isCollectionMode) {
    modeStatus.textContent = 'Collecting';
    modeStatus.classList.add('active');
  } else {
    modeStatus.textContent = 'Stopped';
    modeStatus.classList.remove('active');
  }
}

// Update export button state based on checkboxes
function updateExportButton() {
  const exportClipboard = document.getElementById('exportClipboard');
  const exportCSV = document.getElementById('exportCSV');
  const exportJSON = document.getElementById('exportJSON');
  const exportButton = document.getElementById('exportButton');

  if (!exportClipboard || !exportCSV || !exportJSON || !exportButton) return;

  const anyChecked = exportClipboard.checked || exportCSV.checked || exportJSON.checked;
  const urlListLength = typeof getURLList === 'function' ? getURLList().length : 0;
  exportButton.disabled = !anyChecked || urlListLength === 0;
}

