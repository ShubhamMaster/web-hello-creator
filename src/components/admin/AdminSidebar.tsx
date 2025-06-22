
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  DollarSign, 
  HelpCircle, 
  Trash2, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggle, activeTab }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      href: '/admin/overview'
    },
    {
      key: 'interns',
      label: 'Interns',
      icon: UserCheck,
      href: '/admin/interns'
    },
    {
      key: 'employees',
      label: 'Employees',
      icon: Users,
      href: '/admin/employees'
    },
    {
      key: 'banking',
      label: 'Banking Ledger',
      icon: CreditCard,
      href: '/admin/banking'
    },
    {
      key: 'scheduled-calls',
      label: 'Scheduled Calls',
      icon: Calendar,
      href: '/admin/scheduled-calls'
    },
    {
      key: 'contact-messages',
      label: 'Contact Messages',
      icon: MessageSquare,
      href: '/admin/contact-messages'
    },
    {
      key: 'jobs',
      label: 'Job Management',
      icon: Briefcase,
      href: '/admin/jobs'
    },
    {
      key: 'salary',
      label: 'Salary Inquiries',
      icon: DollarSign,
      href: '/admin/salary'
    },
    {
      key: 'support',
      label: 'Technical Support',
      icon: HelpCircle,
      href: '/admin/support'
    },
    {
      key: 'recycle-bin',
      label: 'Recycle Bin',
      icon: Trash2,
      href: '/admin/recycle-bin'
    },
    {
      key: 'manage-admins',
      label: 'Manage Admins',
      icon: Settings,
      href: '/admin/manage-admins'
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: User,
      href: '/admin/profile'
    }
  ];

  return (
    <div className={cn(
      "fixed left-0 top-20 h-[calc(100vh-80px)] bg-card border-r transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            
            return (
              <Link key={item.key} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-4",
                    isActive && "bg-primary/10 text-primary"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
