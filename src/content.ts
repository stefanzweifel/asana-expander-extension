import browser from 'webextension-polyfill';
import {expandRichText, expandStoryFeed} from './expand-content';
import {log} from './logger';

browser.runtime.onMessage.addListener(async request => {
    if (request.message === 'url-changed') {
        // Special Case: Inbox
        // The extension currently can't expand links in the Asana Inbox,
        // as this leads to an infinite scrolling and loading loop.
        // (In the future, we can allow users to enable this through options.)
        if (String(window.location).match(/inbox/) !== null) {
            log('Don\'t expand in Inbox');
            return;
        }

        expandStoryFeed();
        expandRichText();
    }
});
