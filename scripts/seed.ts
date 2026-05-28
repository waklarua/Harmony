import { db } from '@/lib/db'
import { user, account } from '@/lib/db/schema'
import { hash } from 'better-auth/crypto'

const DEMO_ACCOUNTS = [
  {
    id: 'seeker-demo-1',
    email: 'seeker@harmony.com',
    password: 'password123',
    name: 'Abeba Demo',
    role: 'seeker',
  },
  {
    id: 'guide-demo-1',
    email: 'guide@harmony.com',
    password: 'password123',
    name: 'Dr. Guide',
    role: 'guide',
  },
  {
    id: 'steward-demo-1',
    email: 'admin@harmony.com',
    password: 'password123',
    name: 'Admin User',
    role: 'steward',
  },
]

async function seed() {
  console.log('Seeding database...')

  for (const account_data of DEMO_ACCOUNTS) {
    const hashedPassword = await hash.password(account_data.password)

    // Insert user
    await db.insert(user).values({
      id: account_data.id,
      email: account_data.email,
      name: account_data.name,
      emailVerified: true,
      role: account_data.role,
    }).onConflictDoNothing()

    // Insert account with hashed password
    await db.insert(account).values({
      id: `account-${account_data.id}`,
      userId: account_data.id,
      accountId: account_data.id,
      providerId: 'credential',
      password: hashedPassword,
    }).onConflictDoNothing()

    console.log(`Created account: ${account_data.email}`)
  }

  console.log('Seed complete!')
}

seed().catch(console.error)
