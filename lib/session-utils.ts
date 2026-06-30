export function canJoinSession(
  scheduledAt: Date | string | null,
  duration?: number | null,
  status?: string | null
): boolean {
  if (!scheduledAt) return false
  if (status && ['pending', 'completed', 'cancelled', 'missed'].includes(status)) return false
  const start = new Date(scheduledAt)
  const now = Date.now()
  const tenMinBefore = start.getTime() - 10 * 60 * 1000
  const sessionDuration = (duration || 60) * 60 * 1000
  const gracePeriod = 15 * 60 * 1000
  const end = start.getTime() + sessionDuration + gracePeriod
  return now >= tenMinBefore && now <= end
}

export function getJoinButtonLabel(
  scheduledAt: Date | string | null,
  duration?: number | null
): string {
  if (!scheduledAt) return 'Join Session'
  const start = new Date(scheduledAt)
  const now = Date.now()
  const diffMs = start.getTime() - now

  if (diffMs > 10 * 60 * 1000) {
    const diffMin = Math.ceil(diffMs / 60000)
    return `Available in ${diffMin}m`
  }

  const sessionDuration = (duration || 60) * 60 * 1000
  const gracePeriod = 15 * 60 * 1000
  const end = start.getTime() + sessionDuration + gracePeriod
  if (now > end) return 'Expired'
  return 'Join Session'
}
