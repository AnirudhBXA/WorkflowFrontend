/**
 * Formats a date string to DD/MM/YYYY, HH:MM AM/PM
 * Example: 2026-02-06T14:30:00 -> 06/02/2026, 02:30 PM
 */
export function formatDateTime(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
}

/**
 * Formats a date string to DD/MM/YYYY
 * Example: 2026-02-06 -> 06/02/2026
 */
export function formatDateOnly(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
