import browser from 'webextension-polyfill';
import {expandRichText, expandStoryFeed} from './expandContent.js';

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'url-changed') {
        expandStoryFeed();
        expandRichText();
    }
});
