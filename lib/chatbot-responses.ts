export interface ChatEntry {
  keywords: string[]
  response: string
  followUps: string[]
  category?: string
}

const chatResponses: ChatEntry[] = [
  {
    keywords: ["create", "account", "sign up", "register", "signup", "join"],
    response:
      "To create an account, click 'Get Started' on the homepage, choose your role (client or counselor), and fill in your name, email, and password. Counselors also need to provide their license details for verification. Clients get immediate access, while counselors are placed under review.",
    followUps: [
      "How are counselors verified?",
      "How do I find a counselor?",
      "What payment methods do you accept?",
    ],
    category: "Getting Started",
  },
  {
    keywords: ["verify", "verification", "license", "counselor approved", "credential"],
    response:
      "Every counselor on Harmony is a licensed mental health professional in Ethiopia. We verify license numbers and supporting documents during signup. Counselors are also reviewed based on their experience, specializations, and certifications before being approved to practice on the platform.",
    followUps: [
      "How do I sign up as a counselor?",
      "How do I set my availability?",
      "How much do counselors earn?",
    ],
    category: "Getting Started",
  },
  {
    keywords: ["find", "counselor", "therapist", "search", "browse", "match"],
    response:
      "Browse our network of licensed counselors from the Find a Counselor page. You can search by name or filter by specialty (Anxiety, Depression, Trauma, etc.). Each profile shows the counselor's bio, specializations, years of experience, hourly rate, and rating. Check their availability calendar to find a time that works for you.",
    followUps: [
      "How do I book a session?",
      "What session types are available?",
      "How long are sessions?",
    ],
    category: "Getting Started",
  },
  {
    keywords: ["book", "session", "schedule", "appointment", "reserve"],
    response:
      "After finding a counselor you like, select an available date and time slot from their calendar. Choose your session type (video, voice, or chat), make payment via Telebirr or CBE Birr, and enter your payment reference number to confirm. The session will appear in your Upcoming tab.",
    followUps: [
      "What payment methods do you accept?",
      "Can I reschedule or cancel?",
      "How do I join a session?",
    ],
    category: "Sessions & Meetings",
  },
  {
    keywords: ["reschedule", "cancel", "refund", "missed"],
    response:
      "You can cancel or reschedule up to 24 hours before the session with no charge. Cancellations within 24 hours may be charged the full fee. If your counselor cancels, you get an automatic refund. For refund requests, contact support@harmonyhealth.et — refunds are processed within 5-7 business days.",
    followUps: [
      "How do I book a session?",
      "What payment methods do you accept?",
      "Contact support",
    ],
    category: "Sessions & Meetings",
  },
  {
    keywords: ["join", "video", "call", "meeting", "start session", "enter"],
    response:
      "From your dashboard, find the session in your Upcoming tab and click 'Join Session' when it's time. You'll enter a secure Jitsi Meet video room — no download needed. Allow camera and microphone access when prompted. Sessions are end-to-end encrypted.",
    followUps: [
      "What are the technical requirements?",
      "Can I use audio only?",
      "What if I have connection issues?",
    ],
    category: "Sessions & Meetings",
  },
  {
    keywords: ["technical", "requirement", "browser", "internet", "camera", "microphone"],
    response:
      "Harmony works in Chrome, Firefox, Safari, and Edge — no software installation required. You need a stable internet connection (at least 1 Mbps), a working webcam, and a microphone. For the best experience, use a quiet, well-lit space. On mobile, you can use the Jitsi Meet app.",
    followUps: [
      "How do I join a session?",
      "What if I have connection issues?",
      "What session types are available?",
    ],
    category: "Sessions & Meetings",
  },
  {
    keywords: ["payment", "pay", "telebirr", "cbe", "birr", "cost", "price", "rate", "fee"],
    response:
      "Harmony accepts Telebirr (dial *806# or use the app) and CBE Birr. Each counselor sets their own hourly rate — you pay that rate per session. Counselors earn 80% of the fee (the remaining 20% is the platform commission). All prices are in Ethiopian Birr (ETB).",
    followUps: [
      "Can I get a refund?",
      "When am I charged?",
      "How do I book a session?",
    ],
    category: "Billing & Payments",
  },
  {
    keywords: ["password", "reset", "forgot", "change", "login", "sign in"],
    response:
      "You can change your password from your Account Settings page. Enter your current password and your new password (minimum 8 characters). If you forget your password, click 'Forgot password' on the sign-in page to reset it via email.",
    followUps: [
      "How do I update my profile?",
      "How do I create an account?",
      "Notification preferences",
    ],
    category: "Account Settings",
  },
  {
    keywords: ["profile", "update", "edit", "avatar", "bio", "name"],
    response:
      "Go to your Profile page from the sidebar and click 'Edit Profile'. You can update your name and avatar URL. Counselors can also edit their bio, specializations, years of experience, and hourly rate. Changes to credentials (license, certifications) require admin approval.",
    followUps: [
      "How do I change my password?",
      "How do I set my availability?",
      "Notification preferences",
    ],
    category: "Account Settings",
  },
  {
    keywords: ["availability", "schedule", "hours", "time", "working hours"],
    response:
      "Go to your Schedule page to set your weekly availability. For each day, set your start and end times. Clients see your open slots in 1-hour increments. All times are in East Africa Time (EAT, UTC+3). Changes take effect immediately for future bookings.",
    followUps: [
      "How do I set up my practice?",
      "How do I manage clients?",
      "How much do counselors earn?",
    ],
    category: "For Counselors",
  },
  {
    keywords: ["counselor setup", "practice", "start", "approve", "onboarding"],
    response:
      "After your counselor account is approved, set up your profile with a bio, specializations, certifications, and hourly rate. Then go to the Schedule page to define your working hours. The more complete your profile, the easier it is for clients to choose you.",
    followUps: [
      "How do I set my availability?",
      "How do I manage clients?",
      "How much do counselors earn?",
    ],
    category: "For Counselors",
  },
  {
    keywords: ["clients", "manage", "client management", "session history", "notes"],
    response:
      "Your Clients page shows all active clients with their session history. Session notes are encrypted and visible to both you and the client. Use the messaging feature for scheduling or follow-ups. Track your clients' progress through their session history.",
    followUps: [
      "How do I set my availability?",
      "How do I set up my practice?",
      "How much do counselors earn?",
    ],
    category: "For Counselors",
  },
  {
    keywords: ["earnings", "income", "money", "commission", "payout", "revenue"],
    response:
      "Counselors earn 80% of their hourly rate per session. The platform keeps 20% as a commission. You can track your total earnings, monthly earnings, and per-session averages from your Earnings page.",
    followUps: [
      "How do I set my hourly rate?",
      "How do I manage clients?",
      "How do I set up my practice?",
    ],
    category: "For Counselors",
  },
  {
    keywords: ["privacy", "data", "encrypt", "secure", "confidential", "private"],
    response:
      "Your privacy is a top priority. All communications (video, voice, chat, session notes) are end-to-end encrypted. Only you and your counselor can access session content. We never share your data with third parties. You can request a copy of your data or delete your account at any time.",
    followUps: [
      "Can I delete my data?",
      "How do I download my data?",
      "Two-factor authentication",
    ],
    category: "Privacy & Security",
  },
  {
    keywords: ["notification", "alert", "bell", "remind"],
    response:
      "You'll receive in-app notifications visible from the bell icon in the top navigation bar. Notifications are also sent via email for important updates like booking confirmations, cancellations, and account updates.",
    followUps: [
      "How do I update my profile?",
      "How do I change my password?",
      "How do I book a session?",
    ],
    category: "Account Settings",
  },
  {
    keywords: ["2fa", "two-factor", "authentication", "mfa"],
    response:
      "Two-factor authentication is not yet available on Harmony. In the meantime, use a strong, unique password and enable email recovery. We're working on adding 2FA support in a future update.",
    followUps: [
      "How do I change my password?",
      "How secure is my data?",
      "Privacy policy",
    ],
    category: "Privacy & Security",
  },
  {
    keywords: ["download", "export", "copy", "my data"],
    response:
      "You can request a copy of all your data by emailing support@harmonyhealth.et with the subject 'Data Export Request'. Your export includes profile info, session history, messages, and notes. We'll process your request within 14 days.",
    followUps: [
      "Can I delete my data?",
      "How secure is my data?",
      "Privacy policy",
    ],
    category: "Privacy & Security",
  },
  {
    keywords: ["language", "amharic", "english", "ethiopia"],
    response:
      "Harmony is built by Ethiopians for Ethiopians. Our platform supports English and Amharic, and our counselors serve clients across Ethiopia. All session times are in East Africa Time (EAT, UTC+3).",
    followUps: [
      "How do I find a counselor?",
      "How do I book a session?",
      "What payment methods do you accept?",
    ],
    category: "Getting Started",
  },
  {
    keywords: ["support", "contact", "help", "reach"],
    response:
      "You can reach us at:\n• Email: support@harmonyhealth.et\n• Phone: 0962029518\n• Office: Bole Road, Addis Ababa, Ethiopia\n• Business Hours (EAT): Mon-Fri 8AM-6PM, Sat 9AM-1PM\n\nYou can also submit a message through our Contact page for a faster response.",
    followUps: [
      "How do I book a session?",
      "What payment methods do you accept?",
      "How do I reset my password?",
    ],
    category: "Getting Started",
  },
]

