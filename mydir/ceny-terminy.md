Najwygodniej zrobić to na Intl.DateTimeFormat dla pl-PL i użyć formatRange(), które potrafi zwięźle formatować zakres dat zgodnie z lokalizacją.

3 ładne formaty (wybierz 1 dla tego kafelka)
Dla Twojego kafelka „Termin” najczęściej najlepiej wygląda jeden z tych wariantów:

Krótko (jak teraz, ale z odstępami i bez „łamanej”): 18–19.10.2025

Czytelnie słownie: 18–19 października 2025

Gdy różne miesiące/lata: 30 stycznia – 2 lutego 2026 (to zrobi formatRange() automatycznie)

Implementacja: helper formatDateRangePL
W Astro/TS dodaj np. src/utils/dates.ts:

ts
function toDateUTC(iso: string) {
  // ISO "YYYY-MM-DD" -> Date w UTC, żeby nie przesunęło dnia strefą czasową
  return new Date(`${iso}T00:00:00Z`);
}

export function formatDateRangePL(
  startISO: string,
  endISO: string,
  variant: "short" | "long" = "short"
) {
  const start = toDateUTC(startISO);
  const end = toDateUTC(endISO);

  if (variant === "long") {
    const fmt = new Intl.DateTimeFormat("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return fmt.formatRange(start, end);
  }

  // short: 18–19.10.2025 (albo 18.10.2025 jeśli 1 dzień)
  // formatRange samo skraca wspólne części (miesiąc/rok) [web:144]
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  });
  // UWAGA: w PL to może dać "18.10.2025–19.10.2025" (bez spacji).
  // Dodajemy spacje wokół półpauzy, żeby wyglądało “premium”.
  return fmt
    .formatRange(start, end)
    .replace(/\s*[-–]\s*/g, "–");
}
formatRange() ma fajną właściwość: jeśli start i end są „w tym samym” zakresie wg użytej precyzji, potrafi skrócić powtórzenia (np. miesiąc/rok).
​

Użycie w Twoim kafelku „Termin”
Zamiast składać stringa ręcznie:

ts
const term = formatDateRangePL(
  edition.onsite.start,
  edition.onsite.end,
  "short" // albo "long"
);
i w UI wyświetlasz term.