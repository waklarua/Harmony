'use server'

import { db } from '@/lib/db'
import { assessmentResult } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

const PHQ9_INTERPRETATIONS: [number, number, string][] = [
  [0, 4, 'Minimal'],
  [5, 9, 'Mild'],
  [10, 14, 'Moderate'],
  [15, 19, 'Moderately severe'],
  [20, 27, 'Severe'],
]

function interpretScore(score: number): string {
  for (const [lo, hi, label] of PHQ9_INTERPRETATIONS) {
    if (score >= lo && score <= hi) return label
  }
  return 'Unknown'
}

export async function submitAssessment(answers: number[]) {
  if (!Array.isArray(answers) || answers.length !== 9) {
    throw new Error('Exactly 9 answers are required')
  }
  for (const a of answers) {
    if (!Number.isInteger(a) || a < 0 || a > 3) {
      throw new Error('Each answer must be an integer between 0 and 3')
    }
  }

  const userId = await getUserId()
  const score = answers.reduce((sum, a) => sum + a, 0)
  const interpretation = interpretScore(score)

  await db.insert(assessmentResult).values({
    id: `phq9_${Date.now()}`,
    userId,
    assessmentType: 'phq-9',
    score,
    interpretation,
    answers,
  })

  revalidatePath('/seeker/dashboard')
  revalidatePath('/seeker/assessment')

  return { score, interpretation }
}

export async function getAssessmentHistory(userId?: string) {
  if (!userId) {
    userId = await getUserId()
  }

  const results = await db
    .select()
    .from(assessmentResult)
    .where(eq(assessmentResult.userId, userId))
    .orderBy(desc(assessmentResult.createdAt))

  return results.map((r) => ({
    id: r.id,
    score: r.score,
    interpretation: r.interpretation,
    answers: r.answers,
    createdAt: r.createdAt?.toISOString() || '',
  }))
}
