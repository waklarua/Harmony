const VERIFIER_API = "https://verifyapi.leulzenebe.pro/verify"

const HARMONY_RECEIVERS: Record<string, { name: string; account: string }> = {
  telebirr: { name: "Abush", account: "0913499704" },
  cbe_birr: { name: "Abush", account: "100068686251" },
}

export interface PaymentVerificationResult {
  verified: boolean
  amount?: number
  senderName?: string
  receiverName?: string
  reference?: string
  status?: string
  error?: string
}

function parseAmountBirr(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "")
  return parseFloat(cleaned) || 0
}

function validateReceiver(
  bank: "telebirr" | "cbe_birr",
  receiverName: string,
  receiverAccount: string,
): string | null {
  const expected = HARMONY_RECEIVERS[bank]
  if (!expected) return null
  const nameMatch = receiverName.toLowerCase().includes(expected.name.toLowerCase())
  const accountMatch = receiverAccount.includes(expected.account.slice(-4))
  if (!nameMatch || !accountMatch) {
    return "Receipt is valid but the payment didn't go to Harmony's account."
  }
  return null
}

export async function verifyPayment(
  bank: "telebirr" | "cbe_birr",
  reference: string,
  extra?: { phoneNumber?: string; accountNumber?: string },
): Promise<PaymentVerificationResult> {
  const apiKey = process.env.VERIFIER_API_KEY
  if (!apiKey) {
    return { verified: false, error: "Verifier API key not configured." }
  }

  const body: Record<string, string> = {
    reference: reference.trim().toUpperCase(),
  }

  if (extra?.phoneNumber) {
    body.phoneNumber = extra.phoneNumber.replace(/^0/, "251")
  }

  try {
    const res = await fetch(VERIFIER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    })

    const bodyText = await res.text().catch(() => "")

    let parsed: any = null
    try {
      parsed = JSON.parse(bodyText)
    } catch {}

    if (!res.ok) {
      const msg = parsed?.error || bodyText.replace(/["{}]/g, "").trim() || `Verification service error (${res.status})`
      return { verified: false, error: msg }
    }

    if (!parsed?.success) {
      return {
        verified: false,
        error: parsed?.error || "Payment receipt not found.",
      }
    }

        const d = parsed.data || {}

    const receiverName = d.creditedPartyName || d.receiverName || d.receiver_name || ""
    const receiverAccount = d.creditedPartyAccountNo || d.receiverAccount || d.receiver_account || ""
    const status = d.transactionStatus || d.status || ""
    const senderName = d.payerName || d.senderName || d.sender_name || ""
    const ref = d.receiptNo || d.reference || d.transactionReference || reference
    const rawAmount = d.settledAmount || d.amount || d.transactionAmount || "0"
    const amount = typeof rawAmount === "number" ? rawAmount : parseAmountBirr(String(rawAmount))

    const validationError = validateReceiver(bank, receiverName, receiverAccount)
    if (validationError) {
      return { verified: false, error: validationError }
    }

    if (status.toLowerCase() !== "completed" && status.toLowerCase() !== "success") {
      return { verified: false, error: `Transaction status: ${status}` }
    }

    return {
      verified: true,
      amount,
      senderName,
      receiverName,
      reference: ref,
      status,
    }
  } catch (err: any) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      return { verified: false, error: "Verification timed out. Please try again." }
    }
    return { verified: false, error: "Could not verify payment. Please try again." }
  }
}
