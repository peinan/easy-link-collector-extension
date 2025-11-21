// Export Manager - Handles export operations (clipboard, CSV, JSON)

// Copy to clipboard
async function copyToClipboard(urlList) {
  const text = urlList.join('\n');
  await navigator.clipboard.writeText(text);
}

// Download CSV
function downloadCSV(urlList) {
  return new Promise((resolve) => {
    const csv = urlList.map(url => `"${url.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const filename = `url-list-${getTimestamp()}.csv`;
    downloadBlob(blob, filename);
    resolve();
  });
}

// Download JSON
function downloadJSON(urlList) {
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

