"use client"

import { useState } from "react"
import { SeekerLayout } from "./seeker-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, ClipboardCheck, TrendingDown, Calendar } from "lucide-react"
import { submitAssessment } from "@/app/actions/assessment"

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure, or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

const ANSWER_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]

const BAND_COLORS: Record<string, string> = {
  Minimal: "text-green-600 bg-green-50 border-green-200",
  Mild: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Moderate: "text-orange-600 bg-orange-50 border-orange-200",
  "Moderately severe": "text-red-600 bg-red-50 border-red-200",
  Severe: "text-destructive bg-destructive/10 border-destructive/30",
}

interface AssessmentHistoryItem {
  id: string
  score: number
  interpretation: string
  answers: number[]
  createdAt: string
}

interface AssessmentFormProps {
  history: AssessmentHistoryItem[]
}

export function AssessmentForm({ history }: AssessmentFormProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(9).fill(null))
  const [result, setResult] = useState<{ score: number; interpretation: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const answeredCount = answers.filter((a) => a !== null).length
  const allAnswered = answeredCount === 9

  const handleAnswer = (index: number, value: number) => {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
  }

  const handleSubmit = async () => {
    if (!allAnswered) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await submitAssessment(answers as number[])
      setResult(res)
    } catch (err: any) {
      setError(err.message || "Failed to submit assessment")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetake = () => {
    setAnswers(Array(9).fill(null))
    setResult(null)
    setError(null)
  }

  return (
    <SeekerLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">PHQ-9 Assessment</h1>
          <p className="mt-1 text-muted-foreground">
            Over the last 2 weeks, how often have you been bothered by the following problems?
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result ? (
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ClipboardCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl">Your PHQ-9 Score: {result.score}</CardTitle>
              <CardDescription className="text-base">
                Interpretation:{" "}
                <span className="font-semibold">{result.interpretation}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`rounded-lg border p-4 text-sm ${BAND_COLORS[result.interpretation] || ""}`}>
                <p className="font-medium">{result.interpretation} severity</p>
                <p className="mt-1 opacity-80">
                  {result.interpretation === "Minimal" && "Your responses suggest minimal depression symptoms."}
                  {result.interpretation === "Mild" && "Your responses suggest mild depression symptoms."}
                  {result.interpretation === "Moderate" && "Your responses suggest moderate depression symptoms. Consider discussing with a counselor."}
                  {result.interpretation === "Moderately severe" && "Your responses suggest moderately severe depression symptoms. We strongly recommend discussing with a counselor."}
                  {result.interpretation === "Severe" && "Your responses suggest severe depression symptoms. Please reach out to a counselor or crisis support immediately."}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                PHQ-9 is a screening tool, not a clinical diagnosis. Please discuss your results with a
                licensed mental health professional.
              </p>
              <Button variant="outline" onClick={handleRetake} className="w-full">
                Take Assessment Again
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(answeredCount / 9) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground shrink-0">
                {answeredCount}/9
              </span>
            </div>

            <div className="space-y-4">
              {PHQ9_QUESTIONS.map((q, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium leading-relaxed">
                      {i + 1}. {q}
                    </Label>
                    <RadioGroup
                      value={answers[i]?.toString() || ""}
                      onValueChange={(v) => handleAnswer(i, parseInt(v, 10))}
                      className="mt-3 flex flex-wrap gap-2"
                    >
                      {ANSWER_OPTIONS.map((opt) => (
                        <Label
                          key={opt.value}
                          className={`flex-1 min-w-[120px] flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                            answers[i] === opt.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={opt.value.toString()} className="sr-only" />
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              answers[i] === opt.value ? "border-primary" : "border-muted-foreground"
                            }`}
                          >
                            {answers[i] === opt.value && <div className="h-2 w-2 rounded-full bg-primary" />}
                          </div>
                          {opt.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Submitting..." : "Submit Assessment"}
            </Button>
          </div>
        )}

        {history.length > 0 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="h-5 w-5 text-primary" />
                Assessment History
              </CardTitle>
              <CardDescription>Your past PHQ-9 results over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Score: {item.score}</span>
                      <span className={`text-sm font-medium ${BAND_COLORS[item.interpretation]?.split(" ")[0] || ""}`}>
                        {item.interpretation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SeekerLayout>
  )
}
