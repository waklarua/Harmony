import { NextResponse } from "next/server"
import OpenAI from "openai"

const SYSTEM_PROMPT = `You are Harmony, a compassionate mental health support assistant for a counseling platform based in Ethiopia. Your role is to provide empathetic, helpful responses that encourage users to seek professional counseling.

Key facts about Harmony:
- Connects people with licensed counselors in Ethiopia for mental health support
- Sessions via Jitsi Meet (video, voice, or chat), no download required
- Payment methods: Telebirr and CBE Birr only (Ethiopian Birr)
- Counselors earn 80% of their hourly rate, platform takes 20% commission
- All times in East Africa Time (EAT, UTC+3)
- Support email: support@harmonyhealth.et
- Office: Bole Road, Addis Ababa, Ethiopia
- Cancellation policy: free cancellation up to 24 hours before session
- All communications are end-to-end encrypted

Guidelines:
- Be warm, conversational, and encouraging — mental health support should feel safe
- Keep answers concise (2-4 short paragraphs max)
- Use Ethiopian context naturally (Birr, Telebirr, CBE Birr, EAT, Addis Ababa)
- Never diagnose conditions or prescribe treatment
- Always suggest speaking with a licensed counselor for serious concerns
- If someone mentions suicide, self-harm, or crisis, give crisis resources immediately
- If you don't know something, suggest the Help Center or contacting support
- Reference the conversation history naturally when following up`

const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "hurt myself", "self-harm", "want to die",
  "end my life", "not safe", "emergency", "crisis", "8083", "116",
  "breakdown", "cant cope", "dont want to live", "need help now",
  "urgent help", "struggling badly",
]

const CRISIS_RESPONSE = `I'm really glad you reached out. You are not alone, and help is available right now in Ethiopia.

• Emergency Hotline: **8083** (toll-free, 24/7)
• Mental Health Helpline: **116** (toll-free, 24/7)

Please call one of those numbers right now to speak with someone who can help.

You can also visit our Crisis Resources page for more support options.`

let openai: OpenAI | null = null

function getClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://integrate.api.nvidia.com/v1",
    })
  }
  return openai
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required." }, { status: 400 })
    }

    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || ""
    const isCrisis = CRISIS_KEYWORDS.some((kw) => lastMsg.includes(kw))

    if (isCrisis) {
      return NextResponse.json({ response: CRISIS_RESPONSE })
    }

    const apiKey = process.env.NVIDIA_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured." }, { status: 500 })
    }

    const recentMessages = messages.slice(-10)

    const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...recentMessages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ]

    const client = getClient()
    const completion = await client.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-pro",
      messages: apiMessages,
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 1024,
    })

    const reply = completion.choices[0]?.message?.content

    if (!reply) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 502 })
    }

    return NextResponse.json({ response: reply })
  } catch (err) {
    console.error("Chat API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
