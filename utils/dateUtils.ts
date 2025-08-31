import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type DateISO8601 = string

function formatMonthAndYear(date: DateISO8601): string {
  return format(date, 'MMMM yyyy', { locale: ptBR })
}

function formatDayMonthYear(date: DateISO8601): string {
  return format(new Date(date), 'dd MMM yyyy', { locale: ptBR })
}

function formatDayMonthYearSlash(date: DateISO8601): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}

export const dateUtils = {
  formatMonthAndYear,
  formatDayMonthYear,
  formatDayMonthYearSlash,
}
