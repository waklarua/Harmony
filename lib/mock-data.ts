// Mock data for the Harmony platform demo - Ethiopian localization

export interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  reviewCount: number
  yearsExperience: number
  hourlyRate: number // in ETB
  availability: string[]
  bio: string
  avatar: string
  languages: string[]
  approach: string
  verified: boolean
}

export interface Session {
  id: string
  counselorId: string
  counselorName: string
  counselorAvatar: string
  date: string
  time: string // in EAT
  duration: number
  status: "upcoming" | "completed" | "cancelled"
  type: "video" | "chat" | "voice"
  notes?: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string // in EAT
  isOwn: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "seeker" | "guide" | "steward"
  joinedAt: string
}

export interface MoodEntry {
  date: string
  value: number
  note?: string
}

export const mockCounselors: Counselor[] = [
  {
    id: "c1",
    name: "Dr. Selamawit Mulugeta",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Stress Management"],
    rating: 4.9,
    reviewCount: 127,
    yearsExperience: 12,
    hourlyRate: 6840, // ETB
    availability: ["Mon", "Wed", "Fri"],
    bio: "I believe in creating a safe, non-judgmental space where you can explore your thoughts and feelings. My approach combines cognitive-behavioral techniques with mindfulness practices.",
    avatar: "/professional-therapist.png",
    languages: ["Amharic", "English"],
    approach: "Cognitive Behavioral Therapy (CBT)",
    verified: true,
  },
  {
    id: "c2",
    name: "Dr. Dawit Kebede",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Family Dynamics", "Life Transitions"],
    rating: 4.8,
    reviewCount: 94,
    yearsExperience: 8,
    hourlyRate: 5700, // ETB
    availability: ["Tue", "Thu", "Sat"],
    bio: "I specialize in helping individuals and couples navigate relationship challenges and major life changes. Together, we can build stronger connections and find clarity.",
    avatar: "/professional-man-therapist-portrait-friendly.jpg",
    languages: ["Amharic", "English", "Oromiffa"],
    approach: "Emotionally Focused Therapy (EFT)",
    verified: true,
  },
  {
    id: "c3",
    name: "Dr. Frehiwot Assefa",
    title: "Licensed Professional Counselor",
    specialties: ["Trauma", "Self-Esteem", "Cultural Identity"],
    rating: 4.9,
    reviewCount: 156,
    yearsExperience: 15,
    hourlyRate: 7410, // ETB
    availability: ["Mon", "Tue", "Wed", "Thu"],
    bio: "My practice is rooted in cultural sensitivity and trauma-informed care. I help clients heal from past experiences and develop a stronger sense of self.",
    avatar: "/professional-woman-counselor-portrait-warm.jpg",
    languages: ["Amharic", "English", "Tigrinya"],
    approach: "Trauma-Informed Care",
    verified: true,
  },
  {
    id: "c4",
    name: "Yonas Tesfaye",
    title: "Licensed Mental Health Counselor",
    specialties: ["Work Stress", "Burnout", "Career Counseling"],
    rating: 4.7,
    reviewCount: 68,
    yearsExperience: 6,
    hourlyRate: 5130, // ETB
    availability: ["Wed", "Thu", "Fri", "Sat"],
    bio: "I understand the pressures of modern work life. My focus is helping professionals find balance, manage stress, and reconnect with their purpose.",
    avatar: "/professional-man-counselor-portrait-approachable.jpg",
    languages: ["Amharic", "English"],
    approach: "Solution-Focused Brief Therapy",
    verified: true,
  },
]

