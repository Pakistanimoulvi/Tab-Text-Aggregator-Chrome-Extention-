# Tab Text Aggregator

A lightweight Chrome Extension (Manifest V3) that extracts and aggregates the visible text content from all highlighted (selected) tabs into a single, downloadable `.txt` file.

## Features

* **Multi-Tab Support:** Processes multiple highlighted tabs simultaneously (hold `Ctrl` or `Shift` and click tabs to select them).
* **Permissions Sanitization:** Safely skips protected browser pages (e.g., `chrome://`, Chrome Web Store) without crashing.
* **Error Handling:** Captures and logs script execution failures gracefully within the output file.
* **Manifest V3 Compliant:** Uses modern `chrome.scripting` and `chrome.downloads` APIs.

## File Structure

```text
├── manifest.json      # Extension configuration and permissions
├── popup.html         # The extension's popup UI
├── popup.js           # Frontend logic handling the UI interaction and extraction
└── background.js      # Background service worker (ready for message-passing workflows)
