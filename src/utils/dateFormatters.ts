/**
 * Konwertuje datę ISO (YYYY-MM-DD) na Date w UTC,
 * żeby nie przesunęło dnia przez strefę czasową
 */
function toDateUTC(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/**
 * Formatuje zakres dat używając Intl.DateTimeFormat.formatRange()
 *
 * @param startISO - Data początkowa w formacie YYYY-MM-DD
 * @param endISO - Data końcowa w formacie YYYY-MM-DD
 * @param variant - "short" dla "18–19.10.2025" lub "long" dla "18–19 października 2025"
 * @returns Sformatowany zakres dat
 */
export function formatDateRangePL(
  startISO: string,
  endISO: string,
  variant: "short" | "long" = "short"
): string {
  const start = toDateUTC(startISO);
  const end = toDateUTC(endISO);

  if (variant === "long") {
    const fmt = new Intl.DateTimeFormat("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    return fmt.formatRange(start, end);
  }

  // short: 18–19.10.2025 (albo 18.10.2025 jeśli 1 dzień)
  // formatRange samo skraca wspólne części (miesiąc/rok)
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });

  // Dodajemy spacje wokół półpauzy dla lepszego wyglądu
  return fmt
    .formatRange(start, end)
    .replace(/\s*[-–]\s*/g, " – ");
}

/**
 * Formatuje pojedynczą datę na polski format "18 października 2025"
 */
export function formatSingleDatePL(dateString: string): string {
  const date = toDateUTC(dateString);
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return fmt.format(date);
}

/**
 * Formatuje pojedynczą datę na krótki format "18.10.2025"
 */
export function formatShortDatePL(dateString: string): string {
  const date = toDateUTC(dateString);
  const fmt = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  return fmt.format(date);
}

/**
 * @deprecated Użyj formatDateRangePL(start, end, "long") zamiast tego
 */
export function formatShortRangePL(startDate: string, endDate: string): string {
  return formatDateRangePL(startDate, endDate, "long");
}
