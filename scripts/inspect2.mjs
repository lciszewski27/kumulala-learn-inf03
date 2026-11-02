import { chromium } from 'playwright';
import path from 'node:path';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
await page.goto('file://' + path.join(process.cwd(),'src/test.html'), {waitUntil:'load'});
await page.evaluate(async()=>{await document.fonts.ready; if(window.Prism) Prism.highlightAll();});
const info = await page.evaluate(()=>{
  const span = document.querySelector('.code-card .token.tag');
  const rules=[];
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) {
      if (r.style && r.style.backgroundColor && r.style.backgroundColor!=='') {
        try { if (span.matches(r.selectorText)) rules.push([r.selectorText, r.style.backgroundColor]); } catch(e){}
      }
    }} catch(e){}
  }
  return {outer:span.outerHTML.slice(0,200), rules, inline:span.getAttribute('style')};
});
console.log(JSON.stringify(info,null,2));
await browser.close();
