# Harmony - Mental Health Support Platform

A modern, secure mental health support platform connecting users with licensed counselors in a private, supportive environment. Built with Next.js, React, and a comprehensive component library for a seamless user experience.

## Overview

Harmony is a digital mental health platform designed to make professional counseling accessible, convenient, and private. The platform serves three key user types:

- **Seekers (Users)**: Individuals seeking mental health support
- **Guides (Counselors)**: Licensed mental health professionals providing services
- **Stewards (Administrators)**: Platform administrators managing users, counselors, and system operations

## Features

### For Seekers (Users)
- **Dashboard**: Personalized welcome screen with quick access to key features
- **Find Counselors**: Browse and search licensed counselors with detailed profiles
- **Book Sessions**: Schedule therapy sessions with your chosen counselor
- **Messages**: Direct messaging with your assigned counselors
- **Journey Tracking**: Monitor your mental health progress over time
- **Resources**: Access curated mental health articles and wellness materials
- **Profile Management**: Update personal information and preferences
- **Crisis Support**: Quick access to crisis hotlines and emergency resources

### For Guides (Counselors)
- **Dashboard**: Overview of client cases and upcoming sessions
- **Client Management**: View and manage your client list
- **Schedule Management**: Manage appointment schedules and availability
- **Messaging**: Communicate with clients securely
- **Earnings Tracking**: Monitor payments and earnings
- **Session Notes**: Document session details and progress

### For Stewards (Administrators)
- **User Management**: View, manage, and moderate user accounts
- **Counselor Management**: Onboard and manage licensed professionals
- **Platform Analytics**: Monitor platform usage and metrics
- **Support Ticketing**: Handle user inquiries and issues
- **Dashboard**: Overview of platform health and key metrics

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0+ with App Router
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS 4.1 with custom design tokens
- **Component System**: shadcn/ui components built on Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Data Visualization**: Recharts for charts and analytics

### Core Dependencies
- **State Management**: React hooks with custom context
- **Theme Support**: next-themes for dark mode support
- **Date Handling**: date-fns for date manipulation
- **Notifications**: Sonner for toast notifications
- **Validation**: Zod for schema validation
- **Analytics**: Vercel Analytics integration

### Development Tools
- **TypeScript**: Full TypeScript support
- **ESLint**: Code quality and style checking
- **PostCSS**: CSS processing with Tailwind CSS v4

## Project Structure

