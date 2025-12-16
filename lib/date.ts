import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export function formatDateID(date: string | Date, pattern = "dd MMM yyyy") {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern, { locale: id });
}
