import { helpArticles } from "./help-content"

function getArticleSummary(slug: string, maxLines = 4): string {
  const article = helpArticles[slug]
  if (!article) return ""
  return article.content.slice(0, maxLines).join(" ")
}

export interface PhraseEntry {
  phrases: string[]
  response: string
  followUps: string[]
}

export const crisisKeywords = [
  "suicide",
  "kill myself",
  "hurt myself",
  "self-harm",
  "want to die",
  "end my life",
  "not safe",
  "emergency",
  "crisis",
  "8083",
  "116",
  "breakdown",
  "cant cope",
  "dont want to live",
  "need help now",
  "urgent help",
  "struggling badly",
]

export const crisisResponse = {
  response:
    "I'm really glad you reached out. You are not alone, and help is available right now in Ethiopia.\n\n" +
    "• Emergency Hotline: **8083** (toll-free, 24/7)\n" +
    "• Mental Health Helpline: **116** (toll-free, 24/7)\n\n" +
    "Please call one of those numbers right now to speak with someone who can help.\n\n" +
    "You can also visit our Crisis Resources page for more support options.",
  followUps: [
    "I need to talk to someone",
    "Tell me about Harmony",
    "How do I find a counselor?",
  ],
}

const baseFollowUps = [
  "How do I create an account?",
  "How do I find a counselor?",
  "What is Harmony?",
]

