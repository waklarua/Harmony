"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Loader2, Smartphone, Building2 } from "lucide-react"
import { formatCurrency } from "@/lib/format"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  counselorName: string
  sessionDate: string
  sessionTime: string
  onConfirm: (method: string, reference: string) => void
}

const PAYMENT_METHODS = [
  { id: "telebirr", name: "Telebirr", account: "0962029518", icon: Smartphone },
  { id: "cbe_birr", name: "CBE Birr", account: "100068686251", icon: Building2 },
] as const

export function PaymentModal({
  open,
  onOpenChange,
  amount,
  counselorName,
  sessionDate,
  sessionTime,
  onConfirm,
}: PaymentModalProps) {
  const [method, setMethod] = useState<string | null>(null)
  const [reference, setReference] = useState("")
  const [step, setStep] = useState<"filling" | "processing" | "success">("filling")

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method)

  const handleConfirm = useCallback(async () => {
    if (!method || !reference.trim()) return
    setStep("processing")
    await new Promise((r) => setTimeout(r, 1500))
    setStep("success")
    setTimeout(() => {
      onConfirm(method, reference.trim())
    }, 800)
  }, [method, reference, onConfirm])

  const handleOpenChange = (open: boolean) => {
    if (!open && step === "success") {
      onOpenChange(false)
      return
    }
    if (!open && step === "processing") return
    if (!open) {
      setMethod(null)
      setReference("")
      setStep("filling")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "filling" && (
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
              <DialogDescription>
                Complete your booking with {counselorName} for {sessionDate} at {sessionTime}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-lg bg-primary/5 p-4 text-center">
              <p className="text-sm text-muted-foreground">Session fee</p>
              <p className="text-2xl font-bold">{formatCurrency(amount)}</p>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium">Pay with</p>
              <div className="flex gap-3">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon
                  const isSelected = method === pm.id
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => { setMethod(pm.id); setReference("") }}
                      className={`flex flex-1 items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {pm.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedMethod && (
              <div className="space-y-3 rounded-lg border border-border p-3">
                <p className="text-sm">
                  Pay to: <span className="font-bold">{selectedMethod.account}</span>
                </p>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Transaction reference
                  </label>
                  <Input
                    placeholder="Enter reference number..."
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!method || !reference.trim()}
              onClick={handleConfirm}
            >
              Confirm Payment
            </Button>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Processing payment...</p>
            <p className="mt-1 text-sm text-muted-foreground">Please wait while we confirm your payment</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="mt-4 text-xl font-bold">Payment successful!</p>
            <p className="mt-1 text-sm text-muted-foreground">Your session has been booked</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
