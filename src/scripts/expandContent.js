function $(selector, scope = document) {
    return scope.querySelector(selector);
}

function $$(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

export function expandStoryFeed() {
    $$('.TaskStoryFeed-expandLink').forEach((link) => {
        console.log('::asana-expander::expandStoryFeed', link);

        link.click();
    });
}

export function expandRichText () {
    $$('.TruncatedRichText--truncated').forEach((link) => {
        console.log('::asana-expander::expandRichText', link);

        link.click();
    });
}
