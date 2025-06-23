
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  role_designation: string;
  department: string;
  date_of_joining: string;
  employment_type: 'Full-Time' | 'Part-Time' | 'Contract';
  salary?: number;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  education_certifications?: string;
  work_status: 'Active' | 'On Leave' | 'Terminated';
  resume_url?: string;
  supervisor?: string;
  profile_image_url?: string;
  account_number?: string;
  ifsc_code?: string;
  upi_id?: string;
  date_of_exit?: string;
  exit_reason?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  is_deleted?: boolean;
  deleted_at?: string;
}

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmployees = async (filters?: { 
    department?: string; 
    work_status?: string; 
    search?: string;
  }) => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('employees')
        .select('*')
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (filters?.department) {
        query = query.eq('department', filters.department);
      }
      
      if (filters?.work_status) {
        query = query.eq('work_status', filters.work_status);
      }

      if (filters?.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,employee_id.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'employee_id' | 'created_at' | 'updated_at' | 'is_deleted' | 'deleted_at'>) => {
    try {
      // Generate employee ID
      const currentYear = new Date().getFullYear();
      const { data: employeeId, error: idError } = await supabase.rpc('generate_employee_id', { year: currentYear });
      
      if (idError) throw idError;

      const { data, error } = await supabase
        .from('employees')
        .insert([{
          ...employeeData,
          employee_id: employeeId
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee created successfully",
      });

      fetchEmployees();
      return data;
    } catch (error) {
      console.error('Error creating employee:', error);
      toast({
        title: "Error",
        description: "Failed to create employee",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Employee updated successfully",
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteEmployee = async (id: string, employeeData: Employee) => {
    try {
      // Soft delete
      const { error: updateError } = await supabase
        .from('employees')
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
          original_table: 'employees',
          original_id: id,
          data: employeeData,
          can_restore: true
        });

      if (recycleBinError) throw recycleBinError;

      toast({
        title: "Success",
        description: "Employee moved to recycle bin",
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive",
      });
      throw error;
    }
  };

  const exportToExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      const worksheet = XLSX.utils.json_to_sheet(employees);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      XLSX.writeFile(workbook, `employees_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Success",
        description: "Employee data exported successfully",
      });
    } catch (error) {
      console.error('Error exporting employees:', error);
      toast({
        title: "Error",
        description: "Failed to export employee data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    isLoading,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    exportToExcel,
  };
};
