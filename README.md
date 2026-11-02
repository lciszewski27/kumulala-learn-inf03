<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://via.placeholder.com/1x1/7c3aed/7c3aed?text=%20">
  <img alt="kumulala learn • egzamin inf.03" src="https://via.placeholder.com/1x1/6c3baa/6c3baa?text=%20" align="right" width="1" height="1">
</picture>

<h1 align="center">
  <code>kumulala learn ♡</code>
  <br>
  <sub>egzamin INF.03 — materiał do nauki</sub>
</h1>

<p align="center">
  <a href="https://github.com/lciszewski27/kumulala-learn-inf03/releases"><img src="https://img.shields.io/github/v/release/lciszewski27/kumulala-learn-inf03?color=%236c3baa&label=rewizja&logo=github" alt="Release"></a>
  <a href="https://github.com/lciszewski27/kumulala-learn-inf03/actions"><img src="https://img.shields.io/github/actions/workflow/status/lciszewski27/kumulala-learn-inf03/release.yml?color=%235b3093&label=build&logo=githubactions" alt="Build"></a>
  <a href="https://github.com/lciszewski27/kumulala-learn-inf03/issues"><img src="https://img.shields.io/github/issues/lciszewski27/kumulala-learn-inf03?color=%237c3aed&label=issues&logo=github" alt="Issues"></a>
</p>

---

Sześć tematycznych ściąg PDF do **części praktycznej egzaminu INF.03** (Technik Informatyk). Każda ściąga tłumaczy polecenia z oficjalnych arkuszy CKE na gotowy kod — HTML, CSS, JavaScript, SQL i PHP. W pastelowej stylistyce, w formacie A4.

To nie jest podręcznik, który czytasz od deski do deski — to **zbiór wiedzy i przykładów do podglądania podczas nauki**. Gdy ćwiczysz na arkuszach i nie pamiętasz, jak napisać konkretne zapytanie, selektor czy skrypt — zamiast bezmyślnie wklejać do AI, otwierasz odpowiednią ściągę i sprawdzasz. Szybciej, bardziej celowo i uczysz się przy okazji.

## 📦 PDF-y

| Plik | Dział | O czym jest |
|:---|---:|:---|
| `…-00-START.pdf` | Plan egzaminu | 150 min, 5 rezultatów, checklista oddania |
| `…-01-HTML.pdf` | HTML | bloki semantyczne, listy, tabele, formularze, obrazy |
| `…-02-CSS.pdf` | CSS | selektory, flex/grid/float, kolory, hover, layout |
| `…-03-JavaScript.pdf` | JavaScript | DOM, zdarzenia, pętle, Math, stringi, pliki, gotowe skrypty |
| `…-04-SQL.pdf` | SQL | SELECT/WHERE/JOIN/GROUP BY, DELETE, VIEW, daty, konta |
| `…-05-PHP.pdf` | PHP | mysqli, pętla, galeria, formularz, szczegóły, debug |
| `…-MASTER.pdf`| wszystkie 6 w jednym | z zakładkami nawigacyjnymi |

PDF-y generowane są z kodu HTML przez Playwright + pdf-lib. Źródła leżą w `src/`, styl w `assets/`, pipeline w `scripts/`.

## 🚀 Użycie

### Pobrać gotowe PDF-y
[→ **Ostatnie wydanie**](https://github.com/lciszewski27/kumulala-learn-inf03/releases/latest) — pobierz archiwum z wybranymi plikami.

### Zbudować samodzielnie
```bash
git clone https://github.com/lciszewski27/kumulala-learn-inf03.git
cd kumulala-learn-inf03
npm ci
npx playwright install chromium --with-deps
node scripts/build.mjs         # wszystkie PDF-y
node scripts/merge-master.mjs   # master z zakładkami
```

Wynik w `output/`.

## 🐞 Zgłaszanie problemów

Znalazłeś błąd merytoryczny? Brakuje jakiegoś zagadnienia? Masz pomysł na ulepszenie?

→ [**Otwórz Issue**](https://github.com/lciszewski27/kumulala-learn-inf03/issues/new/choose)

Przed otwarciem sprawdź, czy podobny temat nie jest już zgłoszony. Każde zgłoszenie pomaga.

## 📄 Licencja

Materiał został wygenerowany z pomocą sztucznej inteligencji na podstawie oficjalnych arkuszy CKE, zasad oceniania oraz własnego doświadczenia autora.

**Autor zezwala na dowolne udostępnianie, kopiowanie i modyfikowanie** tych materiałów — wystarczy zachować informację o źródle: **kumulala learn**.

<p align="center"><code>kumulala learn ♡ · egzamin inf.03</code></p>