export const crisisResponse = {
  response:
    "🆘 If you're experiencing a crisis or need urgent help, please reach out immediately:\n\n• Emergency Hotline: 8083\n• Mental Health Helpline: 116\n• Visit our Crisis Resources page for more support options.\n\nYou are not alone — help is available right now.",
  followUps: [
    "I need to talk to someone",
    "How do I find a counselor?",
    "Tell me about Harmony",
  ],
}

export const crisisKeywords = [
  "crisis",
  "suicide",
  "kill myself",
  "hurt myself",
  "self-harm",
  "emergency",
  "help me",
  "urgent",
  "8083",
  "116",
  "not okay",
  "struggling",
  "breakdown",
]

export const initialQuickReplies = [
  "How do I create an account?",
  "How do I find a counselor?",
  "What payment methods do you accept?",
  "How do I book a session?",
  "How do I reset my password?",
  "How much do counselors earn?",
]

export function findBestResponse(input: string): {
  response: string
  followUps: string[]
} | null {
  const lower = input.toLowerCase()

  for (const entry of chatResponses) {
    const matchCount = entry.keywords.filter((kw) => lower.includes(kw)).length
    if (matchCount > 0) {
      return { response: entry.response, followUps: entry.followUps }
    }
  }

  return null
}

export default chatResponses
