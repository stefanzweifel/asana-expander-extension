import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.title !== undefined) {
        browser.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: tab.url,
        });
    }
});
