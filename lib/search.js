const { autoScroll } = require("./helper")
const responding = require("./responding")

const search = async (browser, page, wordToSearch, comment) => {
  let additionalToComment = 1
  let tryNumber = 0

  page.goto(`https://www.youtube.com/results?search_query=${wordToSearch}`)

  await page.waitForTimeout(1000)

  await page.waitForSelector('a[id=video-title]')
  let videos = await page.$$('a[id=video-title]')

  for (let i = 0; i < videos.length; i++) {
    const video = videos[i]

    let pages = await browser.pages()

    // exist unexpected pages
    if (pages.length !== 1) {
      for (let i = 1; i < pages.length; i++) {
        const unexpectedPage = pages[i]
        await unexpectedPage.bringToFront()
        await unexpectedPage.waitForTimeout(500)
        await unexpectedPage.close()
      }
    }

    await video.click({ button: 'middle' })
    pages = await browser.pages()

    if (pages.length > 1) {
      try {
        await pages[1].bringToFront()
        await page.waitForTimeout(500)
        await responding(pages[1], `${comment} \n${additionalToComment}`)

        tryNumber = 0
      } catch (e) {
        if (e.message.includes('failed to send comment')) {
          additionalToComment++
        }
        else {
          if (tryNumber >= 5) {
            console.log(e)
            throw e
          }
          tryNumber++
        }
      } finally {
        await pages[1].close()
      }
    }

    await page.waitForTimeout(1000)

    while (i >= videos.length - 2) {
      await autoScroll(page)
      videos = await page.$$('a[id=video-title]')
    }
    // await page.close()
  }

}

module.exports = search