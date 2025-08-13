-- =====================================================
-- ADD AVATAR COLUMN TO SENIORS TABLE
-- =====================================================

-- Add avatar column to seniors table
ALTER TABLE public.seniors 
ADD COLUMN IF NOT EXISTS avatar TEXT;

-- Create index for avatar column for better performance
CREATE INDEX IF NOT EXISTS idx_seniors_avatar ON public.seniors(avatar);

-- Update the existing sample data with default avatars
UPDATE public.seniors 
SET avatar = CASE 
  WHEN gender = 'male' THEN '/lovable-uploads/boys/default.jpeg'
  WHEN gender = 'female' THEN '/lovable-uploads/girls/default.jpeg'
  ELSE '/lovable-uploads/boys/default.jpeg'
END
WHERE avatar IS NULL;

-- Set default avatar for future inserts (only if not already set)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'seniors' 
    AND column_name = 'avatar' 
    AND column_default IS NOT NULL
  ) THEN
    ALTER TABLE public.seniors 
    ALTER COLUMN avatar SET DEFAULT '/lovable-uploads/boys/default.jpeg';
  END IF;
END $$;
