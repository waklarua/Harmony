import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, topic, message } = body

    if (!firstName || !lastName || !email || !topic || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    await sendEmail({
      to: "ermizethi@gmail.com",
      subject: `[Contact Form] ${topic} — ${firstName} ${lastName}`,
      text: `New contact form submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nTopic: ${topic}\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
