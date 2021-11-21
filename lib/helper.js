const setValueToInput = async (page, selector, value) => {
  await page.waitForSelector(selector, { visible: true })
  await page.focus(selector)
  await page.keyboard.type(value)
}

const autoScroll = async (page, customDistance) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 500;
      console.log('dist', distance);
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = {
  setValueToInput,
  autoScroll,
}