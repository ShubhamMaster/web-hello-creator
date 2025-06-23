
-- Create employees table
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  role_designation TEXT NOT NULL,
  department TEXT NOT NULL,
  date_of_joining DATE NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('Full-Time', 'Part-Time', 'Contract')),
  salary DECIMAL(10,2),
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  education_certifications TEXT,
  work_status TEXT NOT NULL DEFAULT 'Active' CHECK (work_status IN ('Active', 'On Leave', 'Terminated')),
  resume_url TEXT,
  supervisor TEXT,
  profile_image_url TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  upi_id TEXT,
  date_of_exit DATE,
  exit_reason TEXT,
  notes TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT NOT NULL UNIQUE,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Credit', 'Debit')),
  amount DECIMAL(12,2) NOT NULL,
  description TEXT NOT NULL,
  purpose TEXT,
  payment_to_from TEXT,
  remaining_balance DECIMAL(12,2),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Cleared')),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to generate employee ID
CREATE OR REPLACE FUNCTION public.generate_employee_id(year INTEGER)
RETURNS TEXT AS $$
DECLARE
  sequence_num INTEGER;
  new_employee_id TEXT;
BEGIN
  -- Get the next sequence number for the year
  SELECT COALESCE(MAX(CAST(SUBSTRING(e.employee_id FROM 7) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM employees e
  WHERE EXTRACT(YEAR FROM e.date_of_joining) = year;
  
  -- Format as EMP{year}{6-digit sequence}
  new_employee_id := 'EMP' || year::TEXT || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN new_employee_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate transaction ID
CREATE OR REPLACE FUNCTION public.generate_transaction_id()
RETURNS TEXT AS $$
DECLARE
  sequence_num INTEGER;
  new_transaction_id TEXT;
BEGIN
  -- Get the next sequence number
  SELECT COALESCE(MAX(CAST(SUBSTRING(t.transaction_id FROM 4) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM transactions t;
  
  -- Format as TXN{8-digit sequence}
  new_transaction_id := 'TXN' || LPAD(sequence_num::TEXT, 8, '0');
  
  RETURN new_transaction_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on both tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees (super_admin only)
CREATE POLICY "Super admin can manage employees" ON public.employees
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Create RLS policies for transactions (super_admin only)
CREATE POLICY "Super admin can manage transactions" ON public.transactions
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'super_admin'
  )
);

-- Add triggers for updated_at
CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