```
harmony/
├── app/                           # Next.js App Router pages
│   ├── (public)/                 # Public pages (landing, pricing, etc.)
│   ├── seeker/                   # User dashboard and features
│   │   ├── dashboard/            # Seeker dashboard
│   │   ├── counselors/           # Find and browse counselors
│   │   ├── sessions/             # View booked sessions
│   │   ├── messages/             # Messaging interface
│   │   ├── resources/            # Wellness resources
│   │   ├── journey/              # Progress tracking
│   │   ├── profile/              # User profile management
│   │   └── settings/             # User settings
│   ├── guide/                    # Counselor dashboard and features
│   │   ├── dashboard/            # Counselor dashboard
│   │   ├── clients/              # Client management
│   │   ├── messages/             # Client messaging
│   │   ├── schedule/             # Appointment scheduling
│   │   ├── earnings/             # Payment tracking
│   │   └── settings/             # Counselor settings
│   ├── steward/                  # Admin dashboard and features
│   │   ├── dashboard/            # Admin overview
│   │   ├── users/                # User management
│   │   ├── counselors/           # Counselor management
│   │   └── support/              # Support ticketing
│   ├── globals.css               # Global styles and design tokens
│   └── layout.tsx                # Root layout
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui component library
│   ├── seeker/                   # Seeker-specific components
│   ├── guide/                    # Guide-specific components
│   ├── steward/                  # Admin-specific components
│   ├── shared/                   # Shared components (header, nav, etc.)
│   └── landing-page.tsx          # Landing page component
├── lib/                          # Utility functions and helpers
│   ├── mock-data.ts              # Mock data for development
│   ├── format.ts                 # Formatting utilities
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ or compatible runtime
- npm, yarn, pnpm, or bun package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/harmony.git
   cd harmony
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (if needed)
   Create a `.env.local` file in the root directory with any required environment variables. Current setup uses mock data, so no database configuration is needed for local development.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Navigating the Platform

#### As a Seeker (User)
1. Visit the landing page and click "Get Started"
2. Sign up or log in to access your dashboard
3. Browse available counselors or book a session
4. Use the sidebar to navigate between features:
   - Dashboard: View overview and action cards
   - Sessions: Manage scheduled appointments
   - Messages: Communicate with your counselor
   - Resources: Access wellness materials
   - My Profile: Update your information

#### As a Guide (Counselor)
1. Log in as a counselor to access your dashboard
2. View your client list and upcoming sessions
3. Manage your schedule and availability
4. Communicate with clients through messaging
5. Track earnings and session history

#### As a Steward (Administrator)
1. Log in with admin credentials
2. Access the admin dashboard for platform metrics
3. Manage user and counselor accounts
4. Handle support tickets and platform issues

### Collapsible Sidebar
- The left sidebar features a toggle button (chevron icon) to collapse/expand
- When collapsed on desktop, icons remain visible with tooltips on hover
- Mobile devices show a full-width sidebar with an overlay when opened
- Active page is highlighted with the primary color

### Dark Mode
- Toggle dark/light mode using the theme switcher in the header
- Theme preference is saved to browser storage

## Design System

### Color Palette
The platform uses a harmonious color scheme with:
- **Primary**: Teal/Blue (`oklch(0.5 0.12 220)`) - Primary actions and highlights
- **Accent**: Green (`oklch(0.7 0.12 160)`) - Emphasis and secondary elements
- **Harmony Colors**: Custom color tokens for different aspects:
  - Warm (Orange): `oklch(0.8 0.1 85)`
  - Hope (Golden): `oklch(0.75 0.08 100)`
  - Safe (Cyan): `oklch(0.6 0.14 145)`
  - Compassion (Additional accents)

### Typography
- **Headings & Body**: Inter font family for consistency
- **Monospace**: Geist Mono for code and technical content
- **Responsive**: Text scales appropriately across breakpoints

### Layout
- Mobile-first responsive design
- Flexbox for most layouts with CSS Grid for complex 2D arrangements
- Consistent spacing using Tailwind CSS spacing scale
- Accessible components with proper ARIA labels and semantic HTML

## Key Features

### Sidebar Navigation
- Fixed left sidebar with collapsible toggle
- Active state highlighted with primary color (no hover effects)
- Mobile responsive with overlay
- Navigation items: Dashboard, Sessions, Messages, Resources, Profile, Settings
- Logout button positioned at the bottom
- Smooth transitions when toggling collapse state

### Messages Page
- Accessible from sidebar navigation
- Display active and archived conversations
- Unread message count badges
- Search functionality for finding conversations
- Responsive design across all dashboard types

### Action Cards
- Quick access cards to key features on dashboard
- Color-coded for different actions
- Hover effects with scale and shadow animations
- Maintained in original placement across dashboard updates

### Responsive Design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Sidebar fixed on desktop, collapsible on mobile
- Header adapts to screen size
- Components stack appropriately on smaller screens

## Development Guide

### Adding a New Page
1. Create a new directory in `/app` with your route path
2. Add a `page.tsx` file with your page component
3. Use the appropriate layout (SeekerLayout, GuideLayout, or StewardLayout)
4. Add navigation item to the sidebar if needed

### Creating New Components
1. Create component file in `/components` with appropriate subdirectory
2. Export component as named export
3. Use existing UI components from `/components/ui`
4. Follow naming conventions (PascalCase for components)

### Styling Guidelines
- Use Tailwind CSS utility classes exclusively
- Reference design tokens from `globals.css`
- Limit color palette to 3-5 colors per feature
- Ensure proper contrast ratios for accessibility
- Use `text-balance` or `text-pretty` for titles

### Form Handling
- Use React Hook Form for all forms
- Validate with Zod schema definitions
- Display validation errors clearly to users
- Provide feedback with toast notifications

## Contributing

We welcome contributions from the community. To contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/harmony.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards and design guidelines
   - Ensure your code is properly formatted
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add your meaningful commit message"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Test your changes before submitting

## Deployment

### Deploy to Vercel
Harmony is optimized for deployment on Vercel:

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and select your repository
   - Vercel automatically detects Next.js configuration

3. **Deploy**
   - Click "Deploy" - Vercel handles the rest
   - Your site will be live at a Vercel URL
   - Set up a custom domain if desired

### Environment Variables
- Add any required environment variables in Vercel project settings
- Use `.env.local` for local development

## Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**Dependencies installation fails**
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and lock file
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

**Styling issues with Tailwind**
- Clear Tailwind cache: `npm run build`
- Ensure `globals.css` is imported in `layout.tsx`
- Check that files match the glob pattern in `tailwind.config.ts`

## FAQ

**Q: Can users create accounts?**
A: Currently, the platform uses mock authentication. Account creation logic can be implemented with a backend service.

**Q: Is data persistent?**
A: The current version uses mock data stored in memory. For production, implement a database integration (Supabase, Neon, etc.).

**Q: How do I customize the design?**
A: Edit the design tokens in `app/globals.css` or use the shadcn CLI to customize components.

**Q: Can I use this as a template?**
A: Yes! This project is designed to be a starting point for mental health platforms.

## Security & Privacy

- **Data Encryption**: Implement HTTPS for all connections
- **User Privacy**: Follow HIPAA compliance guidelines for healthcare data
- **Authentication**: Implement secure authentication mechanisms
- **Data Storage**: Never store sensitive mental health data without proper encryption
- **Third-party Services**: Carefully vet any third-party integrations

For production deployment, consult with healthcare compliance specialists.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support & Contact

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/yourusername/harmony/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/yourusername/harmony/discussions)
- **Email**: contact@harmony.example.com (replace with actual contact)
- **Documentation**: Full documentation available in `/docs`

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Data visualization with [Recharts](https://recharts.org/)

## Roadmap

- [ ] User authentication and account management
- [ ] Backend database integration
- [ ] Real-time messaging with WebSockets
- [ ] Video consultation support
- [ ] Payment integration for counselor booking
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] AI-powered mental health insights
- [ ] Community features and support groups

---

**Version**: 0.1.0  
**Last Updated**: 2024  
**Maintained By**: Harmony Team

For questions or feedback, please open an issue on GitHub or contact the development team.
