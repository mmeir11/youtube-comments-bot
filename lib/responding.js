const { autoScroll } = require("./helper")

const responding = async (page, comment) => {
  let tryNumber = 10
  let isSuccess = false

  while (tryNumber > 0 && !isSuccess) {
    try {
      await page.waitForSelector('div[id=info]')

      // scroll down to comment box
      let numberOfScroll = 0
      while (await page.$('[id=simplebox-placeholder]') === null && numberOfScroll <= 10) {
        await autoScroll(page)

        numberOfScroll++
      }

      const commentUnavailable = await page.$('[id="message"]')
      const commentUnavailableValue = await commentUnavailable?.evaluate(el => el.textContent, commentUnavailable)

      if (commentUnavailableValue.trim().includes('התגובות מושבתות')) {
        return
      }

      // write the comment
      await page.click('[id=simplebox-placeholder]')
      await page.keyboard.type(`${comment}`)

      // click to send the comment
      await page.click('[aria-label="תגובה"')
      await page.waitForTimeout(1000)

      const sendCommentFailed = await page.$('[id="footer-message"]')
      const sendCommentFailedValue = await sendCommentFailed.evaluate(el => el.textContent, sendCommentFailed)

      if (sendCommentFailedValue.trim().includes('שליחת התגובה נכשלה')) {
        throw new Error('failed to send comment')
      }

      isSuccess = true
    } catch (e) {
      if (e.message.includes('failed to send comment')) {
        throw e
      }
      if (tryNumber <= 0) {
        console.error(e)

        throw e
      }

      tryNumber--
      isSuccess = false
    }
  }
}

module.exports = responding