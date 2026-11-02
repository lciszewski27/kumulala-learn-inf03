import { chromium } from 'playwright';
import path from 'node:path';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
await page.goto('file://' + path.join(process.cwd(),'src/test.html'), {waitUntil:'load'});
await page.evaluate(async()=>{await document.fonts.ready; if(window.Prism) Prism.highlightAll();});
const info = await page.evaluate(()=>{
  const code = document.querySelector('.code-card code');
  const span = document.querySelector('.code-card .token.tag');
  const cs = getComputedStyle(code); const ss = span?getComputedStyle(span):null;
  return {codeBg:cs.backgroundColor, codeColor:cs.color, spanBg:ss?.backgroundColor, spanColor:ss?.color, html:code.innerHTML.slice(0,300)};
});
console.log(info);
await browser.close();
