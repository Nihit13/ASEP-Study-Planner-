# ASEP-Study-Planner-# Study Scheduler

A modern web application for managing and organizing study sessions efficiently. Built with React, TypeScript, and Supabase.

![Study Scheduler Screenshot](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000)

## Features

- **User Authentication**
  - Secure email/password authentication
  - Account creation and management
  - Protected routes for authenticated users

- **Study Session Management**
  - Create new study sessions with title, subject, date, and time
  - View all upcoming study sessions
  - Delete existing study sessions
  - Organized timeline view of study activities

- **Responsive Design**
  - Modern, clean user interface
  - Mobile-friendly layout
  - Intuitive navigation

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (for icons)
  - React Router DOM (for routing)
  - React Hot Toast (for notifications)

- **Backend & Database**
  - Supabase (Backend as a Service)
  - PostgreSQL (Database)
  - Row Level Security (RLS)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd study-scheduler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

The application requires a `study_sessions` table in your Supabase database with the following schema:

```sql
CREATE TABLE study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);
```

### Security

The application implements Row Level Security (RLS) policies to ensure users can only access their own data:

- Users can only view their own study sessions
- Users can only create sessions for themselves
- Users can only update their own sessions
- Users can only delete their own sessions

## Usage

1. **Sign Up/Sign In**
   - Create a new account using email and password
   - Verify your email address
   - Sign in to access the dashboard

2. **Managing Study Sessions**
   - Click "Add Session" to create a new study session
   - Fill in the required details:
     - Title
     - Subject
     - Date
     - Time
   - View all your sessions in the dashboard
   - Delete sessions you no longer need

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
study-scheduler/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── supabase/
│   └── migrations/
└── package.json
```

## Deployment

The application can be deployed to Netlify:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
