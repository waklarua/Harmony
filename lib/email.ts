export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string
  subject: string
  text: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Harmony <onboarding@resend.dev>',
      to,
      subject,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => 'unknown')
    console.error('Failed to send email:', res.status, body)
  }
}
