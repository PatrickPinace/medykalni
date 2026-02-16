Cel
Od-hardcodować daty i ceny kursu „Prowadzenie ciąży przez położną” tak, aby:

ceny (Podstawowy/Standard/Premium) i terminy (daty + miejsce + link zapisu) były edytowane w jednym miejscu,

te same wartości były automatycznie użyte w kilku sekcjach strony (karty pakietów, box „Najbliższy termin”, tabelka z termin/miejsce/forma/cena, itd.),

formaty dat były spójne (koniec z ręcznym wpisywaniem „18 października” vs „18–19.10.2025” itp.).

Stack / założenia
Strona w Astro.

Treść/dane mają być trzymane w src/content/courses/*.yaml (jedno źródło prawdy).

Docelowo dane mają być edytowalne przez nietechniczną osobę (przez CMS typu Decap), ale w pierwszym etapie wystarczy przeniesienie hardcodów do YAML i wykorzystanie tego w komponentach.

Zakres prac (etap 1: dane + refaktor renderowania)
Dodać plik danych kursu: src/content/courses/prowadzenie-ciazy.yaml (format poniżej).

Przerobić komponenty strony kursu tak, aby:

ceny w kartach pakietów i w porównaniu pakietów brały dane z pricing,

box „Najbliższy termin” brał dane z „najbliższej edycji” (pierwsza przyszła edycja z editions[]),

sekcja „1 dzień szkolenia… – [data]” w pakiecie Podstawowym brała editions[x].onsite.start,

sekcja „Szkolenia stacjonarne 18 i 19 …” w Standard brała zakres onsite.start + onsite.end,

linki CTA „Zapisz się teraz / Wybierz pakiet” brały editions[x].signupUrl.

Ujednolicić formatowanie dat:

w danych przechowywać daty jako ISO YYYY-MM-DD,

w UI formatować daty funkcją pomocniczą (np. formatSingleDatePL, formatRangeDatePL, formatShortRangePL), żeby te same daty dało się pokazać w różnych wariantach UI.

Miejsce/miasto/województwo w boksie „Najbliższy termin” i w tabelce ma pochodzić z danych (place + ewentualnie override per edycja).

Program kursu (moduły I–VI) może pozostać stały (hardcoded/Markdown), natomiast w treści modułów trzeba poprawić informację które moduły są online/stacjonarne (jeśli jest teraz błędna).

Zakres prac (etap 2: CMS dla nietechnicznych — opcjonalnie)
Dodać Decap CMS jako /public/admin i skonfigurować kolekcję „Courses” tak, żeby edytować tylko pricing i editions przez UI (widget list).

Hosting: Cloudflare Pages + GitHub, więc do logowania Decap przez GitHub trzeba skonfigurować OAuth handler (Pages Functions/Workers lub gotowy starter).

Kryteria akceptacji
Zmiana ceny w jednym miejscu (YAML) aktualizuje wszystkie miejsca na stronie, gdzie ta cena występuje.

Zmiana dat edycji w jednym miejscu (YAML) aktualizuje wszystkie miejsca na stronie, gdzie daty występują (w tym „Najbliższy termin” oraz opisy w pakietach).

Brak ręcznie wpisanych dat/cen w komponentach (poza fallbackami/placeholderami).

Spójne formaty wyświetlania dat (nie mieszamy kilku zapisów wynikających z ręcznej edycji).

Notatki
W przyszłości może dojść blog/aktualności, więc struktura danych powinna być gotowa na wiele wpisów i wiele edycji kursu.

Proponowany plik src/content/courses/prowadzenie-ciazy.yaml
Wersja „praktyczna”: edytowalne są tylko ceny i edycje (terminy + link zapisu), moduły możesz trzymać dalej jako stałą treść na stronie.

text
title: "Prowadzenie ciąży przez położną"
slug: "prowadzenie-ciazy-przez-polozna"
status: "active" # active | coming_soon | archived

format: "Stacjonarne + online"

place:
  city: "Mielec"
  region: "Podkarpackie"
  country: "PL"

pricing:
  basic: 1499
  standard: 2499
  premium: 4499
  currency: "PLN"

editions:
  - id: "2025-10"
    active: true
    signupUrl: "https://example.com/zapisy" # podmień na realny link
    onsite:
      start: "2025-10-18"
      end: "2025-10-19"
    # Jeżeli kiedyś miejsce się zmieni dla konkretnej edycji, można nadpisać:
    # placeOverride:
    #   city: "Rzeszów"
    #   region: "Podkarpackie"
    notes:
      # Podstawowy ma 1 dzień stacjonarny — przyjmujemy, że to pierwszy dzień:
      basicDay: 1
      # Standard obejmuje oba dni:
      standardDays: "1-2"
      # Tekst o online (jeśli chcesz go wyświetlać w boxie / pakiecie):
      onlineSummary: "Szkolenie online (Moduł IV) + mentoring (Moduł V)"
Opcjonalnie: jeśli chcesz też „Program kursu” jako dane
Jeśli w przyszłości chcesz, żeby Medykalni edytowali też moduły w panelu, można dopisać (na razie jako stałe):

text
modules:
  - id: "I"
    title: "Moduł I: Podstawy prowadzenia ciąży przez położną"
    mode: "onsite" # onsite | online
  - id: "II"
    title: "Moduł II: Prowadzenie ciąży w praktyce"
    mode: "onsite"
  - id: "III"
    title: "Moduł III: Kinesiotaping w ciąży"
    mode: "onsite"
  - id: "IV"
    title: "Moduł IV: Suplementacja, odżywianie i interpretacja badań"
    mode: "online"
  - id: "V"
    title: "Moduł V: Mentoring i wsparcie w prowadzeniu ciąży"
    mode: "online"
  - id: "VI"
    title: "Moduł VI: Kontraktowanie z NFZ i wsparcie prawno-biznesowe"
    mode: "online"
