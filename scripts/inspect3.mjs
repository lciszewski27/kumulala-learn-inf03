import { chromium } from 'playwright';
import path from 'node:path';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
await page.goto('file://' + path.join(process.cwd(),'src/test.html'), {waitUntil:'load'});
await page.evaluate(async()=>{await document.fonts.ready; if(window.Prism) Prism.highlightAll();});
const info = await page.evaluate(()=>{
  const span = document.querySelector('.code-card .token.tag');
  const out=[];
  for (const sheet of document.styleSheets) {
    try { for (const r of sheet.cssRules) {
      if (!r.selectorText) continue;
      let m=false; try { m=span.matches(r.selectorText); } catch(e){}
      if (m) out.push({sel:r.selectorText, css:r.style.cssText.slice(0,400)});
    }} catch(e){}
  }
  const cs=getComputedStyle(span);
  return {out, bg:cs.background, bgColor:cs.backgroundColor, bgImage:cs.backgroundImage, parent:span.parentElement.className, parentBg:getComputedStyle(span.parentElement).backgroundColor};
});
console.log(JSON.stringify(info,null,2));
await browser.close();
