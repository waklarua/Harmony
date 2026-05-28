import { betterAuth } from 'better-auth'
import { pool } from './db'

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

// Function to check if origin is trusted (supports v0 preview URLs dynamically)
function isOriginTrusted(origin: string): boolean {
  // Check static list
  if (trustedOrigins.includes(origin)) {
    return true
  }
  // Allow v0 preview domains (vusercontent.net)
  if (origin.endsWith('.vusercontent.net')) {
    return true
  }
  // Allow vercel preview URLs
  if (origin.includes('.vercel.app')) {
    return true
  }
  return false
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
  trustedOrigins: (origin) => isOriginTrusted(origin),
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
