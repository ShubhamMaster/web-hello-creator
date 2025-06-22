
-- Create super admin user account
-- Note: This will need to be done manually in Supabase Auth or through the Supabase dashboard
-- This migration sets up the profile for the super admin user

-- First, we need to insert the profile for the super admin
-- The actual auth user creation should be done through Supabase Auth dashboard
-- Email: admin@gmail.com, Password: admin@123

-- Insert super admin profile (replace the UUID with the actual auth.users.id from Supabase)
-- This is a placeholder - you'll need to replace with the actual UUID after creating the auth user
INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000', -- Replace with actual auth user UUID
    'admin@gmail.com',
    'Super Administrator',
    'super_admin',
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    role = 'super_admin',
    full_name = 'Super Administrator',
    updated_at = NOW();

-- Update the get_user_role function to handle the super admin case
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS user_role AS $$
DECLARE
    user_role_result user_role;
BEGIN
    SELECT role INTO user_role_result
    FROM profiles
    WHERE id = user_id;
    
    -- If no role found, default to 'user'
    IF user_role_result IS NULL THEN
        user_role_result := 'user';
    END IF;
    
    RETURN user_role_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
