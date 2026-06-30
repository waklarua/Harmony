import { pgTable, text, timestamp, boolean, decimal, integer, uniqueIndex, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Better Auth tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  name: text('name'),
  image: text('image'),
  role: text('role').default('seeker'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    token: text('token').notNull().unique(),
    expiresAt: timestamp('expiresAt').notNull(),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_session_userId').on(table.userId),
    tokenIdx: uniqueIndex('idx_session_token').on(table.token),
  })
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    idToken: text('idToken'),
    accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
    refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
    scope: text('scope'),
    password: text('password'),
    expiresAt: timestamp('expiresAt'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_account_userId').on(table.userId),
  })
)

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// Harmony app tables
export const counselorProfile = pgTable(
  'counselor_profile',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: 'cascade' }),
    bio: text('bio'),
    specializations: text('specializations').array(),
    certifications: text('certifications').array(),
    yearsOfExperience: integer('years_of_experience'),
    licenseNumber: text('license_number'),
    licenseDocumentUrl: text('license_document_url'),
    hourlyRate: decimal('hourlyRate', { precision: 10, scale: 2 }),
    rating: decimal('rating', { precision: 3, scale: 2 }),
    availability: text('availability'),
    status: text('status').default('pending'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: uniqueIndex('idx_counselor_profile_userId').on(table.userId),
  })
)

export const booking = pgTable(
  'booking',
  {
    id: text('id').primaryKey(),
    seekerId: text('seekerId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    sessionType: text('sessionType').notNull(),
    status: text('status').default('pending'),
    scheduledAt: timestamp('scheduledAt').notNull(),
    startedAt: timestamp('startedAt'),
    duration: integer('duration'),
    notes: text('notes'),
    amount: decimal('amount', { precision: 10, scale: 2 }),
    paymentStatus: text('paymentStatus').default('pending'),
    paymentReference: text('paymentReference'),
    paymentMethod: text('paymentMethod'),
    videoRoomUrl: text('videoRoomUrl'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    seekerIdIdx: index('idx_booking_seekerId').on(table.seekerId),
    counselorIdIdx: index('idx_booking_counselorId').on(table.counselorId),
    statusIdx: index('idx_booking_status').on(table.status),
  })
)

export const message = pgTable(
  'message',
  {
    id: text('id').primaryKey(),
    bookingId: text('bookingId')
      .notNull()
      .references(() => booking.id, { onDelete: 'cascade' }),
    senderId: text('senderId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    iv: text('iv'),
    attachments: text('attachments').array(),
    isRead: boolean('isRead').default(false),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    bookingIdIdx: index('idx_message_bookingId').on(table.bookingId),
    senderIdIdx: index('idx_message_senderId').on(table.senderId),
  })
)

export const moodEntry = pgTable(
  'mood_entry',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    mood: text('mood').notNull(),
    intensity: integer('intensity'),
    notes: text('notes'),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_mood_entry_userId').on(table.userId),
  })
)

export const assessmentResult = pgTable(
  'assessment_result',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    assessmentType: text('assessmentType').notNull(),
    score: integer('score').notNull(),
    interpretation: text('interpretation').notNull(),
    answers: integer('answers').array().notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_assessment_userId').on(table.userId),
  })
)

export const notification = pgTable(
  'notification',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    message: text('message').notNull(),
    type: text('type').notNull().default('system'),
    isRead: boolean('isRead').notNull().default(false),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_notification_userId').on(table.userId),
  })
)

export const sessionNote = pgTable(
  'session_note',
  {
    id: text('id').primaryKey(),
    bookingId: text('bookingId')
      .notNull()
      .unique()
      .references(() => booking.id, { onDelete: 'cascade' }),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    encryptedContent: text('encryptedContent').notNull(),
    iv: text('iv').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    bookingIdUnique: uniqueIndex('idx_session_note_bookingId').on(table.bookingId),
  })
)

