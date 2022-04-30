import browser from 'webextension-polyfill';

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.title !== undefined) {
        browser.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: changeInfo.url,
        });
    }
});
