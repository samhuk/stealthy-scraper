import { createScraper } from '.'

describe('stealthy-scraper', () => {
  describe('createScraper', () => {
    const fn = createScraper

    test('basic test', async () => {
      const scraper = await fn({
        puppeteerOptions: {
          headless: false,
        },
        snapshotsDirPath: './scraper-snapshots',
      })

      await scraper.page.goto('http://www.example.com')

      const textEl = await scraper.page.waitForSelector('body>div>h1')
      const text = await textEl.evaluate(e => e.innerHTML)

      expect(text).toEqual('Example Domain')
      await scraper.close()
    })
  })
})
