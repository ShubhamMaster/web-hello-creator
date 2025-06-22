
-- Create employees table with 20+ fields as specified
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    role_designation TEXT NOT NULL,
    department TEXT NOT NULL,
    date_of_joining DATE NOT NULL,
    employment_type TEXT CHECK (employment_type IN ('Full-Time', 'Part-Time', 'Contract')) DEFAULT 'Full-Time',
    salary DECIMAL(10,2),
    address TEXT,
    emergency_contact TEXT,
    emergency_phone TEXT,
    education_certifications TEXT,
    work_status TEXT CHECK (work_status IN ('Active', 'On Leave', 'Terminated')) DEFAULT 'Active',
    resume_url TEXT,
    supervisor TEXT,
    profile_image_url TEXT,
    account_number TEXT,
    ifsc_code TEXT,
    upi_id TEXT,
    date_of_exit DATE,
    exit_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Create function to generate employee ID
CREATE OR REPLACE FUNCTION generate_employee_id(year INTEGER)
RETURNS TEXT AS $$
DECLARE
    next_sequence INTEGER;
    employee_id TEXT;
BEGIN
    -- Get the next sequence number for the given year
    SELECT COALESCE(MAX(CAST(SUBSTRING(employee_id FROM 8) AS INTEGER)), 0) + 1
    INTO next_sequence
    FROM employees
    WHERE employee_id LIKE 'EMP' || year || '%';
    
    -- Format the employee ID as EMP{year}{4-digit-sequence}
    employee_id := 'EMP' || year || LPAD(next_sequence::TEXT, 4, '0');
    
    RETURN employee_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_employees_updated_at 
    BEFORE UPDATE ON employees 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Super admins can manage all employees" ON employees
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'super_admin'
        )
    );

CREATE POLICY "Admins can view employees" ON employees
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'super_admin')
        )
    );
