# Harmony Testing Guide

## Demo Accounts (Pre-seeded in Database)

### Seeker Accounts
- **Email:** abeba@example.com
- **Email:** kebede@example.com
- **Email:** tigist@example.com
- **Password:** Use signup page to create any password

### Counselor/Guide Accounts
- **Email:** dr.alemayehu@example.com
- **Email:** maryam.therapist@example.com
- **Email:** ephrem.counselor@example.com
- **Password:** Use signup page to create any password

### Admin/Steward Account
- **Email:** admin@harmony.com
- **Password:** Use signup page to create any password

## Testing Workflow

### 1. Create Your First Account (Seeker)
1. Go to http://localhost:3000/signup
2. Fill in:
   - **Full Name:** Your Test Name
   - **Email:** test.seeker@example.com
   - **Password:** Any strong password
   - **Role:** Select "Seeker"
3. Click "Continue"
4. Click "Create Account"
5. You'll be redirected to `/seeker/dashboard`

### 2. Create a Counselor Account
1. Go to http://localhost:3000/signup (in incognito/different browser)
2. Fill in:
   - **Full Name:** Test Counselor
   - **Email:** test.guide@example.com
   - **Password:** Any strong password
   - **Role:** Select "Guide/Counselor"
3. Complete signup
4. You'll be redirected to `/guide/dashboard`

### 3. Login with Existing Account
1. Go to http://localhost:3000/login
2. Use any email from the pre-seeded accounts
3. Use the password you created during signup

## Database Content

### Pre-seeded Data:
- **3 Seeker Profiles:** Abeba, Kebede, Tigist
- **3 Counselor Profiles:** Dr. Alemayehu, Maryam, Ephrem
- **Counselor Details:**
  - Specializations (Anxiety, PTSD, Relationships, etc.)
  - Hourly rates (400-500 ETB)
  - Ratings (4.7-4.9 stars)
  - Availability schedules

- **5 Mental Health Resources** in categories:
  - Mental Health (Anxiety, Depression)
  - Wellness (Sleep, Stress)
  - Emergency (Crisis Resources)

- **4 Sample Bookings:**
  - 2 Completed sessions
  - 1 Confirmed upcoming
  - 1 Pending request

- **Sample Messages:** Between seekers and counselors
- **Sample Mood Entries:** Various moods with intensity levels
- **Sample Reviews:** 5-star ratings for counselors

## Testing Features

### Authentication
- ✅ Sign up new accounts
- ✅ Login with credentials
- ✅ Logout (via dashboard nav)
- ✅ Protected routes (redirects to login if not authenticated)

### Seeker Dashboard
- View available counselors
- Browse resources
- Check mood tracking history
- See upcoming/past sessions

### Counselor Dashboard
- View client appointments
- Access messaging
- See session notes
- View client reviews

### Admin Dashboard
- Monitor platform statistics
- Manage users
- View booking metrics

## How to Test Auth Flow

### 1. Test Signup
```
Path: /signup
- Create new account
- Verify role assignment (seeker/guide/steward)
- Check redirect after signup
```

### 2. Test Login
```
Path: /login
- Login with valid credentials
- Verify session creation
- Check redirect to appropriate dashboard
```

### 3. Test Protected Routes
```
Without auth:
- Try to access /seeker/dashboard → Should redirect to /login
- Try to access /guide/dashboard → Should redirect to /login

With auth:
- Login as seeker → Can access /seeker/dashboard
- Cannot access /guide/dashboard (role check would go here)
```

## Database Queries You Can Test

### Get User Profile
```sql
SELECT * FROM "user" WHERE email = 'abeba@example.com';
```

### Get All Counselors
```sql
SELECT u.id, u.name, cp.rating, cp.hourlyRate 
FROM "user" u 
JOIN counselor_profile cp ON u.id = cp.userId 
WHERE u.role = 'guide';
```

### Get User's Bookings
```sql
SELECT * FROM booking 
WHERE seekerId = 'seeker-1' 
ORDER BY scheduledAt DESC;
```

### Get Unread Messages
```sql
SELECT * FROM message 
WHERE isRead = false 
ORDER BY createdAt DESC;
```

## Next Steps After Testing

1. **Update Components:** Replace mock data with real database queries
2. **Add Real-time Updates:** Integrate Supabase Realtime for messaging
3. **Add Payments:** Stripe integration for session payments
4. **Video Integration:** Add video conferencing to session rooms
5. **Email Notifications:** Send session reminders and updates
