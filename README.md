![Header Image](./assets/header-image.png)

<div align="center" style="display: flex; justify-content: center; gap: 8px;">
  <a href="https://chromewebstore.google.com/detail/easy-link-collector/dlpjoiieabfmpdpbcfmpooafcepokmmj" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Chrome%20Web%20Store-Available-4285F4?logo=chromewebstore" alt="Chrome Web Store Badge" />
    <img src="https://img.shields.io/chrome-web-store/users/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Users" />
    <img src="https://img.shields.io/chrome-web-store/rating/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Rating" />
    <img src="https://img.shields.io/chrome-web-store/rating-count/dlpjoiieabfmpdpbcfmpooafcepokmmj.svg" alt="Chrome Web Store Rating Count" />
  </a>
</div>

---

<div align="center">
  English | <a href="./README-ja.md">日本語</a>
</div>

<br/>

Tired of manually copying links one by one? Easy Link Collector is a browser extension that lets you easily collect links by simply clicking on elements displayed on web pages. Selected links are added to a side panel where you can edit them and export to clipboard, CSV, or JSON format.

![Easy Link Collector Screenshot](./assets/demo.gif)

## How to Use

1. **Open the Side Panel**: Click the Easy Link Collector icon in your browser toolbar.
2. **Start Collecting**: Click the toggle switch or press <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>U</kbd> / <kbd>Cmd</kbd><kbd>Shift</kbd><kbd>U</kbd> to enable element selection mode. Hover over links to see them highlighted, then click to add the target link to the side panel.
3. **Edit and Export**: Edit URLs directly in the side panel, delete individual items with the `×` button, or clear all with the trash icon. Select export formats (Clipboard, CSV, JSON) and click "Export".
4. **Stop Selection Mode**: Toggle the switch again or use the keyboard shortcut to return to normal browsing.

> [!WARNING]
> Please note that collected links will be discarded when you close the side panel.

## Installation

### Install from Chrome Web Store

Install from the [Chrome Web Store page](https://chromewebstore.google.com/detail/easy-link-collector/dlpjoiieabfmpdpbcfmpooafcepokmmj).

### Manual Installation

**For Chrome, Edge, Brave, and other Chromium-based browsers:**

1. **Download**: Download the `easy-link-collector-extension.zip` file from the [latest release](https://github.com/peinan/easy-link-collector-extension/releases) and unzip it.
2. **Open Extensions Page**: Navigate to `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
3. **Enable Developer Mode**: Turn on the "Developer mode" toggle in the top-right corner.
4. **Load the Extension**: Click "Load unpacked" and select the unzipped `easy-link-collector-extension` folder.

The Easy Link Collector icon will appear in your browser's toolbar.

> [!WARNING]
> Arc browser has a conflicting side panel feature that prevents this extension from working properly. We recommend using Chrome instead.

## Development & Contributing

For development setup, architecture details, debugging instructions, and contribution guidelines, see [DEVELOPMENT.md](./DEVELOPMENT.md).

## Privacy Policy

For information about how we collect, use, and protect your data, see our [Privacy Policy](./PRIVACY_POLICY.md).

## License

This project is licensed under the [MIT License](./LICENSE).
