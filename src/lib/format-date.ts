/**
 * Format a content date for display. Year-only values ("2025") are printed as-is:
 * `new Date("2025")` parses as 1 January, which would show a placeholder day.
 */
export function formatDisplayDate(
  date: string,
  options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" },
): string {
  if (/^\d{4}$/.test(date)) return date;
  return new Date(date).toLocaleDateString("en-US", options);
}
