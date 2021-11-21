const { Puppeteer } = require("puppeteer");
const { setValueToInput } = require("./helper");

const login = async (page, email, password) => {
  const elementsHendles = await page.evaluateHandle(() => document.querySelectorAll('div[id=buttons]'));
  const elements = await elementsHendles.getProperties();
  const elements_arr = Array.from(elements.values());

  for (const i = 0; i < elements_arr.length; i++) {
    const element = elements_arr[i];
    const value = await element.evaluate(el => el.textContent, element)

    if (value.trim() === 'Sign in') {
      await element.click()

      console.log('sign in clicked');

      break
    }
  }

  await page.waitForTimeout(1000)
  await setValueToInput(page, 'input[type=email]', email)
  await page.click('div[id="identifierNext"]')

  await page.waitForTimeout(2000)
  await setValueToInput(page, 'input[type=password]', password)
  await page.click('div[id="passwordNext"]')

  console.log('login finished')
}

module.exports = login
