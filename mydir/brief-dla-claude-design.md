# Brief redesignowy — Medykalni.pl

## Kontekst projektu

**Medykalni** to serwis ofertowy skierowany do:
- Położnych (główny produkt: kurs „Prowadzenie ciąży przez położną")
- Placówek medycznych (rekrutacja specjalistów)
- Położnych prowadzących własną praktykę (program „Położna na swoim")

Cel przebudowy designu: nadać stronie bardziej profesjonalny, wyrazisty wygląd, który buduje zaufanie w środowisku medycznym i konwertuje odwiedzających do zapisu/kontaktu. Obecny design jest poprawny technicznie, ale generyczny — chcemy czegoś, co wyróżnia się spośród typowych stron szkoleniowych.

---

## Stack techniczny

- **Astro** (statyczny SSG) + **Tailwind CSS v4**
- Fonty: `Plus Jakarta Sans` (nagłówki), `Inter` (tekst)
- Kod komponentów: `.astro` pliki (HTML + opcjonalnie `<script>`)

---

## Aktualna paleta kolorów

```css
--color-primary: #1E3A5F;        /* granatowy — główny */
--color-primary-dark: #163047;   /* ciemniejszy granat */
--color-accent: #2FA4A9;         /* teal/morski — akcent */
--color-accent-light: #5BC0C5;
--color-background-light: #F8FAFC;
--color-background-lighter: #EEF2F6;
```

Tło ciemnej sekcji (footer, finalCTA): `bg-gray-900` / gradient `from-primary to-primary-dark`.

---

## Struktura strony głównej (kolejność sekcji)

1. **TopBar** — wąski pasek z telefonem, e-mailem, tagline
2. **Header** — nawigacja (Szkolenia, Projekty▾, Dla placówek, O nas, Kontakt) + CTA „Zapisz się"
3. **Hero** — H1, podtytuł, 2 przyciski CTA, 4 trust points, zdjęcie po prawej (grid 2-kolumnowy)
4. **ForWho** — 3 kafle: Położne / Położna na swoim / Placówki medyczne
5. **Problem** — lista 6 problemów z czerwonymi bullet-pointami
6. **Solution** — rozwiązania (sekcja do uzupełnienia)
7. **Authority** — 4 karty z twarzami: Anna Plaskota-Gładosz, Anna Buczek, Magdalena Golba, Artur Gładosz
8. **Process** — kroki: Wybór pakietu → Zapis → Potwierdzenie → Realizacja
9. **Trainings** — karta kursu (1 produkt)
10. **Testimonials** — 3 opinie (grid 3-kolumnowy)
11. **Blog** — 3 wpisy (opcjonalne)
12. **FinalCTA** — gradient granatowy, nagłówek + 2 przyciski
13. **Footer** — 4 kolumny: O firmie / Kontakt / Szybkie linki / Informacje + social

---

## Co chcemy poprawić / priorytety redesignu

### 1. Ogólna estetyka — problem do rozwiązania
Obecny design jest „bezpieczny" — czyste karty, dużo szarego, kafle w grid. Wygląda jak każda inna strona szkoleniowa. Chcemy:
- Wyrazistszą typografię (większe kontrasty wagowe, ciekawsze proporcje)
- Bardziej zdecydowane użycie koloru primary `#1E3A5F` — nie tylko w przyciskach
- Elementy graficzne/dekoracyjne (np. subtelne formy geometryczne, gradientowe bloki tła) które nadają charakteru bez bałaganu
- Poczucie „wysokiej jakości szkolenia medycznego" — nie startupowy landing, nie akademicki pdf

### 2. Hero
- Obecna: tekst po lewej, zdjęcie po prawej w zaokrąglonej ramce z gradientem
- Chcemy: bardziej dramatyczny układ; może tło sekcji z subtelną teksturą lub dużym blokiem koloru; nagłówek wyraźnie większy i śmielszy
- Trust points (4 ikonki) mogą być bardziej graficzne, nie tylko tekst z check-markiem

### 3. Sekcja Problem
- Obecna: lista biało-szarych kart z czerwonymi kółkami bullet
- Chcemy: coś bardziej emocjonalnego i czytelnego — może inne tło sekcji, większy kontrast

### 4. Karty w ForWho
- Obecna: `bg-background-lighter` (jasnoszare tło) — prawie niewidoczne
- Chcemy: wyraźniejsze wyróżnienie kafli, może border, może głębszy cień, może kolor tła jednego z kafli (główna oferta)

### 5. Authority (zespół)
- Obecna: 4 karty z kwadratowym zdjęciem
- Chcemy: bardziej ludzki, ciepły układ — może karty z lekkim przechyleniem, może układ 2+2 z większym zdjęciem głównej osoby

### 6. Navigation
- Obecna: białe tło, szary tekst — za słabe
- Chcemy: bardziej zaznaczona tożsamość wizualna; może linia kolorowa na dole headera, może subtelniejsze tło

---

## Czego NIE zmieniamy (ograniczenia)

- **Struktura URL i sitemap** — bez zmian
- **Treść tekstowa** — bez zmian (tylko redesign wyglądu)
- **Stack** — Astro + Tailwind v4 (bez dodatkowych frameworków JS)
- **Responsywność** — strona musi działać na mobile (breakpointy: sm/md/lg jak dotąd)
- **Dostępność** — semantic HTML, kontrast min. WCAG AA

---

## Komponenty do redesignu (priorytet)

Kolejność wg wpływu na konwersję:

| Plik | Opis | Priorytet |
|------|------|-----------|
| `src/components/Hero.astro` | Główna sekcja — największy wpływ | 🔴 krytyczny |
| `src/components/Header.astro` | Nawigacja — widoczna na każdej stronie | 🔴 krytyczny |
| `src/components/ForWho.astro` | 3 kafle dla grup docelowych | 🟠 wysoki |
| `src/styles/global.css` | Paleta, fonty, bazowe style | 🟠 wysoki |
| `src/layouts/Layout.astro` | Bazowy layout HTML | 🟡 średni |
| `src/components/Authority.astro` | Karty zespołu | 🟡 średni |
| `src/components/FinalCTA.astro` | Końcowy call-to-action | 🟡 średni |
| `src/components/Problem.astro` | Lista problemów | 🟡 średni |
| `src/components/Footer.astro` | Stopka | 🟢 niski |
| `src/components/Testimonials.astro` | Opinie | 🟢 niski |

---

## Przykładowe kierunki stylistyczne (do omówienia)

### Kierunek A — „Medical Premium"
Ciemne, nasycone tła w granatowym kolorze (`#1E3A5F`) dla kluczowych sekcji, biały tekst, czyste linie. Minimalizm z powagą. Podobny feel do premium klinik prywatnych.

### Kierunek B — „Warm Professional"
Dominacja bieli i jasnego beżu/kremowego tła zamiast szarości, akcenty w tealu, fotografia w forefront. Cieplejszy, bardziej ludzki. Dobry dla zaufania.

### Kierunek C — „Bold Educational"
Wyraziste typograficzne sekcje z pełnoekranowymi pasami koloru, duże liczby/stats, mocne nagłówki. Bardziej aggressive, jak strona bootcampu.

---

## Kluczowe CTA na stronie

- **Główne**: „Zapisz się na kurs" → `/szkolenia/prowadzenie-ciazy-przez-polozna#zapisy`
- **Drugorzędne**: „Poznaj projekty" → `/projekty`
- **Kontakt**: telefon `+48 881 489 851`, email `kontakt@medykalni.pl`

---

## Pytania do projektanta

1. Który kierunek stylistyczny (A/B/C) lub ich połączenie rekomendujecie dla serwisu szkoleniowego B2P/B2B w ochronie zdrowia?
2. Czy zachować obecne kolory (`#1E3A5F` + `#2FA4A9`) czy zaproponować nową paletę?
3. Jak poprawić sekcję Hero bez dostępu do profesjonalnej fotografii (mamy zdjęcia zespołu, ale nie sesję zdjęciową)?
4. Czy fonty `Plus Jakarta Sans` + `Inter` są odpowiednie, czy warto zmienić?

---

## Pliki kodu źródłowego (do wglądu)

Wszystkie komponenty to pliki `.astro` — format: blok frontmatter `---` (JS/TS) + HTML z klasami Tailwind. Nie ma osobnych plików CSS per-komponent — całe stylowanie przez klasy utility.

Paleta w `src/styles/global.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --color-primary: #1E3A5F;
  --color-primary-dark: #163047;
  --color-accent: #2FA4A9;
  --color-accent-light: #5BC0C5;
  --color-background-light: #F8FAFC;
  --color-background-lighter: #EEF2F6;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```
