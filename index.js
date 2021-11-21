const puppeteer = require('puppeteer');
const { autoScroll } = require('./lib/helper');
const login = require('./lib/login');
const responding = require('./lib/responding');
const search = require('./lib/search');

const startBot = async () => {
  console.log('start')

  const email = 'mmeirasu'
  const password = 'Ma112233'
  const wordToSearch = 'fortnight'

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 0, height: 0 },
    // args: ['--start-fullscreen'],
    // args: ["--start-maximized"],
    args: [`--window-size=1920,1080`],
  })

  const pages = await browser.pages()
  const page = pages[0]

  console.log('go to youtube')
  await page.goto('https://youtube.com')

  await page.waitForSelector('input[id=search]')
  await page.waitForSelector('button#search-icon-legacy')

  console.log('trying to login')

  await login(page, email, password)

  console.log('logged in');

  await page.waitForSelector('input[id=search]')
  await page.waitForSelector('button#search-icon-legacy')

  console.log(`trying to search ${wordToSearch}`)

  await search(browser, page, wordToSearch)

  // await browser.close();
  await page.waitForTimeout(1000);
  console.log('end')
};

startBot();