export const phraseEntries: (PhraseEntry & { context?: string[] })[] = [
  {
    phrases: ["how do i create an account", "how to sign up", "create account", "sign up", "register", "join harmony"],
    response: getArticleSummary("create-account"),
    followUps: ["How do I find a counselor?", "What payment methods do you accept?", "Is my data private?"],
  },
  {
    phrases: ["how do i find a counselor", "find a counselor", "browse counselors", "search for counselor", "look for therapist"],
    response: getArticleSummary("find-counselor"),
    followUps: ["How do I book a session?", "What do specializations mean?", "What is hourly rate?"],
  },
  {
    phrases: ["what is harmony", "what does harmony do", "about harmony", "tell me about harmony", "what is this platform"],
    response:
      "Harmony is an Ethiopian mental health counseling platform that connects you with licensed counselors for secure video, voice, or chat sessions. " +
      "We support Telebirr and CBE Birr payments, all times are in East Africa Time (EAT), and sessions are end-to-end encrypted. " +
      "Whether you're dealing with anxiety, depression, trauma, or just need someone to talk to, Harmony makes professional help accessible.",
    followUps: ["How do I create an account?", "How do I find a counselor?", "Is my data private?"],
  },
  {
    phrases: ["is my data private", "is my data secure", "privacy", "encrypted", "confidential", "my data safe"],
    response: getArticleSummary("privacy"),
    followUps: ["Can I download my data?", "Two-factor authentication", "How do I find a counselor?"],
  },
  {
    phrases: ["how do i book a session", "book a session", "schedule appointment", "reserve session", "how to book"],
    response: getArticleSummary("first-session"),
    followUps: ["What payment methods do you accept?", "Can I reschedule or cancel?", "How do I join my session?"],
  },
  {
    phrases: ["what payment methods", "how to pay", "telebirr", "cbe birr", "payment", "birr", "cost", "price", "session fee"],
    response: getArticleSummary("payment-methods"),
    followUps: ["Can I get a refund?", "How do I book a session?", "What is hourly rate?"],
  },
  {
    phrases: ["can i reschedule", "cancel session", "reschedule session", "cancel booking", "reschedule booking", "missed session"],
    response: getArticleSummary("reschedule"),
    followUps: ["Can I get a refund?", "How do I book a session?", "Contact support"],
  },
  {
    phrases: ["how do i reset my password", "forgot password", "change password", "reset password", "cant sign in"],
    response: getArticleSummary("password"),
    followUps: ["How do I update my profile?", "How do I create an account?", "Contact support"],
  },
  {
    phrases: ["how do i join my session", "join session", "start session", "join video", "join meeting", "enter session"],
    response: getArticleSummary("join-session"),
    followUps: ["What if my video doesn't work?", "How do I mute myself?", "How do I end a session?"],
  },
  {
    phrases: ["what if my video doesn't work", "video not working", "connection issues", "camera not working", "audio not working", "tech problem", "technical issue"],
    response: getArticleSummary("tech-requirements"),
    followUps: ["How do I join my session?", "How do I mute myself?", "Contact support"],
  },
  {
    phrases: ["how do i update my profile", "edit profile", "update profile", "change my name", "change my photo", "profile settings"],
    response: getArticleSummary("update-profile"),
    followUps: ["How do I change my password?", "Notification preferences", "How do I set my availability?"],
  },
  {
    phrases: ["can i get a refund", "refund", "money back", "get my money back"],
    response: getArticleSummary("refunds"),
    followUps: ["What payment methods do you accept?", "Can I reschedule or cancel?", "Contact support"],
  },
  {
    phrases: ["how do i set my availability", "set availability", "set my hours", "working hours", "available times"],
    response: getArticleSummary("availability"),
    followUps: ["How do I set up my practice?", "How do I view client history?", "How much do counselors earn?"],
  },
  {
    phrases: ["how do i set up my practice", "counselor setup", "set up my profile", "start counseling", "onboarding"],
    response: getArticleSummary("counselor-setup"),
    followUps: ["How do I set my availability?", "How do I view client history?", "How much do counselors earn?"],
  },
  {
    phrases: ["how do i view client history", "client management", "view clients", "client list", "my clients", "session notes"],
    response: getArticleSummary("client-management"),
    followUps: ["How do I write session notes?", "How much do counselors earn?", "How do I message my clients?"],
  },
  {
    phrases: ["how much do counselors earn", "counselor earnings", "earnings", "commission", "payout", "how much money", "income"],
    response: getArticleSummary("billing"),
    followUps: ["How do I set my availability?", "How do I set up my practice?", "How do I view client history?"],
  },
  {
    phrases: ["how do i message my counselor", "message counselor", "chat with counselor", "send message", "contact counselor"],
    response:
      "You can message your counselor directly from your dashboard. Navigate to the Messages page, select your counselor from the conversation list, " +
      "and type your message. All messages are end-to-end encrypted. This is great for quick questions between sessions or scheduling follow-ups.",
    followUps: ["Are messages encrypted?", "How do I join my session?", "How do I book a session?"],
  },
  {
    phrases: ["are messages encrypted", "is my chat private", "encrypted messages", "secure chat"],
    response:
      "Yes, absolutely. All messages, video calls, voice calls, and session notes on Harmony are end-to-end encrypted. " +
      "Only you and your counselor can access your conversations. We never share your data with third parties.",
    followUps: ["Is my data private?", "How do I message my counselor?", "How do I join my session?"],
  },
  {
    phrases: ["what is phq-9", "phq-9 assessment", "take assessment", "mental health assessment", "phq9", "assessment"],
    response:
      "The PHQ-9 is a standard mental health screening tool that measures the severity of depression symptoms. " +
      "It asks 9 questions about how you've been feeling over the past two weeks. " +
      "Your counselor may use this to track your progress over time. You can take it from your dashboard anytime.",
    followUps: ["What does my score mean?", "Is my assessment private?", "How do I find a counselor?"],
  },
  {
    phrases: ["what does my score mean", "phq-9 score", "assessment score", "my results"],
    response:
      "Your PHQ-9 score ranges from 0 to 27:\n" +
      "• 1-4: Minimal depression\n" +
      "• 5-9: Mild depression\n" +
      "• 10-14: Moderate depression\n" +
      "• 15-19: Moderately severe depression\n" +
      "• 20-27: Severe depression\n\n" +
      "Your counselor will review your results with you and use them to guide your treatment. " +
      "This is just a screening tool — your counselor's professional assessment is what matters most.",
    followUps: ["What is PHQ-9?", "How do I find a counselor?", "Is my assessment private?"],
  },
  {
    phrases: ["is my assessment private", "assessment privacy", "who sees my assessment", "assessment results private"],
    response:
      "Yes, your assessment results are private and encrypted. Only you and your assigned counselor can see them. " +
      "Your PHQ-9 responses are stored securely and used only to track your progress in counseling. " +
      "They are never shared with third parties without your explicit consent.",
    followUps: ["What is PHQ-9?", "What does my score mean?", "Is my data private?"],
  },
  {
    phrases: ["how do i confirm a booking", "confirm booking", "approve session", "accept booking"],
    response:
      "When a client books a session, it appears in your dashboard under Pending Requests. " +
      "Review the booking and click 'Confirm' to accept it. The session will then move to your Upcoming tab. " +
      "The client will be notified once you confirm. If you need to decline, you can suggest alternative times.",
    followUps: ["How do I set my availability?", "How do I view client history?", "How do I write session notes?"],
  },
  {
    phrases: ["how do i write session notes", "session notes", "take notes", "write notes"],
    response:
      "During or after a session, you can write notes that are visible to both you and the client. " +
      "Session notes are encrypted before being stored. Click on the session and select 'Notes' to add your observations, " +
      "treatment progress, and any follow-up recommendations. These notes help track the client's journey over time.",
    followUps: ["How do I view client history?", "How do I set my availability?", "How much do counselors earn?"],
  },
  {
    phrases: ["how do i approve a counselor", "approve counselor", "verify counselor", "review counselor"],
    response:
      "From the steward dashboard, navigate to the Counselors page. You'll see a list of pending counselor applications. " +
      "Review their profile, license details, and supporting documents. You can either approve or reject the application. " +
      "Approved counselors gain immediate access to set up their practice and start receiving clients.",
    followUps: ["How do I suspend a user?", "Where are support tickets?", "How do I view users?"],
  },
  {
    phrases: ["how do i suspend a user", "suspend user", "ban user", "block user"],
    response:
      "From the steward dashboard, navigate to the Users page. Find the user you need to take action on, " +
      "view their profile, and use the suspend option. Suspended users cannot log in or use the platform. " +
      "You can reinstate them at any time. Make sure to document the reason for any suspension.",
    followUps: ["How do I approve a counselor?", "Where are support tickets?", "How do I view users?"],
  },
  {
    phrases: ["where are support tickets", "support tickets", "view tickets", "support requests"],
    response:
      "Support tickets from users appear in your steward dashboard under the Support page. " +
      "You can view, respond to, and resolve tickets from there. Each ticket shows the user's details, " +
      "their message, and the status of the request.",
    followUps: ["How do I approve a counselor?", "How do I suspend a user?", "How do I view users?"],
  },
  {
    phrases: ["how do i end a session", "end session", "leave session", "stop call"],
    response:
      "To end a session, simply click the red 'Leave' or 'End' button in the Jitsi Meet video room. " +
      "You'll be returned to your dashboard. The session will be marked as completed, " +
      "and you (or your counselor) can add session notes afterward.",
    followUps: ["How do I write session notes?", "How do I join my session?", "How do I book a session?"],
  },
  {
    phrases: ["how do i mute myself", "mute microphone", "turn off camera", "mute audio"],
    response:
      "In the Jitsi Meet session room, use the microphone icon to mute/unmute your audio, " +
      "and the camera icon to turn your video on/off. These controls are at the bottom of the video screen. " +
      "You can also switch to audio-only mode if your connection is unstable.",
    followUps: ["What if my video doesn't work?", "How do I end a session?", "How do I join my session?"],
  },
  {
    phrases: ["can i download my data", "download my data", "export my data", "data export", "get my data"],
    response: getArticleSummary("data-export"),
    followUps: ["Is my data private?", "Can I delete my account?", "Contact support"],
  },
  {
    phrases: ["what do specializations mean", "specializations", "counselor specialty", "specialty"],
    response:
      "Specializations show what areas a counselor is trained and experienced in — like Anxiety, Depression, " +
      "Trauma, Relationship Issues, Grief, Stress Management, and more. " +
      "When browsing counselors, you can filter by specialty to find someone who matches your specific needs. " +
      "Each counselor's profile lists their specializations so you can choose the right fit.",
    followUps: ["How do I find a counselor?", "How do I book a session?", "What is hourly rate?"],
  },
  {
    phrases: ["what is hourly rate", "hourly rate", "rate per session", "how much per session"],
    response:
      "Each counselor sets their own hourly rate, which is displayed on their profile. " +
      "This is the amount you pay per session. Counselors earn 80% of their rate, " +
      "and the remaining 20% is the platform commission. All prices are in Ethiopian Birr (ETB).",
    followUps: ["What payment methods do you accept?", "How do I find a counselor?", "Can I get a refund?"],
  },
  {
    phrases: ["notification preferences", "notifications", "alerts", "bell icon", "get notified"],
    response: getArticleSummary("notifications"),
    followUps: ["How do I change my password?", "How do I update my profile?", "How do I book a session?"],
  },
  {
    phrases: ["two-factor authentication", "2fa", "two factor", "mfa", "extra security"],
    response: getArticleSummary("2fa"),
    followUps: ["Is my data private?", "How do I change my password?", "Contact support"],
  },
  {
    phrases: ["crisis resources", "crisis help", "need support", "feeling overwhelmed", "having a hard time", "not doing well"],
    response: crisisResponse.response,
    followUps: crisisResponse.followUps,
  },
  {
    phrases: ["how do i message my clients", "message clients", "contact my client", "chat with client"],
    response:
      "From your dashboard, go to the Messages page. You'll see a list of your active clients. " +
      "Select a client to view your conversation and send messages. This is useful for session reminders, " +
      "follow-ups, or sharing resources between sessions.",
    followUps: ["How do I view client history?", "How do I write session notes?", "How do I set my availability?"],
  },
  {
    phrases: ["how do i view my upcoming sessions", "upcoming sessions", "my schedule", "where are my sessions", "session list"],
    response:
      "Your upcoming sessions are shown on your dashboard and also on the Sessions page under the 'Upcoming' tab. " +
      "Each session card shows the counselor name, date, time (EAT), session type (video/voice/chat), and a 'Join Session' button when it's time.",
    followUps: ["How do I join my session?", "Can I reschedule or cancel?", "How do I message my counselor?"],
  },
  {
    phrases: ["how does booking work", "how does booking a session work", "booking process", "how to book a session"],
    response: getArticleSummary("first-session"),
    followUps: ["How do I find a counselor?", "What payment methods do you accept?", "What is hourly rate?"],
  },
  {
    phrases: ["how do i add available slots", "add time slots", "add available times", "block certain times", "block off time"],
    response:
      "Go to your Schedule page from the sidebar. For each day of the week, set your start and end times. " +
      "Available time slots are shown in 1-hour increments. If you need to block off specific dates or times, " +
      "adjust your schedule accordingly — changes take effect immediately for future bookings.",
    followUps: ["How do I set my availability?", "How do I set up my practice?", "How do I view client history?"],
  },
  {
    phrases: ["can i block certain times", "block off time", "block dates", "unavailable"],
    response:
      "Yes, you can block off specific times by adjusting your weekly schedule on the Schedule page. " +
      "Changes take effect immediately. If you need a one-time block (e.g., a holiday), " +
      "you can temporarily update your availability and revert it afterward.",
    followUps: ["How do I set my availability?", "How do I add available slots?", "How do I set up my practice?"],
  },
]

