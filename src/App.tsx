
import React from 'react';
import './App.css';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Services from './pages/Services';
import NotFound from './pages/NotFound';
import Internships from './pages/Internships';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AboutUs from './pages/AboutUs';
import AISolutions from './pages/AISolutions';
import SaaSDevelopment from './pages/SaaSDevelopment';
import CloudHosting from './pages/CloudHosting';
import Automation from './pages/Automation';
import CustomIntegrations from './pages/CustomIntegrations';
import InnovationLab from './pages/InnovationLab';
import AIResearch from './pages/AIResearch';
import Projects from './pages/Projects';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminDashboard from "@/pages/AdminDashboard";

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
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/ai-solutions" element={<AISolutions />} />
                <Route path="/services/saas-development" element={<SaaSDevelopment />} />
                <Route path="/services/cloud-hosting" element={<CloudHosting />} />
                <Route path="/services/automation" element={<Automation />} />
                <Route path="/services/custom-integrations" element={<CustomIntegrations />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/innovation-lab" element={<InnovationLab />} />
                <Route path="/innovation-lab/ai-research" element={<AIResearch />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
                
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