export const mockSessions: Session[] = [
  {
    id: "s1",
    counselorId: "c1",
    counselorName: "Dr. Selamawit Mulugeta",
    counselorAvatar: "/professional-woman-therapist.png",
    date: "2024-12-23",
    time: "10:00 AM EAT",
    duration: 50,
    status: "upcoming",
    type: "video",
  },
  {
    id: "s2",
    counselorId: "c1",
    counselorName: "Dr. Selamawit Mulugeta",
    counselorAvatar: "/professional-woman-therapist.png",
    date: "2024-12-16",
    time: "10:00 AM EAT",
    duration: 50,
    status: "completed",
    type: "video",
    notes: "Discussed stress management techniques. Homework: practice breathing exercises daily.",
  },
  {
    id: "s3",
    counselorId: "c1",
    counselorName: "Dr. Selamawit Mulugeta",
    counselorAvatar: "/professional-woman-therapist.png",
    date: "2024-12-09",
    time: "10:00 AM EAT",
    duration: 50,
    status: "completed",
    type: "video",
    notes: "Initial session. Established goals and rapport.",
  },
]

export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "c1",
    senderName: "Dr. Selamawit Mulugeta",
    senderAvatar: "/professional-woman-therapist.png",
    content: "Hello! How are you feeling today? Take your time to settle in.",
    timestamp: "10:00 AM EAT",
    isOwn: false,
  },
  {
    id: "m2",
    senderId: "u1",
    senderName: "You",
    content: "Hi Dr. Selamawit. I've been feeling a bit anxious about work lately. The deadlines have been piling up.",
    timestamp: "10:02 AM EAT",
    isOwn: true,
  },
  {
    id: "m3",
    senderId: "c1",
    senderName: "Dr. Selamawit Mulugeta",
    senderAvatar: "/professional-woman-therapist.png",
    content:
      "I hear you. Work-related stress can feel overwhelming, especially when multiple deadlines converge. Can you tell me more about what specifically feels most pressing right now?",
    timestamp: "10:03 AM EAT",
    isOwn: false,
  },
]

export const mockMoodData: MoodEntry[] = [
  { date: "Dec 15", value: 3, note: "Difficult day at work" },
  { date: "Dec 16", value: 4, note: "Session helped" },
  { date: "Dec 17", value: 4 },
  { date: "Dec 18", value: 5, note: "Good progress!" },
  { date: "Dec 19", value: 4 },
  { date: "Dec 20", value: 5 },
  { date: "Dec 21", value: 4 },
]

export const mockUser: User = {
  id: "u1",
  name: "Bereket Tadesse",
  email: "bereket@example.com",
  avatar: "/person-portrait-neutral.jpg",
  role: "seeker",
  joinedAt: "2024-11-15",
}

export const mockGuide: User = {
  id: "c1",
  name: "Dr. Selamawit Mulugeta",
  email: "selamawit@harmony.com",
  avatar: "/professional-woman-therapist.png",
  role: "guide",
  joinedAt: "2024-01-10",
}

export const mockSteward: User = {
  id: "a1",
  name: "Henok Getachew",
  email: "henok@harmony.com",
  avatar: "/professional-person-administrator.jpg",
  role: "steward",
  joinedAt: "2023-06-01",
}

// Guide-specific mock data
export interface Client {
  id: string
  name: string
  avatar: string
  lastSession: string
  nextSession?: string
  totalSessions: number
  status: "active" | "inactive" | "new"
  notes?: string
}

export interface GuideSession {
  id: string
  clientId: string
  clientName: string
  clientAvatar: string
  date: string
  time: string // EAT
  duration: number
  status: "upcoming" | "completed" | "cancelled"
  type: "video" | "chat" | "voice"
}

export const mockClients: Client[] = [
  {
    id: "u1",
    name: "Bereket Tadesse",
    avatar: "/person-portrait-neutral.jpg",
    lastSession: "Dec 16, 2024",
    nextSession: "Dec 23, 2024",
    totalSessions: 3,
    status: "active",
    notes: "Working on anxiety management",
  },
  {
    id: "u2",
    name: "Tigist Lemma",
    avatar: "/young-person-portrait.png",
    lastSession: "Dec 18, 2024",
    nextSession: "Dec 26, 2024",
    totalSessions: 8,
    status: "active",
    notes: "Making good progress with stress coping strategies",
  },
  {
    id: "u3",
    name: "Musse Ahmed",
    avatar: "/professional-portrait.png",
    lastSession: "Dec 10, 2024",
    totalSessions: 2,
    status: "new",
  },
  {
    id: "u4",
    name: "Eden Haile",
    avatar: "/casual-portrait.png",
    lastSession: "Nov 28, 2024",
    totalSessions: 12,
    status: "inactive",
    notes: "Completed initial treatment goals",
  },
]

