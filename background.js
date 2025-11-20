// Background service worker for URL Collector extension

// Enable side panel on all tabs
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Listen for keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-collection-mode') {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send toggle message to content script
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_COLLECTION' });
    } catch (error) {
      console.error('Failed to toggle collection mode:', error);
    }
  }
});

// Listen for messages from content script
// Note: We don't forward messages here to avoid duplication
// The content script sends messages directly to all listeners including sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Background worker can handle other message types here if needed
  return true;
});
