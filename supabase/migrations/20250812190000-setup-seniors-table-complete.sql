-- =====================================================
-- COMPREHENSIVE SENIORS TABLE SETUP WITH PROPER RLS
-- =====================================================

-- Drop existing table if it exists (for clean setup)
DROP TABLE IF EXISTS public.seniors CASCADE;

-- Create seniors table with all required columns
CREATE TABLE public.seniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mobile TEXT,
  gender TEXT,
  rollno TEXT,
  native_place TEXT,
  branch TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_seniors_email ON public.seniors(email);
CREATE INDEX idx_seniors_id ON public.seniors(id);
CREATE INDEX idx_seniors_rollno ON public.seniors(rollno);
CREATE INDEX idx_seniors_is_public ON public.seniors(is_public);
CREATE INDEX idx_seniors_email_lower ON public.seniors(LOWER(email));

-- Enable RLS on seniors table
ALTER TABLE public.seniors ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES FOR SENIORS TABLE
-- =====================================================

-- Policy 1: Seniors can view their own complete profile (by ID or email)
CREATE POLICY "seniors_can_view_own_profile" ON public.seniors
  FOR SELECT USING (
    auth.uid() = id OR 
    auth.email() = email
  );

-- Policy 2: Seniors can insert their own profile
CREATE POLICY "seniors_can_insert_own_profile" ON public.seniors
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    auth.email() = email
  );

-- Policy 3: Seniors can update their own profile
CREATE POLICY "seniors_can_update_own_profile" ON public.seniors
  FOR UPDATE USING (
    auth.uid() = id OR 
    auth.email() = email
  );

-- Policy 4: Authenticated users (juniors) can view senior profiles
-- This policy will be handled at application level for mobile number privacy
CREATE POLICY "authenticated_users_can_view_seniors" ON public.seniors
  FOR SELECT USING (
    auth.role() = 'authenticated'
  );

-- =====================================================
-- JUNIORS TABLE SETUP (for completeness)
-- =====================================================

-- Drop existing juniors table if it exists (for clean setup)  
DROP TABLE IF EXISTS public.juniors CASCADE;

-- Create juniors table with required columns
CREATE TABLE public.juniors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mobile TEXT,
  gender TEXT,
  year INTEGER,
  branch TEXT,
  college TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for juniors
CREATE INDEX idx_juniors_email ON public.juniors(email);
CREATE INDEX idx_juniors_id ON public.juniors(id);

-- Enable RLS on juniors table
ALTER TABLE public.juniors ENABLE ROW LEVEL SECURITY;

-- RLS policies for juniors (they can only access their own data)
CREATE POLICY "juniors_can_view_own_profile" ON public.juniors
  FOR SELECT USING (
    auth.uid() = id OR 
    auth.email() = email
  );

CREATE POLICY "juniors_can_insert_own_profile" ON public.juniors
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    auth.email() = email
  );

CREATE POLICY "juniors_can_update_own_profile" ON public.juniors
  FOR UPDATE USING (
    auth.uid() = id OR 
    auth.email() = email
  );

-- =====================================================
-- VERIFICATION CODES TABLE (for password reset, etc.)
-- =====================================================

-- Create verification codes table if not exists
CREATE TABLE IF NOT EXISTS public.verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for verification codes
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON public.verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON public.verification_codes(code);

-- RLS for verification codes (users can only access their own codes)
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_access_own_verification_codes" ON public.verification_codes
  FOR ALL USING (auth.email() = email);

-- =====================================================
-- GRANTS AND PERMISSIONS
-- =====================================================

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.seniors TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.juniors TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.verification_codes TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant sequence permissions if needed
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- FUNCTIONS FOR DATA PRIVACY (MOBILE NUMBER FILTERING)
-- =====================================================

-- Create a function to get senior profile with mobile privacy logic
CREATE OR REPLACE FUNCTION get_senior_profile_with_privacy(
  senior_email TEXT,
  requesting_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  name TEXT,
  mobile TEXT,
  gender TEXT,
  rollno TEXT,
  native_place TEXT,
  branch TEXT,
  is_public BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If requesting user is the same as profile owner, return all data
  IF requesting_user_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.seniors 
    WHERE (seniors.id = requesting_user_id OR seniors.email = auth.email())
    AND seniors.email = senior_email
  ) THEN
    RETURN QUERY
    SELECT s.id, s.email, s.name, s.mobile, s.gender, s.rollno, s.native_place, s.branch, s.is_public, s.created_at, s.updated_at
    FROM public.seniors s
    WHERE s.email = senior_email;
  ELSE
    -- For other users (juniors), return mobile only if is_public = true
    RETURN QUERY
    SELECT 
      s.id, 
      s.email, 
      s.name, 
      CASE 
        WHEN s.is_public = true THEN s.mobile 
        ELSE NULL 
      END as mobile,
      s.gender, 
      s.rollno, 
      s.native_place, 
      s.branch, 
      s.is_public, 
      s.created_at, 
      s.updated_at
    FROM public.seniors s
    WHERE s.email = senior_email;
  END IF;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_senior_profile_with_privacy TO authenticated;

-- =====================================================
-- SAMPLE DATA (for testing) - REMOVE IN PRODUCTION
-- =====================================================

-- Insert sample senior data (you can remove this in production)
INSERT INTO public.seniors (id, email, name, mobile, gender, rollno, native_place, branch, is_public) VALUES
(gen_random_uuid(), 'vskrcs.23@nitj.ac.in', 'Vignesh Kumar', '+919876543210', 'male', '23103456', 'Chennai', 'Computer Science Engineering', true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  mobile = EXCLUDED.mobile,
  gender = EXCLUDED.gender,
  rollno = EXCLUDED.rollno,
  native_place = EXCLUDED.native_place,
  branch = EXCLUDED.branch,
  is_public = EXCLUDED.is_public,
  updated_at = now();

-- =====================================================
-- CLEANUP FUNCTION FOR EXPIRED VERIFICATION CODES
-- =====================================================

CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.verification_codes 
  WHERE expires_at < now() OR used = true;
END;
$$;

GRANT EXECUTE ON FUNCTION cleanup_expired_codes TO authenticated;
