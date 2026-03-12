// Ethiopian localization utilities

export function formatCurrency(amount: number): string {
  return `ETB ${amount.toLocaleString("en-ET")}`
}

export function formatCurrencyAmharic(amount: number): string {
  return `${amount.toLocaleString("en-ET")} ብር`
}

export function formatTime(time: string): string {
  return `${time} EAT`
}

export function formatDateTimeEAT(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  return `${d.toLocaleDateString("en-ET", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa",
  })} (EAT)`
}

export function formatEATTime(time: string): string {
  return `${time} EAT`
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-ET", {
    timeZone: "Africa/Addis_Ababa",
    ...options,
  })
}

export const paymentMethods = [
  { id: "telebirr", name: "Telebirr", icon: "phone" },
  { id: "cbe-birr", name: "CBE Birr", icon: "building" },
  { id: "amole", name: "Amole", icon: "wallet" },
  { id: "card", name: "Debit/Credit Card", icon: "credit-card" },
] as const

export const businessHours = {
  start: "8:00 AM EAT",
  end: "8:00 PM EAT",
  timezone: "UTC+3",
}
