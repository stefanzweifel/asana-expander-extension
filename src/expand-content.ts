import {log} from './logger';

function $$(selector: string, scope: Document = document): HTMLElement[] {
    return Array.from(scope.querySelectorAll(selector));
}

export function expandStoryFeed(): void {
    for (const link of $$('.TaskStoryFeed-expandLink')) {
        log('Expand Story Feed', link);
        link.click();
    }
}

export function expandRichText(): void {
    for (const link of $$('.TruncatedRichText--truncated')) {
        log('Expand Rich Text', link);
        link.click();
    }
}
