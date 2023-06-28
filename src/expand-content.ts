import {log} from './logger';

function $$(selector: string, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

export function expandStoryFeed() {
    for (const link of $$('.TaskStoryFeed-expandLink')) {
        console.log(typeof link);
        log('Expand Story Feed', link);
        link.click();
    }
}

export function expandRichText() {
    for (const link of $$('.TruncatedRichText--truncated')) {
        console.log(typeof link);
        log('Expand Rich Text', link);
        link.click();
    }
}
