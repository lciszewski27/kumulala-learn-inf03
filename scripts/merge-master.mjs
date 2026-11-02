import { PDFDocument, PDFName, PDFString } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "output");

const parts = [
  "Kumalala-Learn-INF03-00-START.pdf",
  "Kumalala-Learn-INF03-01-HTML.pdf",
  "Kumalala-Learn-INF03-02-CSS.pdf",
  "Kumalala-Learn-INF03-03-JavaScript.pdf",
  "Kumalala-Learn-INF03-04-SQL.pdf",
  "Kumalala-Learn-INF03-05-PHP.pdf",
];

const master = await PDFDocument.create();
master.setTitle("kumalala learn · INF.03 · MASTER");
master.setAuthor("kumalala learn");
master.setSubject("Egzamin INF.03 — komplet materiałów do nauki");
master.setKeywords([
  "INF.03",
  "egzamin zawodowy",
  "technik informatyk",
  "kumalala learn",
  "HTML",
  "CSS",
  "JavaScript",
  "SQL",
  "PHP",
]);
master.setCreator("kumalala learn");
master.setProducer("kumalala learn · PDF build");
master.setLanguage("pl");

const sections = [];

for (const file of parts) {
  const bytes = await fs.readFile(path.join(OUT, file));
  const doc = await PDFDocument.load(bytes);
  const startPage = master.getPageCount();
  const totalPages = doc.getPageCount();
  // skip last page (powtarzająca się sekcja linków) we wszystkich PDF-ach po pierwszym
  const isLast = (parts.indexOf(file) === parts.length - 1);
  const endIndex = isLast ? totalPages : totalPages - 1;
  const indices = Array.from({ length: endIndex }, (_, i) => i);
  const pages = await master.copyPages(doc, indices);
  pages.forEach((page) => master.addPage(page));
  sections.push({ title: file.replace("Kumalala-Learn-INF03-", "").replace(".pdf", ""), pageIndex: startPage });
  console.log(`→ ${file} (${pages.length} str.)`);
}

// zakładki nawigacyjne w panelu PDF-a
const context = master.context;
const outlinesRef = context.nextRef();
const itemRefs = sections.map(() => context.nextRef());

context.assign(
  outlinesRef,
  context.obj({
    Type: "Outlines",
    First: itemRefs[0],
    Last: itemRefs[itemRefs.length - 1],
    Count: sections.length,
  })
);

sections.forEach((section, i) => {
  const item = context.obj({
    Title: PDFString.of(section.title),
    Parent: outlinesRef,
    Dest: [master.getPage(section.pageIndex).ref, PDFName.of("Fit")],
  });
  if (i > 0) item.set(PDFName.of("Prev"), itemRefs[i - 1]);
  if (i < sections.length - 1) item.set(PDFName.of("Next"), itemRefs[i + 1]);
  context.assign(itemRefs[i], item);
});

master.catalog.set(PDFName.of("Outlines"), outlinesRef);
master.catalog.set(PDFName.of("PageMode"), PDFName.of("UseOutlines"));

const outPath = path.join(OUT, "Kumalala-Learn-INF03-MASTER.pdf");
await fs.writeFile(outPath, await master.save());
console.log(`gotowe ♡  ${path.basename(outPath)} · ${master.getPageCount()} stron`);
