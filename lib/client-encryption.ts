function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function bytesToText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}

export async function decryptMessage(
  ciphertext: string,
  iv: string,
  keyB64: string
): Promise<string> {
  const keyBytes = base64ToBytes(keyB64)
  const ivBytes = base64ToBytes(iv)

  const dot = ciphertext.lastIndexOf('.')
  if (dot === -1) throw new Error('Invalid ciphertext format')
  const encryptedB64 = ciphertext.slice(0, dot)
  const authTagB64 = ciphertext.slice(dot + 1)

  const encryptedBytes = base64ToBytes(encryptedB64)
  const authTagBytes = base64ToBytes(authTagB64)

  const combined = new Uint8Array(encryptedBytes.length + authTagBytes.length)
  combined.set(encryptedBytes)
  combined.set(authTagBytes, encryptedBytes.length)

  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    combined
  )

  return bytesToText(new Uint8Array(decrypted))
}
