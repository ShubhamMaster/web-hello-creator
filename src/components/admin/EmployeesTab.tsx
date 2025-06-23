
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEmployees, Employee, EmployeeInsert } from '@/hooks/useEmployees';
import { Search, Plus, Download, Edit, Trash2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';

const EmployeesTab = () => {
  const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee, exportToExcel, fetchEmployees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EmployeeInsert>();

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'];
  const employmentTypes = ['Full-Time', 'Part-Time', 'Contract'] as const;
  const workStatuses = ['Active', 'On Leave', 'Terminated'] as const;

  const handleSearch = () => {
    fetchEmployees({ 
      search: searchTerm, 
      department: departmentFilter,
      work_status: statusFilter 
    });
  };

  const handleCreateEmployee = async (data: EmployeeInsert) => {
    try {
      await createEmployee(data);
      setIsCreateDialogOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleEditEmployee = async (data: EmployeeInsert) => {
    if (!selectedEmployee) return;
    
    try {
      await updateEmployee(selectedEmployee.id, data);
      setIsEditDialogOpen(false);
      setSelectedEmployee(null);
      reset();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    // Populate form with employee data
    Object.keys(employee).forEach(key => {
      const value = employee[key as keyof Employee];
      setValue(key as keyof EmployeeInsert, value as any);
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(employee.id, employee);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Terminated': 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <div className="flex gap-2">
          <Button onClick={exportToExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleCreateEmployee)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input {...register('full_name', { required: 'Full name is required' })} />
                    {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input type="email" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input {...register('phone_number')} />
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input type="date" {...register('date_of_birth')} />
                  </div>
                  <div>
                    <Label htmlFor="role_designation">Role/Designation *</Label>
                    <Input {...register('role_designation', { required: 'Role is required' })} />
                    {errors.role_designation && <p className="text-red-500 text-sm">{errors.role_designation.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Select onValueChange={(value) => setValue('department', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date_of_joining">Date of Joining *</Label>
                    <Input type="date" {...register('date_of_joining', { required: 'Date of joining is required' })} />
                    {errors.date_of_joining && <p className="text-red-500 text-sm">{errors.date_of_joining.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="employment_type">Employment Type</Label>
                    <Select onValueChange={(value) => setValue('employment_type', value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input type="number" step="0.01" {...register('salary')} />
                  </div>
                  <div>
                    <Label htmlFor="supervisor">Supervisor</Label>
                    <Input {...register('supervisor')} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea {...register('address')} />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact</Label>
                    <Input {...register('emergency_contact')} />
                  </div>
                  <div>
                    <Label htmlFor="emergency_phone">Emergency Phone</Label>
                    <Input {...register('emergency_phone')} />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Employee</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                {workStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({employees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-mono">{employee.employee_id}</TableCell>
                  <TableCell>{employee.full_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.role_designation}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(employee.work_status)}>
                      {employee.work_status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(employee.date_of_joining).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openViewDialog(employee)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(employee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEmployee(employee)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEditEmployee)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input {...register('full_name', { required: 'Full name is required' })} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input type="email" {...register('email', { required: 'Email is required' })} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Employee</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Employee ID</Label>
                  <p className="font-mono">{selectedEmployee.employee_id}</p>
                </div>
                <div>
                  <Label className="font-medium">Full Name</Label>
                  <p>{selectedEmployee.full_name}</p>
                </div>
                <div>
                  <Label className="font-medium">Email</Label>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div>
                  <Label className="font-medium">Department</Label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="font-medium">Role</Label>
                  <p>{selectedEmployee.role_designation}</p>
                </div>
                <div>
                  <Label className="font-medium">Status</Label>
                  <Badge className={getStatusBadge(selectedEmployee.work_status)}>
                    {selectedEmployee.work_status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesTab;
