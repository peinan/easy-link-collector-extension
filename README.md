# URL Collector

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](./README.md) | [日本語](./README-ja.md)

URL Collector is a browser extension designed for efficiently collecting, editing, and exporting link URLs from any webpage. It provides an intuitive side panel UI and a powerful element selection mode to streamline your research and data gathering workflows.

![URL Collector Screenshot](https://i.imgur.com/your-screenshot.png) <!-- TODO: Replace with actual screenshot -->

## Overview

While browsing, you often need to gather a list of links from a page—for research, content curation, or analysis. Doing this manually by right-clicking and copying each link is tedious and error-prone. URL Collector solves this problem by introducing a dedicated "selection mode." With a single click, you can start collecting URLs by simply clicking on any link element on the page. The collected URLs appear in a clean side panel, where you can edit them and export them into various formats.

## Features

- **🖱️ One-Click Selection Mode**: Activate a special mode to collect links without triggering their default navigation behavior.
- **✨ Visual Feedback**: Elements are highlighted on hover, and a subtle animation confirms a successful click.
- **📝 In-Panel Editing**: Edit or delete collected URLs directly within the side panel.
- **🔗 Smart Link Detection**: Automatically finds the correct link, even if you click on nested elements like images or text inside an `<a>` tag.
- **📋 Multiple Export Options**:
  - Copy to Clipboard (newline-separated)
  - Download as CSV
  - Download as JSON
- **⌨️ Keyboard Shortcut**: Toggle the selection mode on and off with a customizable keyboard shortcut (**Ctrl+Shift+U** / **Cmd+Shift+U** by default).
- **🗑️ Clear All**: Instantly clear the entire list of collected URLs.
- **🌐 Multi-Language Support**: UI available in English and Japanese.
- **🛡️ Manifest V3**: Built on the latest, most secure browser extension platform.

## Installation

Since this extension is not yet on the Chrome Web Store, you can install it manually using Developer Mode.

**For Chrome, Edge, Brave, and other Chromium-based browsers:**

1.  **Download**: Download the `url-collector-extension.zip` file from the [latest release](https://github.com/your-repo/url-collector/releases) and unzip it.
2.  **Open Extensions Page**: Open your browser and navigate to `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3.  **Enable Developer Mode**: In the top-right corner, turn on the "Developer mode" toggle.
4.  **Load the Extension**: Click the "Load unpacked" button that appears on the top-left.
5.  **Select Folder**: In the file dialog, select the unzipped `url-collector-extension` folder.

That's it! The URL Collector icon will appear in your browser's toolbar.

## How to Use

1.  **Open the Side Panel**: Click the URL Collector icon in your browser toolbar to open the side panel.
2.  **Start Selection Mode**: In the side panel, click the toggle switch or use the keyboard shortcut (**Ctrl+Shift+U** / **Cmd+Shift+U**) to enable selection mode. The page cursor will change to a crosshair.
3.  **Collect URLs**:
    - Hover over any link on the page. It will be highlighted with a blue border.
    - Click the link. A flash animation will confirm the click, and the URL will be added to the list in the side panel.
4.  **Edit and Manage**:
    - The collected URLs are displayed in `textarea` fields, which automatically wrap and resize.
    - You can edit any URL by simply typing in its text area.
    - Click the `×` button next to a URL to delete it individually.
    - Click the trash can icon at the top to delete all collected URLs at once.
5.  **Export Data**:
    - At the bottom of the side panel, check the boxes for your desired export formats (Clipboard, CSV, JSON).
    - Click the "Export" button. The button is disabled if no export format is selected.
6.  **Stop Selection Mode**: Click the toggle switch again or use the shortcut to turn off selection mode and return to normal browsing.

## Development Guide

This guide provides instructions for setting up the development environment, understanding the architecture, and debugging the extension.

### Project Structure

The repository is structured as a standard browser extension:

```
url-collector-extension/
├── manifest.json          # Core configuration, permissions, and metadata
├── background.js          # Service worker for background tasks (e.g., shortcuts)
├── sidepanel.html         # The HTML structure for the side panel UI
├── sidepanel.js           # The logic for the side panel UI and user interactions
├── content.js             # Injected into web pages to handle DOM interaction
├── icons/                 # Directory for extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md              # This file
└── README-ja.md           # Japanese README
```

### Architecture and Communication Flow

The extension consists of three main components that communicate via the `chrome.runtime.sendMessage` API:

1.  **Side Panel (`sidepanel.js`)**: The main user interface. It sends messages to the content script to enable or disable selection mode.
2.  **Content Script (`content.js`)**: Injected into the active tab. It listens for mouse events, highlights elements, and sends collected URLs back to the extension's other parts.
3.  **Background Script (`background.js`)**: A service worker that listens for global events, such as keyboard shortcuts (`chrome.commands`) or clicks on the extension's action icon.

**Communication Workflow:**

-   **Toggle Mode (from Side Panel)**: `sidepanel.js` -> `content.js` (`ENABLE_COLLECTION` / `DISABLE_COLLECTION`)
-   **Toggle Mode (from Shortcut)**: `background.js` -> `content.js` (`TOGGLE_COLLECTION`)
-   **URL Collected**: `content.js` -> `sidepanel.js` (`URL_COLLECTED`)
-   **Mode State Sync**: `content.js` -> `sidepanel.js` (`COLLECTION_MODE_CHANGED`) to keep the UI in sync when a shortcut is used.

### Debugging

Debugging a browser extension involves inspecting its different components separately.

-   **Side Panel**: Right-click anywhere inside the side panel and select "Inspect." This will open a dedicated DevTools window for the side panel's context, where you can inspect the DOM, check console logs, and debug its JavaScript.
-   **Content Script**: Open the DevTools for the web page you are on (F12 or Ctrl+Shift+I). The content script's `console.log` messages will appear here. You can also find the script's source code under the "Sources" > "Content scripts" tab to set breakpoints.
-   **Background Script (Service Worker)**: Navigate to `chrome://extensions`, find the URL Collector card, and click the "service worker" link. This will open a DevTools window for the background script, which is essential for debugging keyboard shortcuts and other background events.

### Customizing Keyboard Shortcuts

Users can change the default shortcut:

1.  Navigate to `chrome://extensions/shortcuts`.
2.  Find "URL Collector" in the list.
3.  Click the pencil icon next to the "Toggle selection mode" command and enter your desired key combination.

## Contributing

Contributions are welcome! If you have ideas for new features or have found a bug, please open an issue. If you'd like to contribute code:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the [MIT License](./LICENSE).
