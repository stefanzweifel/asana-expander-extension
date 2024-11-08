# Asana Expander Browser Extension

[![tests](https://github.com/stefanzweifel/asana-expander-extension/actions/workflows/test.yml/badge.svg)](https://github.com/stefanzweifel/asana-expander-extension/actions/workflows/test.yml)

> [!Note]
> This extension is no longer actively maintained. I no longer use Asana.
> But in the 5 years this extension was used by me, it worked flawlessly and without bugs. I'm sure this will be the case for the years to come.

---

A browser extension to automatically expand comments and threads in Asana.

Do you also hate to click on those "See more" links in Asana, just to see the last sentence of a longer comment? Or did you also miss an important comment in a longer comment thread in an Asana Task?

This extension solves this problem my automatically clicking on those links whenever you open a task with many comments or when a comment is longer than 300 characters.

Read more about why this extension exists [on my blog](https://stefanzweifel.dev/posts/2020/04/16/asana-expander-a-browser-extension-to-fix-asanas-ux-problems).


## Installation

- [Chrome Extension](https://chrome.google.com/webstore/detail/asana-expander/goplcobjbaafmhoadgihbepeejbajbki)
- [Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/asana-expander/)

## Development

Ensure you have
- [Node.js](https://nodejs.org) 18 or later installed

Then run the following:
- `npm run install` to install dependencies.
- `npm run dev` to start the development server 
- `npm run build-chrome` to build chrome extension
- `npm run build-ff` to build firefox addon

### Chrome

- Go to the browser address bar and type `chrome://extensions`
- Check the `Developer Mode` button to enable it.
- Click on the `Load Unpacked Extension…` button.
- Select your extension’s extracted directory.

### Firefox

- Load the Add-on via `about:debugging#/runtime/this-firefox` as temporary Add-on.
- Choose the `manifest.json` file in `./dist`

## Distribute

### Chrome

- Run `npm run build-chrome`
- Create ZIP of `./dist`
- Navigate to Chrome Web Store Developer Dashboard
- Upload new version to Dashboard

- `npm run build` builds the extension for all the browsers to `extension/BROWSER` directory respectively.

### Firefox

- Run `npm run build-ff`
- Create Zip of `./dist`
- Navigate to [addons.mozilla.org](https://addons.mozilla.org/en-US/developers/addon/asana-expander/versions/submit/)
- Upload new version

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Stefan Zweifel](https://github.com/stefanzweifel)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
