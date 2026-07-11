import { NextResponse } from "next/server"

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

const MODELS = [
  "mistralai/mistral-7b-instruct:free",
  "openchat/openchat-7b:free",
  "gryphe/mythomist-7b:free",
  "undi95/toppy-m-7b:free",
  "tencent/hy3:free",
]

const SYSTEM_PROMPT = `You are the Harmony support assistant, a friendly and helpful chatbot for Harmony — an Ethiopian mental health counseling platform.

Here are the key facts about Harmony:
- Harmony connects people with licensed counselors in Ethiopia for mental health support
- Sessions are conducted via Jitsi Meet (video, voice, or chat), no download required
- Payment methods: Telebirr and CBE Birr only (Ethiopian Birr)
- Counselors earn 80% of their hourly rate, platform takes 20% commission
- All times are in East Africa Time (EAT, UTC+3)
- Support email: support@harmonyhealth.et, Phone: 0962029518
- Office: Bole Road, Addis Ababa, Ethiopia
- Business hours: Mon-Fri 8AM-6PM, Sat 9AM-1PM (EAT)
- Counselors must be verified licensed professionals in Ethiopia
- Clients can browse counselors, filter by specialty, check availability, and book sessions
- Cancellation policy: free cancellation up to 24 hours before session
- All communications are end-to-end encrypted
- Users can request data export or account deletion

Guidelines:
- Keep answers concise and friendly (2-4 short paragraphs max)
- If someone is in crisis, tell them to call 8083 or 116 immediately, and visit the Crisis Resources page
- Never make up features — if you don't know something, suggest they check the Help Center or contact support
- Use Ethiopian context naturally (mention Birr, Telebirr, CBE Birr, EAT timezone, Addis Ababa where relevant)
- Be warm and encouraging — mental health support should feel safe and welcoming`

async function tryModel(model: string, messages: { role: string; content: string }[]) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://v0-harmony-h3.vercel.app",
      "X-Title": "Harmony",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 500,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => "unknown")
    let isRateLimit = false
    try {
      const parsed = JSON.parse(errBody)
      if (parsed?.error?.code === 429) isRateLimit = true
    } catch {}
    return { isRateLimit, error: `Model ${model} failed (${res.status}): ${errBody}` }
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content ?? null
  return { text }
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API key not configured." }, { status: 500 })
    }

    const messages = [{ role: "system", content: SYSTEM_PROMPT }]

    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({ role: msg.role, content: msg.content })
        }
      }
    }

    messages.push({ role: "user", content: message })

    for (const model of MODELS) {
      const result = await tryModel(model, messages)
      if ("text" in result && result.text) {
        return NextResponse.json({ response: result.text })
      }
      if (!result.isRateLimit) {
        console.error(result.error)
        return NextResponse.json({ error: "AI service error." }, { status: 502 })
      }
      console.warn(`Rate limited on ${model}, trying next model...`)
    }

    return NextResponse.json({ error: "All models are rate-limited. Try again later." }, { status: 503 })
  } catch (err) {
    console.error("Chat API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
