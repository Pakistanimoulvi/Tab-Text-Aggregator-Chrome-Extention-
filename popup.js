document.getElementById('aggregate-btn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = "Processing tabs...";

  try {
    // 1. Query highlighted tabs in the current window
    const tabs = await chrome.tabs.query({ highlighted: true, currentWindow: true });
    
    if (tabs.length === 0) {
      statusDiv.textContent = "No tabs selected.";
      return;
    }

    let aggregatedText = "";

    // 2. Iterate through tabs to extract inner text
    for (const tab of tabs) {
      // Handle security rules by skipping protected pages
      if (!tab.url || tab.url.startsWith("chrome://") || tab.url.startsWith("https://chromewebstore.google.com") || tab.url.startsWith("about:")) {
        aggregatedText += `URL: ${tab.url || "Unknown"}\n[Error: Cannot access internal Chrome pages]\n\n====================================\n\n`;
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

    // 3. Construct File Blob and process download safely inside popup context
    const blob = new Blob([aggregatedText], { type: "text/plain;charset=utf-8" });
    const reader = new FileReader();
    
    reader.onloadend = function() {
      const dataUrl = reader.result;
      chrome.downloads.download({
        url: dataUrl,
        filename: "aggregated_tabs_text.txt",
        saveAs: true
      }, () => {
        statusDiv.textContent = "Download started!";
      });
    };
    
    reader.readAsDataURL(blob);

  } catch (error) {
    console.error("Aggregation failed:", error);
    statusDiv.textContent = "An error occurred.";
  }
});