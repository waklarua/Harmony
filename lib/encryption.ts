import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12
const KEY_ITERATIONS = 100000
const KEY_LENGTH = 32

function getSecret(): string {
  const secret = process.env.ENCRYPTION_SECRET
  if (!secret) throw new Error('ENCRYPTION_SECRET not set')
  return secret
}

function deriveKey(bookingId: string): Buffer {
  return crypto.pbkdf2Sync(getSecret(), bookingId, KEY_ITERATIONS, KEY_LENGTH, 'sha256')
}

export function encrypt(plaintext: string, bookingId: string): { iv: string; ciphertext: string } {
  const key = deriveKey(bookingId)
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  let encrypted = cipher.update(plaintext, 'utf8', 'base64')
  encrypted += cipher.final('base64')
  const authTag = cipher.getAuthTag().toString('base64')
  return { iv: iv.toString('base64'), ciphertext: `${encrypted}.${authTag}` }
}

export function decrypt(ciphertext: string, iv: string, bookingId: string): string {
  const key = deriveKey(bookingId)
  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'base64'))
  const dot = ciphertext.lastIndexOf('.')
  if (dot === -1) throw new Error('Invalid ciphertext format')
  const encryptedData = ciphertext.slice(0, dot)
  const authTag = Buffer.from(ciphertext.slice(dot + 1), 'base64')
  decipher.setAuthTag(authTag)
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export function deriveKeyBase64(bookingId: string): string {
  return deriveKey(bookingId).toString('base64')
}
