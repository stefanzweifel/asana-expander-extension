import browser from 'webextension-polyfill';
import {expandRichText, expandStoryFeed} from './expandContent.js';

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.message === 'url-changed') {

        // Prevent the extension from expanding links when
        // looking at tasks in the inbox.
        // (Expanding links in the inbox leads to an infinite scrolling loop)
        if (new String(window.location).match(/inbox/) !== null) {
            console.log('::asana-expander::doNothing');
            return;
        }

        expandStoryFeed();
        expandRichText();
    }
});
