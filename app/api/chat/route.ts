import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = "gemini-2.0-flash-lite"

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
- Keep answers concise, friendly, and helpful (2-4 short paragraphs max)
- If someone is in crisis, tell them to call 8083 or 116 immediately, and visit the Crisis Resources page
- Never make up features — if you don't know something, suggest they check the Help Center or contact support
- Use Ethiopian context naturally (mention Birr, Telebirr, CBE Birr, EAT timezone, Addis Ababa where relevant)
- Be warm and encouraging — mental health support should feel safe and welcoming`

interface Message {
  role: "user" | "model"
  content: string
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key not configured." }, { status: 500 })
    }

    const contents: Message[] = [
      { role: "user", content: SYSTEM_PROMPT },
      { role: "model", content: "Understood. I'll act as the Harmony support assistant with those guidelines." },
    ]

    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" || msg.role === "model") {
          contents.push({ role: msg.role as "user" | "model", content: msg.content })
        }
      }
    }

    contents.push({ role: "user", content: message })

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: contents.map((c) => ({
            parts: [{ text: c.content }],
            role: c.role,
          })),
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      },
    )

    if (!res.ok) {
      const errBody = await res.text().catch(() => "unknown")
      console.error("Gemini API error:", res.status, errBody)
      return NextResponse.json({ error: "AI service error." }, { status: 502 })
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 502 })
    }

    return NextResponse.json({ response: text })
  } catch (err) {
    console.error("Chat API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
