export const helpArticles: Record<string, { title: string; category: string; content: string[] }> = {
  "create-account": {
    title: "How to create your account",
    category: "Getting Started",
    content: [
      "Visit the Harmony homepage and click 'Get Started' to begin the signup process.",
      "Choose your role: 'Find Support' if you're seeking counseling, or 'Provide Support' if you're a licensed counselor looking to join our network.",
      "Enter your full name, email address, and create a strong password (at least 8 characters).",
      "For counselors, you'll also need to provide your professional bio, specializations, years of experience, license number, and a link to your license document.",
      "Once submitted, seekers get immediate access to browse counselors. Counselors are placed under review and notified once approved by our team.",
      "After signing up, you'll be redirected to your dashboard where you can start booking sessions or managing your practice."
    ]
  },
  "find-counselor": {
    title: "Finding the right counselor",
    category: "Getting Started",
    content: [
      "Browse our network of licensed counselors from the Find a Counselor page in your seeker dashboard.",
      "Use the search bar to filter by name or specialty, and use the specialty dropdown to narrow down by specific areas like Anxiety, Depression, or Trauma.",
      "Each counselor profile shows their bio, specializations, years of experience, certifications, languages spoken, and hourly rate.",
      "You can also see their rating and review count from previous clients.",
      "Check the counselor's availability calendar to find a date and time that works for you. Available time slots are shown in East Africa Time (EAT).",
      "If a counselor is fully booked for the next 7 days, you can join their waitlist to be notified when a slot opens up."
    ]
  },
  "first-session": {
    title: "Your first session — what to expect",
    category: "Getting Started",
    content: [
      "After booking a session, it will appear in your 'Upcoming' tab on the Sessions page.",
      "Before the session, ensure you have a stable internet connection, working camera, and microphone.",
      "When it's time for your session, click the 'Join Session' button from your dashboard or sessions page.",
      "Sessions are conducted via Jitsi Meet, a secure video platform that works directly in your browser — no download required.",
      "You can choose between video, voice-only, or text chat sessions depending on your comfort level.",
      "Your counselor will be able to see your profile information and session history during the session.",
      "Sessions are end-to-end encrypted for your privacy and security."
    ]
  },
  "join-session": {
    title: "Joining a video session",
    category: "Sessions & Meetings",
    content: [
      "From your dashboard, click on the session card or navigate to the Sessions page and find your upcoming session.",
      "Click the 'Join Session' button when it becomes active (typically around the scheduled time).",
      "You'll be taken to a secure video room powered by Jitsi Meet.",
      "Allow your browser access to your camera and microphone when prompted.",
      "The session room includes video/audio controls, a text chat panel, and session notes (visible to your counselor).",
      "If you experience connection issues, try refreshing the page or switching to audio-only mode.",
      "Sessions are private and cannot be joined by anyone other than you and your counselor."
    ]
  },
  "reschedule": {
    title: "Session rescheduling and cancellation",
    category: "Sessions & Meetings",
    content: [
      "You can cancel or reschedule a session up to 24 hours before the scheduled time with no charge.",
      "To cancel, go to your Sessions page, find the booking, and use the cancel option.",
      "If you need to reschedule, cancel the existing booking and create a new one with your preferred time.",
      "Cancellations made less than 24 hours before the session may be subject to the full session fee.",
      "If your counselor needs to cancel, you'll receive a notification and can book a new time without any charges.",
      "For assistance with cancellations or refunds, contact our support team."
    ]
  },
  "tech-requirements": {
    title: "Technical requirements for video",
    category: "Sessions & Meetings",
    content: [
      "Harmony video sessions run on Jitsi Meet and work entirely in your browser — no software installation required.",
      "Supported browsers: latest versions of Chrome, Firefox, Safari, or Edge.",
      "A stable internet connection with at least 1 Mbps upload/download speed is recommended.",
      "A working webcam and microphone (built-in or external).",
      "For the best experience, use a quiet, well-lit space and close unnecessary applications.",
      "If you experience lag or connection issues, try turning off your camera and using audio-only mode.",
      "On mobile devices, the Jitsi Meet app can be used for a better experience."
    ]
  },
  "update-profile": {
    title: "Updating your profile",
    category: "Account Settings",
    content: [
      "Navigate to your Profile page from the sidebar menu.",
      "Click 'Edit Profile' to make changes to your information.",
      "You can update your name and avatar URL.",
      "For counselors, you can edit your professional bio, specializations, years of experience, and hourly rate.",
      "Your hourly rate is what clients will see when browsing counselors, and it determines how much you earn per session.",
      "Click 'Save' to apply your changes. Your profile will update immediately.",
      "Changes to your counselor credentials (license, certifications) require admin approval."
    ]
  },
  "notifications": {
    title: "Notification preferences",
    category: "Account Settings",
    content: [
      "Harmony sends you system notifications for important events like booking confirmations, cancellations, and account updates.",
      "You'll receive in-app notifications visible from the bell icon in the top navigation bar.",
      "Notifications are also sent via email for critical updates like account approval, session reminders, and payment confirmations.",
      "Currently, notifications are managed system-wide. Custom notification preferences will be available in a future update.",
      "You can view your full notification history from the bell icon dropdown."
    ]
  },
  "password": {
    title: "Changing your password",
    category: "Account Settings",
    content: [
      "You can change your password from your Account Settings page.",
      "Enter your current password, then your new password (minimum 8 characters).",
      "Choose a strong password that includes a mix of letters, numbers, and special characters.",
      "Once changed, you'll be signed out and need to sign in with your new password.",
      "If you forget your password, click 'Forgot password' on the sign-in page to reset it via email."
    ]
  },
  "payment-methods": {
    title: "Managing payment methods",
    category: "Billing & Payments",
    content: [
      "Harmony currently supports two payment methods: Telebirr and CBE Birr.",
      "Telebirr: Dial *806# or use the Telebirr app to complete payment.",
      "CBE Birr: Use the CBE Birr service to transfer the session fee.",
      "Payment is made at the time of booking. After selecting your date and time, you'll be prompted to pay.",
      "Enter the payment reference number you receive after completing the transfer to confirm your booking.",
      "Your payment is held securely and released to the counselor after the session is completed.",
      "The platform charges a 20% commission fee on each session."
    ]
  },
  "billing": {
    title: "Understanding your bill",
    category: "Billing & Payments",
    content: [
      "For seekers: The amount you pay is the counselor's listed hourly rate. This is shown clearly before you confirm a booking.",
      "For counselors: You earn 80% of the session fee. The remaining 20% is the platform commission.",
      "All prices are displayed in Ethiopian Birr (ETB).",
      "You can view your payment history from your dashboard — seekers see their bookings, counselors see their earnings page.",
      "Counselors can track their total earnings, monthly earnings, and per-booking average on the Earnings page."
    ]
  },
  refunds: {
    title: "Requesting a refund",
    category: "Billing & Payments",
    content: [
      "If you cancel a session more than 24 hours before the scheduled time, you're eligible for a full refund.",
      "To request a refund, contact our support team via the Contact page or email us at support@harmonyhealth.et.",
      "Include your booking ID and the reason for your refund request.",
      "Refunds are processed within 5-7 business days and returned via the same payment method used.",
      "If a counselor cancels on you, you'll receive an automatic full refund and can book with another counselor."
    ]
  },
  privacy: {
    title: "Your data and privacy",
    category: "Privacy & Security",
    content: [
      "Harmony takes your privacy seriously. All communications between you and your counselor are end-to-end encrypted.",
      "Session notes are encrypted before being stored, and only you and your counselor can access them.",
      "We never share your personal information or session data with third parties without your explicit consent.",
      "Your data is stored securely on encrypted servers.",
      "You have the right to request a copy of your data or have it deleted at any time.",
      "All counselors are verified and licensed professionals bound by strict confidentiality agreements.",
      "For full details, see our Privacy Policy and Terms of Service."
    ]
  },
  "2fa": {
    title: "Two-factor authentication",
    category: "Privacy & Security",
    content: [
      "Two-factor authentication (2FA) adds an extra layer of security to your account.",
      "While not currently implemented on Harmony, we recommend using a strong, unique password for your account.",
      "Enable your email as a recovery option in case you need to reset your password.",
      "We're working on adding 2FA support in a future update to further protect your account.",
      "In the meantime, follow best practices: use a strong password and never share your login credentials."
    ]
  },
  "data-export": {
    title: "Downloading your data",
    category: "Privacy & Security",
    content: [
      "You can request a copy of all your data stored on Harmony by contacting our support team.",
      "Your data export includes your profile information, session history, messages, mood entries, and assessment results.",
      "To request your data, email us at support@harmonyhealth.et with the subject 'Data Export Request'.",
      "We'll process your request within 14 days and provide your data in a commonly used format.",
      "You can also request permanent deletion of your account and all associated data."
    ]
  },
  "counselor-setup": {
    title: "Setting up your practice",
    category: "For Counselors",
    content: [
      "After your counselor account is approved, set up your profile to start receiving clients.",
      "Go to your Profile page to update your bio, specializations, certifications, and hourly rate.",
      "Set your availability from the Schedule page — define your weekly working hours including which days and times you're available.",
      "The more complete your profile, the easier it is for clients to choose you. Add a professional photo, detailed bio, and list all your specializations.",
      "Once your availability is set, clients can see your open slots and book sessions directly.",
      "You can also manage your waitlist from the dashboard — clients who want to book when you're fully booked."
    ]
  },
  availability: {
    title: "Managing your availability",
    category: "For Counselors",
    content: [
      "Navigate to your Schedule page from the sidebar to set your weekly availability.",
      "For each day of the week, you can set a start time and end time for when you're available to take sessions.",
      "Sessions are typically 60 minutes long, and your available time slots are shown to clients in 1-hour increments.",
      "All times are shown in East Africa Time (EAT, UTC+3).",
      "You can update your availability at any time — changes take effect immediately for future bookings.",
      "If you need to block off specific dates, contact support or manage through your schedule settings."
    ]
  },
  "client-management": {
    title: "Client management tips",
    category: "For Counselors",
    content: [
      "Your Clients page shows all active clients, their session history, and total sessions completed.",
      "Use the messaging feature to communicate with clients between sessions about scheduling or follow-ups.",
      "Session notes are encrypted and visible to both you and the client. Take notes during or after each session.",
      "Track your clients' progress through their session history and any shared mood tracking data.",
      "If a client is not a good fit, you can suggest other counselors on the platform.",
      "Your earnings dashboard helps you track your income, monthly totals, and per-session averages."
    ]
  }
}

export function getArticle(slug: string) {
  return helpArticles[slug] || null
}

export function getAllArticles() {
  return Object.entries(helpArticles).map(([slug, article]) => ({
    slug,
    ...article
  }))
}
