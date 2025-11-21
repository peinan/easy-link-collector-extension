# Development Guide

This guide provides instructions for setting up the development environment, understanding the architecture, and debugging the extension.

## Project Structure

The repository is structured as a standard browser extension:

```
easy-link-collector-extension/
├── manifest.json          # Core configuration, permissions, and metadata
├── background.js          # Service worker for background tasks (e.g., shortcuts)
├── sidepanel.html         # The HTML structure for the side panel UI
├── sidepanel.js           # Main logic for the side panel UI and user interactions
├── content.js             # Injected into web pages to handle DOM interaction
├── styles.css             # Stylesheet for the side panel UI
├── urlManager.js          # URL list management (add, update, delete URLs)
├── exportManager.js       # Export functionality (clipboard, CSV, JSON)
├── uiManager.js           # UI state management (mode status, button states)
├── notificationManager.js # Notification display functionality
├── icons/                 # Directory for extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md              # User-facing documentation
└── README-ja.md           # Japanese README
```

## Architecture and Communication Flow

The extension consists of three main components that communicate via the `chrome.runtime.sendMessage` API:

1. **Side Panel (`sidepanel.js`)**: The main user interface. It sends messages to the content script to enable or disable selection mode.
2. **Content Script (`content.js`)**: Injected into the active tab. It listens for mouse events, highlights elements, and sends collected URLs back to the extension's other parts.
3. **Background Script (`background.js`)**: A service worker that listens for global events, such as keyboard shortcuts (`chrome.commands`) or clicks on the extension's action icon.

**Communication Workflow:**

- **Toggle Mode (from Side Panel)**: `sidepanel.js` -> `content.js` (`ENABLE_COLLECTION` / `DISABLE_COLLECTION`)
- **Toggle Mode (from Shortcut)**: `background.js` -> `content.js` (`TOGGLE_COLLECTION`)
- **URL Collected**: `content.js` -> `sidepanel.js` (`URL_COLLECTED`)
- **Mode State Sync**: `content.js` -> `sidepanel.js` (`COLLECTION_MODE_CHANGED`) to keep the UI in sync when a shortcut is used.

## Debugging

Debugging a browser extension involves inspecting its different components separately.

- **Side Panel**: Right-click anywhere inside the side panel and select "Inspect." This will open a dedicated DevTools window for the side panel's context, where you can inspect the DOM, check console logs, and debug its JavaScript.
- **Content Script**: Open the DevTools for the web page you are on (F12 or Ctrl+Shift+I). The content script's `console.log` messages will appear here. You can also find the script's source code under the "Sources" > "Content scripts" tab to set breakpoints.
- **Background Script (Service Worker)**: Navigate to `chrome://extensions`, find the Easy Link Collector card, and click the "service worker" link. This will open a DevTools window for the background script, which is essential for debugging keyboard shortcuts and other background events.

## Customizing Keyboard Shortcuts

Users can change the default shortcut:

1. Navigate to `chrome://extensions/shortcuts`.
2. Find "Easy Link Collector" in the list.
3. Click the pencil icon next to the "Toggle selection mode" command and enter your desired key combination.

## Contributing

Contributions are welcome! If you have ideas for new features or have found a bug, please open an issue. If you'd like to contribute code:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

