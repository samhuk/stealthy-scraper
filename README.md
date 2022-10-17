<h1 align="center">stealthy-scraper</h1>
<p align="center">
  <em>Extra stealthy web scraper in Typescript</em>
</p>

<p align="center">
  <a href="https://img.shields.io/badge/License-MIT-green.svg" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="license" />
  </a>
  <a href="https://badge.fury.io/js/stealthy-scraper.svg" target="_blank">
    <img src="https://badge.fury.io/js/{{npm-package-name}}.svg" alt="npm version" />
  </a>
</p>

## Overview

stealthy-scraper is a wrapper around [puppeteer-extra](https://github.com/berstend/puppeteer-extra) that adds additional stealth functionality and other helpful features.

## When to use

* If you are trying to scrape a website and `Page.goto` and `Browser.newPage` is being detected. stealthy-scraper has a `Scraper.newBrowser` function as an alternative way to navigate pages, which so-far is undetectable.
* If puppeteer's default word typing is being detected. stealthy-scraper has a `Scraper.safeType` function that closely mimiks human typing behavior.


## Usage Overview

```typescript
import { createScraper } from 'stealthy-scraper'
const scraper = await createScraper({
  puppeteerOptions: {
    headless: true,
    ...
  },
  snapshotsDirPath: './scraper-snapshots',
})
await scraper.page.goto('difficultoscrape.com')
const searchTextInput = await scraper.page.waitForSelector('...')
await scraper.safeType(searchTextInput, 'my search term')
// ...
await scraper.newBrowser(newUrlFromSearchResults)
await scraper.close()
```

## Development

See [./contributing/development.md](./contributing/development.md)

## Disclaimer

I do not condone the usage of this package for malevolent purposes. Please be very curtious and a good citizen when using it. I do not take any responsibility for any damages you incur on yourself (e.g. IP blacklisted) or others (e.g. DoS) through any use of this package.

---

If you found this package delightful, feel free to buy me a coffee ✨

<a href="https://www.buymeacoffee.com/samhuk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
