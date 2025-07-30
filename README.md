# Todo Fullstack App

A modern todo application built with Next.js, Tailwind CSS, shadcn/ui, and Supabase.

## Features

- 🔐 **Authentication**: Email sign-up/sign-in with Supabase Auth
- 📝 **Task Management**: Create, view, and manage tasks
- 🏷️ **Project Organization**: Group tasks by projects
- 📅 **Due Date Tracking**: Track task deadlines with urgency indicators
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS and shadcn/ui
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database + Authentication)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amritha2003/Todo-using-ai.git
   cd Todo-using-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   **Projects Table:**
   ```sql
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Tasks Table:**
   ```sql
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     start_date DATE,
     due_date DATE,
     project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'blocked')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Row Level Security (RLS):**
   ```sql
   -- Enable RLS
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Projects policies
   CREATE POLICY "Users can view their own projects" ON projects
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert their own projects" ON projects
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own projects" ON projects
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own projects" ON projects
     FOR DELETE USING (auth.uid() = user_id);

   -- Tasks policies
   CREATE POLICY "Users can view their own tasks" ON tasks
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert their own tasks" ON tasks
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own tasks" ON tasks
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own tasks" ON tasks
     FOR DELETE USING (auth.uid() = user_id);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository

2. **Configure Environment Variables**
   In your Vercel project settings, add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Deploy**
   Vercel will automatically build and deploy your app

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # Login page
│   ├── register/          # Register page
│   └── dashboard/         # Dashboard with tasks
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
│   ├── supabaseClient.ts # Supabase client configuration
│   └── supabaseApi.ts    # API utility functions
└── styles/               # Global styles
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
