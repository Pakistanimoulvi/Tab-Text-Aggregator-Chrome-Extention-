chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "start_aggregation") {
    aggregateTabs();
  }
});

async function aggregateTabs() {
  try {
    // Query highlighted tabs in the current window
    const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
    if (tabs.length === 0) return;

    let aggregatedText = "";

    for (const tab of tabs) {
      // Validate URLs to prevent script execution on protected browser pages
      if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("brave://") || tab.url.startsWith("https://chromewebstore.google.com")) {
        aggregatedText += `URL: ${tab.url || "Unknown"}\n[Error: Cannot access internal browser pages]\n\n====================================\n\n`;
        continue;
      }

      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.body.innerText
        });

        const tabText = results[0]?.result || "[No text found]";
        aggregatedText += `Title: ${tab.title}\nURL: ${tab.url}\n\n${tabText}\n\n====================================\n\n`;
      } catch (scriptError) {
        aggregatedText += `Title: ${tab.title}\nURL: ${tab.url}\n[Error: Script execution failed - ${scriptError.message}]\n\n====================================\n\n`;
      }
    }

    // Direct string encoding to bypass FileReader sandbox security policies
    const dataUrl = "data:text/plain;charset=utf-8," + encodeURIComponent(aggregatedText);
    
    chrome.downloads.download({
      url: dataUrl,
      filename: "aggregated_tabs_text.txt",
      saveAs: true
    });

  } catch (error) {
    console.error("Aggregation failed:", error);
  }
}