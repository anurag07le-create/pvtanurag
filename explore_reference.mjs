import puppeteer from 'puppeteer';

async function fetchDom() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1366, height: 633 });
  
  console.log("Navigating...");
  await page.goto('https://desaidedhermitraforlife.vercel.app/j2x8v1', { waitUntil: 'networkidle0' });
  
  // screenshot of top
  await page.screenshot({ path: 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\a15d5f83-fc99-4f13-b635-f6163f88dd5b\\scratch\\ref_top.png' });
  
  // click "Play Episode 1"
  const playBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(el => el.textContent.includes('Play Episode 1'));
  });
  
  if (playBtn) {
    await playBtn.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\a15d5f83-fc99-4f13-b635-f6163f88dd5b\\scratch\\ref_player.png' });
  }

  // click the first episode in the list to see what happens
  const ep1 = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('Not an Accident'));
  });
  
  if (ep1) {
    await ep1.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\a15d5f83-fc99-4f13-b635-f6163f88dd5b\\scratch\\ref_ep1_click.png' });
  }
  
  await browser.close();
  console.log("Done");
}

fetchDom().catch(console.error);
