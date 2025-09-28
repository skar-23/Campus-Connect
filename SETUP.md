# Campus Connect - Environment Setup

## Setting up Environment Variables

This project uses Supabase for backend services. To run the application locally, you need to set up environment variables.

### Frontend Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase project credentials:
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy the "Project URL" and "Project API keys" → "anon public"

3. Update `.env.local` with your values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Supabase Edge Functions Environment Variables

If you're working with Supabase Edge Functions:

1. Copy the example environment file:
   ```bash
   cp supabase/functions/.env.example supabase/functions/.env
   ```

2. Update `supabase/functions/.env` with your service role key:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### Production Deployment

For production deployments (Vercel, Netlify, etc.), add these environment variables in your hosting platform's dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Security Notes

- Never commit `.env.local` or `supabase/functions/.env` files to version control
- The `.env.example` files are safe to commit as they don't contain real credentials
- Use GitHub Secrets or your hosting platform's environment variable system for production