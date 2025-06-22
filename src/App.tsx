import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import NotFoundError from './pages/NotFoundError';
import Unauthorized from './pages/Unauthorized';
import Internships from './pages/Internships';
import Joblistings from './pages/Joblistings';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScheduledCalls from './pages/ScheduledCalls';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import ApplicationForm from './pages/ApplicationForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/joblistings" element={<Joblistings />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFoundError />} />
                <Route path="/application-form/:jobId" element={<ApplicationForm />} />

                {/* Protected routes - User */}
                <Route 
                  path="/scheduled-calls" 
                  element={
                    <ProtectedRoute>
                      <ScheduledCalls />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/overview" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/interns" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/employees" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/banking" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/scheduled-calls" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/contact-messages" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/jobs" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/salary" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/support" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/recycle-bin" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/manage-admins" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/profile" 
                  element={
                    <ProtectedRoute requiredRole="super_admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