export const mockGuideSchedule: GuideSession[] = [
  {
    id: "gs1",
    clientId: "u1",
    clientName: "Bereket Tadesse",
    clientAvatar: "/person-portrait-neutral.jpg",
    date: "2024-12-23",
    time: "10:00 AM EAT",
    duration: 50,
    status: "upcoming",
    type: "video",
  },
  {
    id: "gs2",
    clientId: "u2",
    clientName: "Tigist Lemma",
    clientAvatar: "/young-person-portrait.png",
    date: "2024-12-23",
    time: "2:00 PM EAT",
    duration: 50,
    status: "upcoming",
    type: "video",
  },
  {
    id: "gs3",
    clientId: "u3",
    clientName: "Musse Ahmed",
    clientAvatar: "/professional-portrait.png",
    date: "2024-12-24",
    time: "11:00 AM EAT",
    duration: 50,
    status: "upcoming",
    type: "chat",
  },
]

// Steward (Admin) mock data
export interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalCounselors: number
  pendingVerifications: number
  totalSessions: number
  sessionsThisMonth: number
  averageRating: number
  supportTickets: number
}

export interface PendingCounselor {
  id: string
  name: string
  email: string
  credentials: string
  submittedAt: string
  documents: string[]
  avatar: string
}

export interface SupportTicket {
  id: string
  userId: string
  userName: string
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
}

export const mockPlatformStats: PlatformStats = {
  totalUsers: 2847,
  activeUsers: 1234,
  totalCounselors: 156,
  pendingVerifications: 8,
  totalSessions: 12456,
  sessionsThisMonth: 847,
  averageRating: 4.8,
  supportTickets: 12,
}

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "t1",
    userId: "u5",
    userName: "Kidist Alemu",
    subject: "Unable to reschedule session",
    status: "open",
    priority: "medium",
    createdAt: "Dec 20, 2024",
    lastUpdate: "Dec 20, 2024",
  },
  {
    id: "t2",
    userId: "u6",
    userName: "Abebe Girma",
    subject: "Payment processing issue",
    status: "in-progress",
    priority: "high",
    createdAt: "Dec 19, 2024",
    lastUpdate: "Dec 20, 2024",
  },
  {
    id: "t3",
    userId: "c5",
    userName: "Dr. Birtukan Demissie",
    subject: "Calendar sync not working",
    status: "resolved",
    priority: "low",
    createdAt: "Dec 15, 2024",
    lastUpdate: "Dec 17, 2024",
  },
]

export const mockPendingCounselors: PendingCounselor[] = [
  {
    id: "pc1",
    name: "Dr. Aster Bekele",
    email: "aster.bekele@email.com",
    credentials: "PhD Clinical Psychology, Addis Ababa University",
    submittedAt: "Dec 19, 2024",
    documents: ["License", "Degree", "Insurance"],
    avatar: "/professional-woman-doctor.png",
  },
  {
    id: "pc2",
    name: "Solomon Tadesse",
    email: "solomon.tadesse@email.com",
    credentials: "LMFT, Bahir Dar University",
    submittedAt: "Dec 18, 2024",
    documents: ["License", "Degree"],
    avatar: "/professional-asian-man.png",
  },
]

export const counselors = mockCounselors.map((c) => ({
  id: c.id,
  name: c.name,
  title: c.title,
  specialties: c.specialties,
  rating: c.rating,
  reviews: c.reviewCount,
  rate: c.hourlyRate,
  bio: c.bio,
  image: c.avatar,
  nextAvailable: c.availability[0] || "Tomorrow",
}))
