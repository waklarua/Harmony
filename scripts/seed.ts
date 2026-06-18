import { db } from '@/lib/db'
import { counselorProfile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const GUIDE_USER_ID = '6pLQm2L833iTukD2d0zHHehotx5ugmAf'

async function main() {
  console.log('Seeding counselor profile for guide user...')

  // Check if profile already exists
  const existing = await db
    .select()
    .from(counselorProfile)
    .where(eq(counselorProfile.userId, GUIDE_USER_ID))
    .limit(1)

  if (existing.length > 0) {
    console.log('Counselor profile already exists, updating...')
    await db
      .update(counselorProfile)
      .set({
        bio: 'Licensed professional counselor with over 8 years of experience helping individuals navigate anxiety, depression, and life transitions. I use an integrative approach combining CBT, mindfulness, and person-centered therapy.',
        specializations: ['Anxiety', 'Depression', 'Stress Management', 'Life Transitions', 'Self-Esteem'],
        certifications: ['Licensed Professional Counselor (LPC)', 'Certified Cognitive Behavioral Therapist'],
        hourlyRate: '1500',
        availability: 'Mon-Fri 9:00-17:00, Sat 10:00-14:00 EAT',
        status: 'approved',
        rating: '4.8',
      })
      .where(eq(counselorProfile.userId, GUIDE_USER_ID))
  } else {
    await db.insert(counselorProfile).values({
      id: `cp_${Date.now()}`,
      userId: GUIDE_USER_ID,
      bio: 'Licensed professional counselor with over 8 years of experience helping individuals navigate anxiety, depression, and life transitions. I use an integrative approach combining CBT, mindfulness, and person-centered therapy.',
      specializations: ['Anxiety', 'Depression', 'Stress Management', 'Life Transitions', 'Self-Esteem'],
      certifications: ['Licensed Professional Counselor (LPC)', 'Certified Cognitive Behavioral Therapist'],
      hourlyRate: '1500',
      availability: 'Mon-Fri 9:00-17:00, Sat 10:00-14:00 EAT',
      status: 'approved',
      rating: '4.8',
    })
    console.log('✓ Counselor profile created')
  }

  console.log('Seed complete!')
}

main().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
})
