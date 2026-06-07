Installation
Clone or download this repository to your local machine.

Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode by toggling the switch in the top-right corner.

Click Load unpacked in the top-left corner.

Select the directory containing the project files.

How to Use
Select multiple tabs in your Chrome window by holding down Ctrl (Windows) or Cmd (Mac) and clicking the tabs you want to aggregate.

Click the Tab Text Aggregator icon in your extension toolbar.

Click the Aggregate Tab Text button.

Choose a save location for your aggregated_tabs_text.txt file when the download prompt appears.

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

