chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    name: 'Replace A to B',
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    chrome.scripting
      .insertCSS({
        target: {tabId: tabId},
        files: ['./foreground.css'],
      })
      .then(() => {
        console.log('FOREGROUND STYLES');

        chrome.scripting
          .executeScript({
            target: {tabId: tabId},
            files: ['./foreground.js'],
          })
          .then(() => {
            console.log('FOREGROUND SCRIPT');
          });
      })
      .catch((err) => console.log(err));
  }
});
