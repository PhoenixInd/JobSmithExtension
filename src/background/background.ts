chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['assets/contentScript.js']
  }).catch((error) => {
    console.error('Error executing content script:', error);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SCRAPED_DATA') {
    console.log('Data received from content script:', message.data);
    // Aquí puedes manejar los datos, guardarlos en storage, etc.
  }
});
