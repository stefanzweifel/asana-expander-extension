import browser from "webextension-polyfill";

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab): void => {
    if (changeInfo.title !== undefined) {
        browser.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: tab.url,
        });
    }
});
