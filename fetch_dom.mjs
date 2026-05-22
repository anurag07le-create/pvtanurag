import puppeteer from 'puppeteer';
import fs from 'fs';

async function fetchDom() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://desaidedhermitraforlife.vercel.app/j2x8v1', { waitUntil: 'networkidle0' });
  const html = await page.content();
  fs.writeFileSync('dom.html', html);
  await browser.close();
  console.log('DOM fetched successfully.');
}

fetchDom().catch(console.error);
