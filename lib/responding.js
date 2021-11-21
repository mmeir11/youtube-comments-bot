const { autoScroll } = require("./helper")

const responding = async (page, comment) => {

  await page.waitForSelector('div[id=info]')

  // scroll down to comment box
  while (await page.$('[id=simplebox-placeholder]') === null) {
    await autoScroll(page)
  }

  // write the comment
  await page.click('[id=simplebox-placeholder]')
  await page.keyboard.type(comment)

  // click to send the comment
  await page.click('[aria-label="תגובה"')
}

module.exports = responding