import { betterAuth } from 'better-auth'
import { pool } from './db'

const isDevelopment = process.env.NODE_ENV === 'development'

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  appName: 'Harmony',
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'),
  trustedOrigins:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : process.env.VERCEL_URL
        ? [`https://${process.env.VERCEL_URL}`]
        : ['http://localhost:3000']),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: isDevelopment
      ? {
          sameSite: 'none',
          secure: true,
        }
      : undefined,
  },
})
