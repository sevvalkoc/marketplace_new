const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

/** Normalises an Edit article's "Month YYYY" display date to ISO-8601 for
 * structured data and the sitemap. The data model only stores month + year,
 * so the day is fixed at 01 as the earliest reasonable point in the stated
 * month rather than invented, and no modified date is emitted since nothing
 * tracks that. */
export function toISODate(display: string): string | undefined {
  const [monthName, year] = display.trim().split(/\s+/);
  const month = MONTHS[monthName?.toLowerCase()];
  if (!month || !year) return undefined;
  return `${year}-${month}-01`;
}
