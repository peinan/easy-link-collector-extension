# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.4] - 2025-11-21

### Changed
- **UI Improvements**: The header section is now fixed (sticky) when scrolling.

### Fixed
- **UI Improvements**: Minor UI improvements for the footer.

## [1.3.3] - 2025-11-21

### Changed
- **New Icon**: Updated the extension icon to a new design.
- **Extension Name**: Updated the extension name to "Easy Link Collector".

### Fixed
- **UI Improvements**: Minor UI improvements for the URL list container.

## [1.3.2] - 2025-11-21

### Refactored
- **Code Organization**: Separated CSS into `styles.css` and split JavaScript into modular files (`urlManager.js`, `exportManager.js`, `uiManager.js`, `notificationManager.js`) for better maintainability.
- **CSS Consolidation**: Unified common styles using CSS variables and consolidated container styles, heading styles, and shared values to reduce duplication.

### Changed
- **Export Button Text**: The "Complete" button text has been updated to "Export" to match the other buttons in the UI.
- **UI Improvements**: Removed the top border from the export section to improve the visual hierarchy and reduce visual clutter.

## [1.3.1] - 2025-11-21

### Fixed
- **Export Options UI Improved**: The export options (Clipboard, CSV, JSON) are now presented as modern checkboxes with a custom checkmark animation, offering clearer states and improved accessibility.


## [1.3.0] - 2025-11-21

### Added

- **Quick Actions Button Group**: Introduced a new button group below the URL list for convenient one-click actions. The buttons feature a clean, borderless design and are arranged horizontally for easy access.
- **Add Current Page Button**: A new button that instantly adds the URL of the currently active page to the collection list. This allows users to quickly save the page they are on without needing to use selection mode.
- **Add All Links Button**: A powerful new button that automatically collects all valid links (<a> tags with http or https protocols ) from the current page. The feature automatically filters out duplicates and notifies the user of the number of links added, streamlining bulk collection.


## [1.2.1] - 2025-11-21

### Fixed
- **URL Wrapping**: Fixed a bug where long URLs would not wrap within the text field. The URL items were changed from `<input>` to `<textarea>` elements, which now automatically resize to fit their content, ensuring full visibility of long URLs.

### Changed
- **Icons**: Replaced the programmatically generated extension icons with the user-provided icon files for a more refined look.

## [1.2.0] - 2025-11-21

### Added
- **Trash Icon for Clear All**: The "Clear All" button is now a trash can icon from Lucide Icons, improving UI clarity.

### Changed
- **UI Language**: All UI components, labels, and notifications have been converted to English for broader accessibility.
- **Button Disabling Logic**: The "Complete" button is now disabled if no export format (e.g., Clipboard, CSV, JSON) is selected, preventing empty actions.
- **Extension Icon**: Updated the extension icon to a new design based on the Lucide `clipboard-copy` icon.
- **Delete Button Style**: The individual delete (`×`) buttons have been made smaller (20x20px) and are now a lighter shade of gray for a more subtle appearance.
- **Icon Colors**: The trash icon is now pink (`#ec4899`) and turns red (`#dc2626`) on hover.

## [1.1.0] - 2025-11-20

### Added
- **Keyboard Shortcut**: Introduced a keyboard shortcut (**Ctrl+Shift+U** or **Cmd+Shift+U** on Mac) to toggle the URL selection mode. The shortcut can be customized in the browser's extension settings.
- **Clear All Button**: Added a button to delete all collected URLs at once, with a confirmation dialog to prevent accidental data loss.

### Changed
- **Delete Button Design**: The individual delete buttons were updated from text to a circular `×` icon for a more modern and intuitive UI.

## [1.0.2] - 2025-11-20

### Fixed
- **Duplicate URL Entry**: Fixed a critical bug where clicking a link would add the same URL to the list twice. This was caused by a redundant message forward in the background script, which has now been removed.

## [1.0.1] - 2025-11-20

### Fixed
- **Side Panel Not Opening**: Fixed an issue where clicking the extension icon did not open the side panel. The logic was updated to use `chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })` for more reliable behavior.

## [1.0.0] - 2025-11-20

### Added
- **Initial Release**: First version of the URL Collector extension.
- **Core Functionality**: Selection mode for collecting links, side panel UI for viewing and editing URLs.
- **Editing**: Ability to edit collected URLs directly in the side panel.
- **Deletion**: Ability to delete individual URLs.
- **Export**: Support for exporting the URL list to the clipboard, CSV, or JSON formats.
- **Visual Feedback**: Hover and click effects on web pages during selection mode.
- **Manifest V3**: Built on the modern and secure Manifest V3 platform.
