import { betterAuth } from 'better-auth'
import { pool, db } from './db'
import { user } from './db/schema'
import { eq } from 'drizzle-orm'

const isDevelopment = process.env.NODE_ENV === 'development'

// Build trusted origins array
const trustedOrigins: string[] = []
if (process.env.BETTER_AUTH_URL) {
  trustedOrigins.push(process.env.BETTER_AUTH_URL)
}
if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  trustedOrigins.push(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
}
if (process.env.VERCEL_URL) {
  trustedOrigins.push(`https://${process.env.VERCEL_URL}`)
}
if (process.env.V0_RUNTIME_URL) {
  trustedOrigins.push(process.env.V0_RUNTIME_URL)
}
// Add the known production domain
trustedOrigins.push('https://harmonycounseling.vercel.app')
trustedOrigins.push('https://v0-harmony-h3.vercel.app')

if (trustedOrigins.length === 0) {
  trustedOrigins.push('http://localhost:3000')
}

// Determine base URL
const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.V0_RUNTIME_URL || 'http://localhost:3000')

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  appName: 'Harmony',
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'seeker',
        input: true,
      },
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session, _ctx) => {
          const [userRow] = await db.select({ banned: user.banned }).from(user).where(eq(user.id, session.userId)).limit(1)
          if (userRow?.banned) {
            return false
          }
          return { data: session }
        },
      },
    },
  },
  advanced: {
    defaultCookieAttributes: isDevelopment
      ? {
          sameSite: 'lax',
        }
      : undefined,
  },
})
