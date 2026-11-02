import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "output");
const TMP = path.join(ROOT, ".build");

const docs = [
  {
    id: "00-start",
    file: "00-start.html",
    subject: "START",
    coverTitle: "Mapa<br>egzaminu",
    coverSub: "INF.03 od pierwszej minuty do oddania plików",
    coverDesc:
      "Plan 150 minut, anatomia arkusza, 5 rezultatów oceniania i checklisty, które porządkują całą pracę. Od tego PDF-a zacznij.",
    accent: "#6c3baa",
    accentSoft: "#f3e8ff",
    icon: "star",
    chips: ["plan 150 min", "5 rezultatów", "checklisty", "spis PDF-ów"],
    inside: [
      ["01", "Jak wygląda praktyka INF.03"],
      ["02", "Plan pracy minuta po minucie"],
      ["03", "5 rezultatów i co je zalicza"],
      ["04", "Pliki, zrzuty, płyta — checklista"],
    ],
    out: "Kumulala-Learn-INF03-00-START.pdf",
  },
  {
    id: "01-html",
    file: "01-html.html",
    subject: "HTML",
    coverTitle: "HTML",
    coverSub: "od polecenia z arkusza do gotowego kodu",
    coverDesc:
      "Semantyczny szkielet, bloki, listy, tabele, formularze i odnośniki. Każde polecenie z arkusza ma tutaj swój znacznik i gotowy fragment do wklejenia.",
    accent: "#6c3baa",
    accentSoft: "#f3e8ff",
    icon: "html",
    chips: ["mapa poleceń", "gotowe bloki", "formularze", "checklista"],
    inside: [
      ["01", "Szkielet HTML5 i semantyczne bloki"],
      ["02", "Tekst, odnośniki, obrazy, listy"],
      ["03", "Tabele i scalanie komórek"],
      ["04", "Formularze i kontrolki"],
    ],
    out: "Kumulala-Learn-INF03-01-HTML.pdf",
  },
  {
    id: "02-css",
    file: "02-css.html",
    subject: "CSS",
    coverTitle: "CSS",
    coverSub: "selektory, layout i formatowanie bez zgadywania",
    coverDesc:
      "Od „dla bloku nagłówkowego…” do gotowej reguły. Box model, kolory, hover, overflow, position i trzy sprawdzone sposoby na układ bloków z arkusza.",
    accent: "#db2777",
    accentSoft: "#fce7f3",
    icon: "css",
    chips: ["mapa poleceń", "layout", "hover i transition", "checklista"],
    inside: [
      ["01", "Selektory i kaskada"],
      ["02", "Box model, kolor, typografia"],
      ["03", "Hover, cień, overflow, position"],
      ["04", "Gotowe layouty i pełny styl.css"],
    ],
    out: "Kumulala-Learn-INF03-02-CSS.pdf",
  },
  {
    id: "03-javascript",
    file: "03-javascript.html",
    subject: "JavaScript",
    coverTitle: "JavaScript",
    coverSub: "DOM, zdarzenia i obliczenia krok po kroku",
    coverDesc:
      "Pobieranie danych z kontrolek, liczenie, walidacja i wyświetlanie wyniku. Wzorce z arkuszy 2023–2025 rozłożone na części i gotowe do dopasowania.",
    accent: "#b45309",
    accentSoft: "#fef3c7",
    icon: "js",
    chips: ["DOM", "zdarzenia", "obliczenia", "gotowe skrypty"],
    inside: [
      ["01", "Gdzie wstawić skrypt"],
      ["02", "Pobieranie danych i wyświetlanie"],
      ["03", "Warunki, pętle, funkcje"],
      ["04", "Trzy gotowe skrypty egzaminacyjne"],
    ],
    out: "Kumulala-Learn-INF03-03-JavaScript.pdf",
  },
  {
    id: "04-sql",
    file: "04-sql.html",
    subject: "SQL",
    coverTitle: "SQL",
    coverSub: "od treści kwerendy do gotowego SELECT-a",
    coverDesc:
      "Cztery zapytania, import, zrzuty i cała reszta. Słownik poleceń, JOIN, GROUP BY, konta i uprawnienia oraz błędy, które najczęściej kosztują punkty.",
    accent: "#0f766e",
    accentSoft: "#d1fae5",
    icon: "sql",
    chips: ["4 kwerendy", "JOIN", "GROUP BY", "GRANT"],
    inside: [
      ["01", "phpMyAdmin i import bazy"],
      ["02", "SELECT, WHERE, JOIN, GROUP BY"],
      ["03", "INSERT, UPDATE, ALTER, VIEW"],
      ["04", "Konta, uprawnienia i zrzuty"],
    ],
    out: "Kumulala-Learn-INF03-04-SQL.pdf",
  },
  {
    id: "05-php",
    file: "05-php.html",
    subject: "PHP",
    coverTitle: "PHP",
    coverSub: "połączenie z bazą i skrypty, które działają",
    coverDesc:
      "mysqli, $_GET, pętle i wyświetlanie danych. Wzorce: lista z bazy, galeria z odnośnikiem, szczegóły rekordu i formularz zapisujący do bazy.",
    accent: "#7c3aed",
    accentSoft: "#ede9fe",
    icon: "php",
    chips: ["mysqli", "$_GET", "pętle", "wzorce z arkuszy"],
    inside: [
      ["01", "Podstawy PHP i połączenie z bazą"],
      ["02", "Pobieranie i wyświetlanie danych"],
      ["03", "Galeria, szczegóły, formularz"],
      ["04", "Debugowanie i checklista"],
    ],
    out: "Kumulala-Learn-INF03-05-PHP.pdf",
  },
];

