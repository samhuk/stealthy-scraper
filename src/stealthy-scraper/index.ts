import * as fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import { ElementHandle, KeyInput } from 'puppeteer'
import { SafeTypeOptions, Scraper, ScraperOptions } from './types'
import { loop, wait } from './helpers'

const AVERAGE_TYPING_CHARS_PER_MIN = 200
const TYPING_CHARS_PER_MIN_VARIATION = 40

const safeType = async (el: ElementHandle, text: string, options?: SafeTypeOptions) => {
  if (options?.clickFirst ?? true)
    await el.click()

  if (options?.waitBeforeS == null || options.waitBeforeS > 0)
    await wait(options.waitBeforeS ?? 1)

  loop((next, stop, i) => {
    const char = text.charAt(i) as KeyInput
    if (char == null) {
      stop()
      return
    }
    el.press(text.charAt(i) as KeyInput).then(() => {
      // 200ms +/- 40ms
      const delayMs = AVERAGE_TYPING_CHARS_PER_MIN + (TYPING_CHARS_PER_MIN_VARIATION * ((2 * Math.random()) - 1))
      next(delayMs)
    })
  })
}

export const createScraper = async (options?: ScraperOptions): Promise<Scraper> => {
  puppeteer.use(StealthPlugin())
  puppeteer.use(AdblockerPlugin())
  const initialBrowser = await puppeteer.launch(options?.puppeteerOptions)
  const initialPage = await initialBrowser.newPage()
  const snapshotsDirPath = options?.snapshotsDirPath ?? './'

  let scraper: Scraper
  return scraper = {
    browser: initialBrowser,
    page: initialPage,
    newBrowser: async (newUrl, newOptions) => {
      await scraper.browser.close()
      scraper.browser = await puppeteer.launch(newOptions ?? options.puppeteerOptions)
      scraper.page = await scraper.browser.newPage()
      await scraper.page.goto(newUrl)
    },
    snapshot: async name => {
      await scraper.page.screenshot({ path: path.resolve(snapshotsDirPath, name.concat('.png')), type: 'png' })
      const pageHtml = await scraper.page.content()
      fs.writeFileSync(path.resolve(snapshotsDirPath, name.concat('.html')), pageHtml)
    },
    safeType: async (el, text, _options) => {
      await safeType(el, text, _options)
    },
    close: async () => {
      await scraper.browser.close()
    },
  }
}