export const resource = pgTable('resource', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'),
  body: text('body'),
  url: text('url'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const review = pgTable(
  'review',
  {
    id: text('id').primaryKey(),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    seekerId: text('seekerId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    counselorIdIdx: index('idx_review_counselorId').on(table.counselorId),
  })
)

export const reviewRelations = relations(review, ({ one }) => ({
  counselor: one(user, {
    fields: [review.counselorId],
    references: [user.id],
    relationName: 'receivedReviews',
  }),
  seeker: one(user, {
    fields: [review.seekerId],
    references: [user.id],
    relationName: 'givenReviews',
  }),
}))

export const scheduleSlot = pgTable(
  'schedule_slot',
  {
    id: text('id').primaryKey(),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    dayOfWeek: integer('dayOfWeek').notNull(),
    startTime: text('startTime').notNull(),
    endTime: text('endTime').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    counselorIdIdx: index('idx_schedule_slot_counselorId').on(table.counselorId),
  })
)

export const supportTicket = pgTable(
  'support_ticket',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    subject: text('subject').notNull(),
    description: text('description'),
    status: text('status').default('open'),
    priority: text('priority').default('medium'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_support_ticket_userId').on(table.userId),
    statusIdx: index('idx_support_ticket_status').on(table.status),
  })
)

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  counselorProfile: one(counselorProfile, {
    fields: [user.id],
    references: [counselorProfile.userId],
  }),
  bookingsAsSeeker: many(booking, { relationName: 'seekerBookings' }),
  bookingsAsCounselor: many(booking, { relationName: 'counselorBookings' }),
  moodEntries: many(moodEntry),
  sentMessages: many(message),
  receivedReviews: many(review, { relationName: 'receivedReviews' }),
  givenReviews: many(review, { relationName: 'givenReviews' }),
  supportTickets: many(supportTicket),
  assessments: many(assessmentResult),
  notifications: many(notification),
  sessionNotes: many(sessionNote),
  scheduleSlots: many(scheduleSlot),
  earningsAsCounselor: many(earnings, { relationName: 'earningsAsCounselor' }),
  waitlistEntriesAsSeeker: many(waitlistEntry, { relationName: 'waitlistSeeker' }),
  waitlistEntriesAsCounselor: many(waitlistEntry, { relationName: 'waitlistCounselor' }),
}))

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}))

export const sessionNoteRelations = relations(sessionNote, ({ one }) => ({
  booking: one(booking, {
    fields: [sessionNote.bookingId],
    references: [booking.id],
  }),
  counselor: one(user, {
    fields: [sessionNote.counselorId],
    references: [user.id],
  }),
}))

export const supportTicketRelations = relations(supportTicket, ({ one }) => ({
  user: one(user, {
    fields: [supportTicket.userId],
    references: [user.id],
  }),
}))

export const scheduleSlotRelations = relations(scheduleSlot, ({ one }) => ({
  counselor: one(user, {
    fields: [scheduleSlot.counselorId],
    references: [user.id],
  }),
}))

export const waitlistEntry = pgTable(
  'waitlist_entry',
  {
    id: text('id').primaryKey(),
    seekerId: text('seekerId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    seekerCounselorUnique: uniqueIndex('idx_waitlist_seeker_counselor').on(table.seekerId, table.counselorId),
    counselorIdIdx: index('idx_waitlist_counselorId').on(table.counselorId),
  })
)

export const waitlistEntryRelations = relations(waitlistEntry, ({ one }) => ({
  seeker: one(user, {
    fields: [waitlistEntry.seekerId],
    references: [user.id],
    relationName: 'waitlistSeeker',
  }),
  counselor: one(user, {
    fields: [waitlistEntry.counselorId],
    references: [user.id],
    relationName: 'waitlistCounselor',
  }),
}))

export const earnings = pgTable(
  'earnings',
  {
    id: text('id').primaryKey(),
    counselorId: text('counselorId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    bookingId: text('bookingId')
      .notNull()
      .references(() => booking.id, { onDelete: 'cascade' }),
    amount: integer('amount').notNull().default(1500),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    counselorIdIdx: index('idx_earnings_counselorId').on(table.counselorId),
    bookingIdIdx: index('idx_earnings_bookingId').on(table.bookingId),
  })
)

export const earningsRelations = relations(earnings, ({ one }) => ({
  counselor: one(user, {
    fields: [earnings.counselorId],
    references: [user.id],
    relationName: 'earningsAsCounselor',
  }),
  booking: one(booking, {
    fields: [earnings.bookingId],
    references: [booking.id],
  }),
}))

export const bookingRelations = relations(booking, ({ one, many }) => ({
  seeker: one(user, {
    fields: [booking.seekerId],
    references: [user.id],
    relationName: 'seekerBookings',
  }),
  counselor: one(user, {
    fields: [booking.counselorId],
    references: [user.id],
    relationName: 'counselorBookings',
  }),
  messages: many(message),
  sessionNote: one(sessionNote, {
    fields: [booking.id],
    references: [sessionNote.bookingId],
  }),
}))