const iconSvg = {
  star: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 9l14.6 33.4L110 46.7 84.2 69.2 91.5 105 60 86.2 28.5 105l7.3-35.8L10 46.7l35.4-4.3L60 9z" fill="url(#g)" stroke="#6c3baa" stroke-width="3.4" stroke-linejoin="round"/>
    <circle cx="48" cy="58" r="4.2" fill="#2e1065"/><circle cx="72" cy="58" r="4.2" fill="#2e1065"/>
    <path d="M52 71q8 7 16 0" stroke="#2e1065" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="39" cy="68" r="5.2" fill="#fbcfe8" opacity=".85"/><circle cx="81" cy="68" r="5.2" fill="#fbcfe8" opacity=".85"/>
    <defs><linearGradient id="g" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#e9d5ff"/><stop offset=".55" stop-color="#fbcfe8"/><stop offset="1" stop-color="#fef3c7"/></linearGradient></defs>
  </svg>`,
  html: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="18" width="96" height="84" rx="18" fill="url(#g)" stroke="#6c3baa" stroke-width="3.2"/>
    <path d="M45 44L30 60l15 16M75 44l15 16-15 16" stroke="#2e1065" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M66 38L54 82" stroke="#7e22ce" stroke-width="5" stroke-linecap="round"/>
    <defs><linearGradient id="g" x1="12" y1="18" x2="108" y2="102" gradientUnits="userSpaceOnUse"><stop stop-color="#f3e8ff"/><stop offset=".55" stop-color="#e9d5ff"/><stop offset="1" stop-color="#fbcfe8"/></linearGradient></defs>
  </svg>`,
  css: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="18" width="96" height="84" rx="18" fill="url(#g)" stroke="#db2777" stroke-width="3.2"/>
    <path d="M48 40c-9 0-9 8-9 12s-3 8-9 8c6 0 9 4 9 8s0 12 9 12M72 40c9 0 9 8 9 12s3 8 9 8c-6 0-9 4-9 8s0 12-9 12" stroke="#9d174d" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="60" cy="60" r="4.5" fill="#db2777"/>
    <defs><linearGradient id="g" x1="12" y1="18" x2="108" y2="102" gradientUnits="userSpaceOnUse"><stop stop-color="#fce7f3"/><stop offset=".55" stop-color="#fbcfe8"/><stop offset="1" stop-color="#fef3c7"/></linearGradient></defs>
  </svg>`,
  js: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="18" width="96" height="84" rx="18" fill="url(#g)" stroke="#b45309" stroke-width="3.2"/>
    <text x="31" y="77" font-family="Fredoka, sans-serif" font-size="38" font-weight="700" fill="#92400e">JS</text>
    <circle cx="86" cy="42" r="5" fill="#f59e0b" opacity=".7"/>
    <defs><linearGradient id="g" x1="12" y1="18" x2="108" y2="102" gradientUnits="userSpaceOnUse"><stop stop-color="#fef3c7"/><stop offset=".55" stop-color="#fde68a"/><stop offset="1" stop-color="#fbcfe8"/></linearGradient></defs>
  </svg>`,
  sql: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="33" rx="37" ry="13" fill="#ccfbf1" stroke="#0f766e" stroke-width="3.2"/>
    <path d="M23 33v52c0 7.2 16.6 13 37 13s37-5.8 37-13V33" fill="url(#g)" stroke="#0f766e" stroke-width="3.2"/>
    <path d="M23 55c0 7.2 16.6 13 37 13s37-5.8 37-13M23 75c0 7.2 16.6 13 37 13s37-5.8 37-13" stroke="#0f766e" stroke-width="3.2"/>
    <defs><linearGradient id="g" x1="23" y1="33" x2="97" y2="98" gradientUnits="userSpaceOnUse"><stop stop-color="#ecfdf5"/><stop offset=".55" stop-color="#d1fae5"/><stop offset="1" stop-color="#a7f3d0"/></linearGradient></defs>
  </svg>`,
  php: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="28" width="100" height="64" rx="18" fill="url(#g)" stroke="#7c3aed" stroke-width="3.2"/>
    <text x="25" y="69" font-family="JetBrains Mono, monospace" font-size="21" font-weight="700" fill="#5b21b6">php</text>
    <path d="M74 45l-9 30M88 45l-9 30" stroke="#a78bfa" stroke-width="4" stroke-linecap="round"/>
    <defs><linearGradient id="g" x1="10" y1="28" x2="110" y2="92" gradientUnits="userSpaceOnUse"><stop stop-color="#ede9fe"/><stop offset=".55" stop-color="#ddd6fe"/><stop offset="1" stop-color="#fbcfe8"/></linearGradient></defs>
  </svg>`,
};

function coverHtml(doc) {
  const list = doc.inside
    .map(
      ([n, t]) => `<li><span class="num">${n}</span><span>${t}</span></li>`,
    )
    .join("");
  const chips = doc.chips
    .map((c) => `<span class="chip"><b>✦</b> ${c}</span>`)
    .join("");
  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>kumulala learn · ${doc.subject}</title>
<link rel="stylesheet" href="../assets/cover.css">
</head>
<body style="--accent:${doc.accent}; --accent-soft:${doc.accentSoft};">
<div class="cover">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <span class="sparkle s1">✦</span>
  <span class="sparkle s2">✧</span>
  <span class="sparkle s3">✦</span>
  <span class="sparkle s4">♡</span>
  <span class="sparkle s5">✿</span>
  <span class="heart" style="right:22mm; top:105mm;">♡</span>

  <div class="cover-top">
    <div class="brand">
      <div class="brand-mark">${iconSvg.star}</div>
      <div class="brand-text">
        <div class="brand-name">kumulala <span>learn</span></div>
        <div class="brand-tag">egzamin inf.03 · część praktyczna</div>
      </div>
    </div>
    <div class="cover-badge"><span class="dot"></span> materiał do nauki</div>
  </div>

  <div class="cover-main">
    <div class="cover-kicker"><i></i> ściąga tematyczna · ${doc.subject}</div>
    <h1>${doc.coverTitle}</h1>
    <p class="cover-sub">${doc.coverSub}</p>
    <p class="cover-desc">${doc.coverDesc}</p>
    <div class="cover-chips">${chips}</div>
  </div>

  <div class="cover-art">
    <div class="art-card">${iconSvg[doc.icon]}</div>
    <div class="art-label">kumulala learn ♡</div>
  </div>

  <div class="cover-card">
    <div>
      <h2>w środku <span>znajdziesz</span></h2>
      <ul class="cover-list">${list}</ul>
    </div>
    <div class="cover-note">
      <div class="big">Najpierw polecenie,<br>potem kod.</div>
      <div class="small">Każda tabela ma po lewej sformułowanie z arkusza, a po prawej gotową odpowiedź. Szukaj po słowach, nie po nazwach właściwości.</div>
    </div>
  </div>

  <div class="cover-footer">
    <span><b>kumulala learn <span class="heart">♡</span></b> · egzamin inf.03</span>
    <span>materiał do nauki przed egzaminem · nie do ściągania</span>
  </div>
</div>
</body>
</html>`;
}

async function ensureDirs() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(TMP, { recursive: true });
}

async function renderHtml(browser, fileUrl, outPdf, { cover = false } = {}) {
  const page = await browser.newPage();
  await page.goto(fileUrl, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  // Prism, jeśli jest na stronie
  await page.evaluate(async () => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
    await document.fonts.ready;
  });
  await page.waitForTimeout(150);
  await page.pdf({
    path: outPdf,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: cover,
    margin: cover
      ? { top: "0", right: "0", bottom: "0", left: "0" }
      : { top: "17mm", right: "13mm", bottom: "15mm", left: "13mm" },
    displayHeaderFooter: !cover,
    headerTemplate: cover ? "" : headerTemplate(),
    footerTemplate: cover ? "" : footerTemplate(),
    outline: true,
    tagged: true,
  });
  await page.close();
}

let cachedHeader = null;
function headerTemplate() {
  if (cachedHeader) return cachedHeader;
  cachedHeader = `<div style="width:100%; font-family: 'Nunito', -apple-system, 'Segoe UI', sans-serif; font-size:7.2pt; color:#7e22ce; padding:0 13mm; display:flex; align-items:flex-end; justify-content:space-between; box-sizing:border-box;">
    <span style="font-weight:800; letter-spacing:.02em;">kumulala learn <span style="color:#db2777;">♡</span> · egzamin inf.03</span>
    <span style="font-weight:700; color:#5b3093;">ściąga tematyczna</span>
  </div>`;
  return cachedHeader;
}

let cachedFooter = null;
function footerTemplate() {
  if (cachedFooter) return cachedFooter;
  cachedFooter = `<div style="width:100%; font-family: 'Nunito', -apple-system, 'Segoe UI', sans-serif; font-size:7pt; color:#7e22ce; padding:0 13mm; display:flex; align-items:center; justify-content:space-between; box-sizing:border-box;">
    <span style="font-weight:700; color:#8b7aa8;">materiał do nauki przed egzaminem</span>
    <span style="font-weight:800; color:#5b3093;">str. <span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;
  return cachedFooter;
}

async function mergePdf(coverPath, contentPath, outPath, doc) {
  const coverBytes = await fs.readFile(coverPath);
  const contentBytes = await fs.readFile(contentPath);
  const merged = await PDFDocument.create();
  const cover = await PDFDocument.load(coverBytes);
  const content = await PDFDocument.load(contentBytes);
  const coverPages = await merged.copyPages(cover, cover.getPageIndices());
  coverPages.forEach((p) => merged.addPage(p));
  const contentPages = await merged.copyPages(content, content.getPageIndices());
  contentPages.forEach((p) => merged.addPage(p));
  merged.setTitle(`kumulala learn · INF.03 · ${doc.subject}`);
  merged.setAuthor("kumulala learn");
  merged.setSubject("Egzamin INF.03 — materiał do nauki");
  merged.setKeywords([
    "INF.03",
    "egzamin zawodowy",
    "technik informatyk",
    "kumulala learn",
    doc.subject,
  ]);
  merged.setCreator("kumulala learn");
  merged.setProducer("kumulala learn · PDF build");
  await fs.writeFile(outPath, await merged.save());
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch({ headless: true });

  // --rev <nr>: dynamiczna rewizja z release taga, domyślnie "1"
  const revIdx = process.argv.indexOf("--rev");
  const revision = revIdx >= 0 ? process.argv[revIdx + 1] : "1";

  // --only <id>: konkretny PDF (albo pierwszy arg pozycyjny bez --)
  const only = process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2] : undefined;
  const selected = only ? docs.filter((d) => d.id === only || d.file === only) : docs;

  for (const doc of selected) {
    const coverPath = path.join(TMP, `${doc.id}-cover.pdf`);
    const contentPath = path.join(TMP, `${doc.id}-content.pdf`);
    const coverFile = path.join(TMP, `${doc.id}-cover.html`);
    const contentFile = path.join(TMP, `${doc.id}-content.html`);

    // cover
    await fs.writeFile(coverFile, coverHtml(doc), "utf8");
    console.log(`→ cover ${doc.id}`);
    await renderHtml(browser, `file://${coverFile}`, coverPath, { cover: true });

    // content z podstawioną rewizją
    let html = await fs.readFile(path.join(SRC, doc.file), "utf8");
    html = html.replace("Rewizja PREVIEW_REVISION", `Rewizja ${revision}`);
    await fs.writeFile(contentFile, html, "utf8");
    console.log(`→ content ${doc.id}`);
    await renderHtml(browser, `file://${contentFile}`, contentPath);

    console.log(`→ merge ${doc.out}`);
    await mergePdf(coverPath, contentPath, path.join(OUT, doc.out), doc);
  }
  await browser.close();
  console.log("gotowe ♡");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
