# Quick Test Credentials

## Use Any of These Emails to Create a Test Account:

### Seekers (Users looking for counseling)
- abeba@example.com
- kebede@example.com
- tigist@example.com

### Counselors/Guides (Mental health professionals)
- dr.alemayehu@example.com
- maryam.therapist@example.com
- ephrem.counselor@example.com

### Admin/Stewards (Platform administrators)
- admin@harmony.com

---

## How to Test

### Step 1: Sign Up
1. Go to **http://localhost:3000/signup**
2. Enter your name, pick one of the emails above, create a password
3. Select your role (Seeker, Guide, or Admin)
4. Click "Create Account"

### Step 2: You'll Be Logged In
- Seekers → `/seeker/dashboard`
- Guides → `/guide/dashboard`  
- Admins → `/steward/dashboard`

### Step 3: Explore Features
- **Seekers:** Browse counselors, view resources, track mood
- **Guides:** See bookings, message clients, manage availability
- **Admins:** View platform metrics and user management

### Step 4: Test Multiple Accounts
- Open another browser/incognito window
- Sign up with a different email (e.g., guide + seeker pair)
- Test messaging and booking flows between them

---

## Notes
- Passwords are completely up to you - no restrictions
- All accounts are stored in Neon database (persists across sessions)
- Session cookies expire after 30 days
- Demo counselor profiles and resources are pre-seeded in the database
