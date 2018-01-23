const puppeteer = require('puppeteer');
const config = require('./config.json');

(async () => {
  const browser = await puppeteer.launch({slowMo:50});
  const page = await browser.newPage();
  await page.goto(config.url);

  await page.type('#username', config.username);
  await page.type('#password', config.password);
  await page.click('#Login');

  await page.waitForNavigation();
  await page.waitForSelector('#userThumbnailPhoto');
  const frames = await page.frames();
  const atkWorkFrame = frames.find(f => f.url().includes('AtkWorkComponent'));

  await atkWorkFrame.waitForSelector('#btnStInput.pw_base.pw_btnnst');
  await atkWorkFrame.click('#btnStInput');

  await page.screenshot({path: 'test.png', fullPage: true})

  await browser.close();
})();

