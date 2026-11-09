-- ==============================================================================
-- LIQUID RUBBER TECH — DEFINITIVE SECURE SUPABASE MIGRATION
-- Strict Administrator UUID Enforcement + Published-Only Public Read Access
-- Non-Destructive, Idempotent & Safe to Re-run
-- Administrator UUID: 55acb5d8-b8ff-447a-b09d-33bf621bceca
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLE: public.gallery_projects (Create if missing)
CREATE TABLE IF NOT EXISTS public.gallery_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Roof Restoration',
        'Waterproofing & Restoration',
        'Painting & Restoration',
        'Epoxy & Flooring',
        'Property Finishing & Renovation',
        'Plumbing & Bathroom Restoration',
        'Paving'
    )),
    display_type TEXT NOT NULL CHECK (display_type IN ('single', 'sequence')),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Non-destructive column additions for existing gallery_projects table
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS display_type TEXT;
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.gallery_projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Safely make title optional in existing tables (does not affect existing records)
ALTER TABLE public.gallery_projects ALTER COLUMN title DROP NOT NULL;
ALTER TABLE public.gallery_projects ALTER COLUMN title SET DEFAULT '';

-- 3. TABLE: public.gallery_images (Create if missing)
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.gallery_projects(id) ON DELETE CASCADE,
    stage TEXT NOT NULL CHECK (stage IN ('Before', 'During', 'After', 'Combined', 'Final')),
    storage_path TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Non-destructive column additions for existing gallery_images table
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS project_id UUID;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS stage TEXT;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
ALTER TABLE public.gallery_images ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Safely ensure foreign key constraint exists on gallery_images
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'gallery_images_project_id_fkey'
    ) THEN
        ALTER TABLE public.gallery_images 
        ADD CONSTRAINT gallery_images_project_id_fkey 
        FOREIGN KEY (project_id) REFERENCES public.gallery_projects(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 4. PERFORMANCE & FILTER INDEXES
CREATE INDEX IF NOT EXISTS idx_gallery_projects_created_at ON public.gallery_projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_projects_category ON public.gallery_projects (category);
CREATE INDEX IF NOT EXISTS idx_gallery_projects_is_published ON public.gallery_projects (is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_project_id ON public.gallery_images (project_id);

-- 5. GALLERY-SPECIFIC AUTO-UPDATE TRIGGER FUNCTION
-- Dedicated function name to avoid colliding with other application triggers
CREATE OR REPLACE FUNCTION public.handle_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_gallery_projects_updated_at ON public.gallery_projects;
CREATE TRIGGER set_gallery_projects_updated_at
    BEFORE UPDATE ON public.gallery_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_gallery_updated_at();

-- 6. ENABLE ROW LEVEL SECURITY (RLS) ON BOTH TABLES
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- 7. CLEAN UP ALL PREVIOUS & WEAKER POLICIES
-- A. Explicitly drop all known previous and default policy names
DROP POLICY IF EXISTS "Public can view gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Public visitors can view published projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Public can view published projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Public visitors can view published projects only" ON public.gallery_projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.gallery_projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.gallery_projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.gallery_projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can insert projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can update projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can insert gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can update gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Admin can delete gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Strict admin can insert gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Strict admin can update gallery projects" ON public.gallery_projects;
DROP POLICY IF EXISTS "Strict admin can delete gallery projects" ON public.gallery_projects;

DROP POLICY IF EXISTS "Public can view gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Public visitors can view project images" ON public.gallery_images;
DROP POLICY IF EXISTS "Public can view published project images" ON public.gallery_images;
DROP POLICY IF EXISTS "Public visitors can view published project images only" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.gallery_images;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can insert images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can update images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can delete images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can update gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admin can delete gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Strict admin can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Strict admin can update gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Strict admin can delete gallery images" ON public.gallery_images;

DROP POLICY IF EXISTS "Public Access gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view gallery images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public visitors can view gallery-images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public visitors can view gallery-images bucket only" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Strict admin can upload to gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Strict admin can update gallery-images" ON storage.objects;
DROP POLICY IF EXISTS "Strict admin can delete from gallery-images" ON storage.objects;

-- B. Dynamic cleanup: Drop any remaining policies on the two tables and gallery storage
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE (schemaname = 'public' AND tablename IN ('gallery_projects', 'gallery_images'))
           OR (schemaname = 'storage' AND tablename = 'objects' AND policyname ILIKE '%gallery%')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- 8. STRICT POLICIES FOR public.gallery_projects
-- [Occurrence 1] Public SELECT: Published projects or authorised admin
CREATE POLICY "Public visitors can view published projects only"
    ON public.gallery_projects FOR SELECT
    TO public
    USING (
        is_published = true 
        OR auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    );

-- [Occurrence 2] Admin INSERT
CREATE POLICY "Strict admin can insert gallery projects"
    ON public.gallery_projects FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- [Occurrences 3 & 4] Admin UPDATE (USING and WITH CHECK)
CREATE POLICY "Strict admin can update gallery projects"
    ON public.gallery_projects FOR UPDATE
    TO authenticated
    USING (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid)
    WITH CHECK (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- [Occurrence 5] Admin DELETE
CREATE POLICY "Strict admin can delete gallery projects"
    ON public.gallery_projects FOR DELETE
    TO authenticated
    USING (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- 9. STRICT POLICIES FOR public.gallery_images
-- [Occurrence 6] Public SELECT: Only images of published projects or authorised admin
CREATE POLICY "Public visitors can view published project images only"
    ON public.gallery_images FOR SELECT
    TO public
    USING (
        EXISTS (
            SELECT 1 FROM public.gallery_projects p
            WHERE p.id = gallery_images.project_id
              AND p.is_published = true
        )
        OR auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    );

-- [Occurrence 7] Admin INSERT
CREATE POLICY "Strict admin can insert gallery images"
    ON public.gallery_images FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- [Occurrences 8 & 9] Admin UPDATE (USING and WITH CHECK)
CREATE POLICY "Strict admin can update gallery images"
    ON public.gallery_images FOR UPDATE
    TO authenticated
    USING (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid)
    WITH CHECK (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- [Occurrence 10] Admin DELETE
CREATE POLICY "Strict admin can delete gallery images"
    ON public.gallery_images FOR DELETE
    TO authenticated
    USING (auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid);

-- 10. STORAGE BUCKET: gallery-images (Upsert to reuse existing bucket)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'gallery-images',
    'gallery-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- Storage Read Policy: Public CDN image access for 'gallery-images'
CREATE POLICY "Public visitors can view gallery-images bucket only"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'gallery-images');

-- [Occurrence 11] Admin Storage Upload (INSERT)
CREATE POLICY "Strict admin can upload to gallery-images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'gallery-images'
        AND auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    );

-- [Occurrences 12 & 13] Admin Storage In-Place Update (UPDATE: USING and WITH CHECK)
CREATE POLICY "Strict admin can update gallery-images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'gallery-images'
        AND auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    )
    WITH CHECK (
        bucket_id = 'gallery-images'
        AND auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    );

-- [Occurrence 14] Admin Storage File Deletion (DELETE)
CREATE POLICY "Strict admin can delete from gallery-images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'gallery-images'
        AND auth.uid() = '55acb5d8-b8ff-447a-b09d-33bf621bceca'::uuid
    );
