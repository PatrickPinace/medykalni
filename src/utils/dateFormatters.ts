/**
 * Formatuje datę ISO (YYYY-MM-DD) na polski format "18 października 2025"
 */
export function formatSingleDatePL(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const months = [
    'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formatuje datę ISO na krótki format "18.10.2025"
 */
export function formatShortDatePL(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

/**
 * Formatuje zakres dat "18.10.2025 i 19.10.2025"
 */
export function formatDateRangePL(startDate: string, endDate: string): string {
  return `${formatShortDatePL(startDate)} i ${formatShortDatePL(endDate)}`;
}

/**
 * Formatuje zakres dat w krótszej formie "18 i 19 października 2025"
 * (jeśli ten sam miesiąc)
 */
export function formatShortRangePL(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');

  const months = [
    'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
  ];

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} i ${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
  }

  return `${formatSingleDatePL(startDate)} – ${formatSingleDatePL(endDate)}`;
}
