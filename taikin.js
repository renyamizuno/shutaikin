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

  await atkWorkFrame.waitForSelector('#btnEtInput.pw_base.pw_btnnet');
  const btn = await atkWorkFrame.$('#btnEtInput');
  await btn.click({button: 'middle'});


  await browser.close();
})();

