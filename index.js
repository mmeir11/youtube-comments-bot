const puppeteer = require('puppeteer');
const { autoScroll } = require('./lib/helper');
const login = require('./lib/login');
const responding = require('./lib/responding');
const search = require('./lib/search');

const startBot = async () => {
  console.log('start')

  const email = 'mmeiras'
  const password = 'Ma112233'
  const wordToSearch = 'fortnite'
  const comment = 'The coolest Fortnite T shirt I ever seen!!! \n https://www.redbubble.com/i/t-shirt/Cool-Fortnite-T-Shirt-by-mmeir12/94953418.1YYVU?asc=u'

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 0, height: 0 },
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

  await search(browser, page, wordToSearch, comment)

  // await browser.close();
  await page.waitForTimeout(1000);
  console.log('end')
};

startBot();
