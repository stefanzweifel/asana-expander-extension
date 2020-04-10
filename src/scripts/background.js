import browser from 'webextension-polyfill';

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        browser.tabs.sendMessage(tabId, {
            message: 'url-changed',
            url: changeInfo.url
        })
    }
});
