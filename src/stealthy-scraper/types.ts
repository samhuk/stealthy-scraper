import { Browser, ElementHandle, Page, PuppeteerLaunchOptions } from 'puppeteer'

export type ScraperOptions = {
  /**
   * Optional `PuppeteerLaunchOptions` to use to launch the browser.
   *
   * If not provided, puppeteer's default options are used.
   *
   * @default undefined
   */
  puppeteerOptions?: PuppeteerLaunchOptions
  /**
   * Optional path to the directory used to store snapshot files created by `Scraper.snapshot`.
   *
   * @default './'
   */
  snapshotsDirPath?: string
}

export type SafeTypeOptions = {
  /**
   * Determines if the element is to be clicked on first before typing, which is more
   * human-like behavior.
   */
  clickFirst?: boolean
  /**
   * Seconds to wait before starting to type.
   *
   * @default 1
   */
  waitBeforeS?: number
}

export type Scraper = {
  /**
   * The puppeteer `Browser`.
   */
  browser: Browser
  /**
   * The puppeteer `Page`.
   */
  page: Page
  /**
   * Opens up a new browser at the given url.
   *
   * This is useful when `Page.goto` or `Browser.newPage` doesn't work, as they can be detected
   * more easily compared to a completely new browser window.
   *
   * Optionally, new puppeteer options can be provided as an alternative to the original options
   * that were provided.
   */
  newBrowser: (url: string, newPuppeteerOptions?: PuppeteerLaunchOptions) => Promise<void>
  /**
   * Takes a png image of the current page and records the current html content of the page,
   * saving both files at the defined `snapshotsDir`.
   *
   * This is useful when scraping sites that prevent dev tools from being open, which is
   * un-unexploitable. This allows you to reach a point in your scraper script, take a snapshot,
   * and learn from the downloaded image and HTML what to do next.
   */
  snapshot: (name: string) => Promise<void>
  /**
   * Version of `ElementHandle.type` that better mimicks human typing input.
   */
  safeType: (el: ElementHandle, text: string, options?: SafeTypeOptions) => Promise<void>
  /**
   * Closes the browser.
   */
  close: () => Promise<void>
}
