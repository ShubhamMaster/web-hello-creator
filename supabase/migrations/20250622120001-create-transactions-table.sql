
-- Create transactions table for Banking Ledger
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_id TEXT UNIQUE NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    type TEXT CHECK (type IN ('Credit', 'Debit')) NOT NULL,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    description TEXT NOT NULL,
    purpose_tags TEXT[],
    payment_to_from TEXT,
    department TEXT,
    status TEXT CHECK (status IN ('Pending', 'Cleared')) DEFAULT 'Pending',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Create function to generate transaction ID
CREATE OR REPLACE FUNCTION generate_transaction_id()
RETURNS TEXT AS $$
DECLARE
    next_sequence INTEGER;
    transaction_id TEXT;
    current_year INTEGER;
BEGIN
    current_year := EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Get the next sequence number for the current year
    SELECT COALESCE(MAX(CAST(SUBSTRING(transaction_id FROM 9) AS INTEGER)), 0) + 1
    INTO next_sequence
    FROM transactions
    WHERE transaction_id LIKE 'TXN' || current_year || '%';
    
    -- Format the transaction ID as TXN{year}{6-digit-sequence}
    transaction_id := 'TXN' || current_year || LPAD(next_sequence::TEXT, 6, '0');
    
    RETURN transaction_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate transaction ID
CREATE OR REPLACE FUNCTION set_transaction_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_id IS NULL OR NEW.transaction_id = '' THEN
        NEW.transaction_id = generate_transaction_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_transaction_id_trigger
    BEFORE INSERT ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION set_transaction_id();

-- Create trigger for updated_at
CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON transactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (only super_admin can access banking)
CREATE POLICY "Only super admins can manage transactions" ON transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'super_admin'
        )
    );

-- Create function to calculate running balance
CREATE OR REPLACE FUNCTION calculate_running_balance()
RETURNS TABLE(
    transaction_id TEXT,
    date DATE,
    type TEXT,
    amount DECIMAL,
    description TEXT,
    running_balance DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    WITH ordered_transactions AS (
        SELECT 
            t.transaction_id,
            t.date,
            t.type,
            t.amount,
            t.description,
            ROW_NUMBER() OVER (ORDER BY t.date, t.created_at) as rn
        FROM transactions t
        WHERE t.is_deleted = FALSE AND t.status = 'Cleared'
    ),
    balance_calculation AS (
        SELECT 
            ot.transaction_id,
            ot.date,
            ot.type,
            ot.amount,
            ot.description,
            SUM(
                CASE 
                    WHEN ot2.type = 'Credit' THEN ot2.amount
                    WHEN ot2.type = 'Debit' THEN -ot2.amount
                END
            ) OVER (ORDER BY ot.rn) as running_balance
        FROM ordered_transactions ot
        JOIN ordered_transactions ot2 ON ot2.rn <= ot.rn
        GROUP BY ot.transaction_id, ot.date, ot.type, ot.amount, ot.description, ot.rn
    )
    SELECT 
        bc.transaction_id,
        bc.date,
        bc.type,
        bc.amount,
        bc.description,
        bc.running_balance
    FROM balance_calculation bc
    ORDER BY bc.date DESC;
END;
$$ LANGUAGE plpgsql;
