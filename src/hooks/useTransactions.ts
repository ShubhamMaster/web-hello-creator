
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Transaction {
  id: string;
  transaction_id: string;
  date: string;
  type: 'Credit' | 'Debit';
  amount: number;
  description: string;
  purpose?: string;
  payment_to_from?: string;
  remaining_balance?: number;
  status: 'Pending' | 'Cleared';
  created_at: string;
  updated_at: string;
  is_deleted?: boolean;
  deleted_at?: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async (filters?: {
    type?: 'Credit' | 'Debit';
    status?: 'Pending' | 'Cleared';
    search?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('is_deleted', false)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.dateFrom) {
        query = query.gte('date', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('date', filters.dateTo);
      }

      if (filters?.search) {
        query = query.or(`description.ilike.%${filters.search}%,transaction_id.ilike.%${filters.search}%,payment_to_from.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transactions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createTransaction = async (transactionData: Omit<Transaction, 'id' | 'transaction_id' | 'created_at' | 'updated_at' | 'is_deleted' | 'deleted_at'>) => {
    try {
      // Generate transaction ID
      const { data: transactionId, error: idError } = await supabase.rpc('generate_transaction_id');
      
      if (idError) throw idError;

      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          ...transactionData,
          transaction_id: transactionId
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction created successfully",
      });

      fetchTransactions();
      return data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to create transaction",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });

      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        title: "Error",
        description: "Failed to update transaction",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteTransaction = async (id: string, transactionData: Transaction) => {
    try {
      // Soft delete
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ 
          is_deleted: true, 
          deleted_at: new Date().toISOString() 
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Add to recycle bin
      const { error: recycleBinError } = await supabase
        .from('recycle_bin')
        .insert({
          original_table: 'transactions',
          original_id: id,
          data: transactionData,
          can_restore: true
        });

      if (recycleBinError) throw recycleBinError;

      toast({
        title: "Success",
        description: "Transaction moved to recycle bin",
      });

      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive",
      });
      throw error;
    }
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      const worksheet = XLSX.utils.json_to_sheet(transactions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
      XLSX.writeFile(workbook, `transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Success",
        description: "Transaction data exported successfully",
      });
    } catch (error) {
      console.error('Error exporting transactions:', error);
      toast({
        title: "Error",
        description: "Failed to export transaction data",
        variant: "destructive",
      });
    }
  };

  const getCurrentBalance = () => {
    const balance = transactions.reduce((total, transaction) => {
      if (transaction.status === 'Cleared') {
        return transaction.type === 'Credit' 
          ? total + transaction.amount 
          : total - transaction.amount;
      }
      return total;
    }, 0);
    return balance;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    isLoading,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    exportToExcel,
    getCurrentBalance,
  };
};
