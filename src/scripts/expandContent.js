
export function expandContent () {

    console.log('====== EXPAND CONTENT ======');

    for (let link of document.getElementsByClassName('TruncatedRichText-expand')) {
        link.click();
    };

    for (let link of document.getElementsByClassName('TaskStoryFeed-expandLink')) {
        link.click();
    };
}
