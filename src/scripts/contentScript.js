import browser from 'webextension-polyfill';
import {expandContent} from './expandContent.js';

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'url-changed') {
            expandContent();
        }
    }
);