export const contextQuickReplies: Record<string, string[]> = {
  unauthenticated: [
    "How do I create an account?",
    "How do I find a counselor?",
    "What is Harmony?",
    "Is my data private?",
    "Crisis resources",
  ],
  seeker_dashboard: [
    "How do I join my session?",
    "Where are my upcoming sessions?",
    "How do I message my counselor?",
    "Take PHQ-9 assessment",
  ],
  seeker_counselors: [
    "How do I choose a counselor?",
    "What do specializations mean?",
    "How does booking work?",
    "What is hourly rate?",
  ],
  seeker_assessment: [
    "What is PHQ-9?",
    "What does my score mean?",
    "Is my assessment private?",
  ],
  seeker_messages: [
    "How do I start a chat?",
    "Are messages encrypted?",
    "How do I join my session?",
  ],
  seeker_session: [
    "How do I mute myself?",
    "How do I end a session?",
    "What if my video doesn't work?",
  ],
  guide_dashboard: [
    "How do I confirm a booking?",
    "How do I set my availability?",
    "Where are my pending requests?",
  ],
  guide_schedule: [
    "How do I add available slots?",
    "Can I block certain times?",
  ],
  guide_clients: [
    "How do I view client history?",
    "How do I write session notes?",
  ],
  steward: [
    "How do I approve a counselor?",
    "How do I suspend a user?",
    "Where are support tickets?",
  ],
}

export const fallbackResponse =
  "I'm not sure about that one — but here are some things I can help with:"

export const fallbackQuickReplies = baseFollowUps

export function findBestResponse(input: string): {
  response: string
  followUps: string[]
} | null {
  const lower = input.toLowerCase().trim()
  if (!lower) return null

  const lowerCrisis = lower
  for (const kw of crisisKeywords) {
    if (lowerCrisis.includes(kw)) {
      return { response: crisisResponse.response, followUps: crisisResponse.followUps }
    }
  }

  let bestEntry: (PhraseEntry & { context?: string[] }) | null = null
  let bestLength = 0

  for (const entry of phraseEntries) {
    for (const phrase of entry.phrases) {
      if (lower.includes(phrase) && phrase.length > bestLength) {
        bestEntry = entry
        bestLength = phrase.length
      }
    }
  }

  if (bestEntry) {
    return { response: bestEntry.response, followUps: bestEntry.followUps }
  }

  return null
}

export const initialQuickReplies = baseFollowUps
