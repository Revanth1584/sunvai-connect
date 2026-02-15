import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import ComplaintsList from "./pages/ComplaintsList";
import ComplaintDetail from "./pages/ComplaintDetail";
import VotingPage from "./pages/VotingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommitteePage from "./pages/CommitteePage";
import KnowYourRightsPage from "./pages/KnowYourRightsPage";
import AppLayout from "./components/AppLayout";
import AIAssistant from "./components/AIAssistant";
import SplashScreen from "./components/SplashScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
};

const FloatingAI = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return <AIAssistant />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/submit" element={<ProtectedRoute><SubmitComplaint /></ProtectedRoute>} />
        <Route path="/my-complaints" element={<ProtectedRoute><ComplaintsList /></ProtectedRoute>} />
        <Route path="/all-complaints" element={<ProtectedRoute><ComplaintsList /></ProtectedRoute>} />
        <Route path="/complaint/:id" element={<ProtectedRoute><ComplaintDetail /></ProtectedRoute>} />
        <Route path="/voting" element={<ProtectedRoute><VotingPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/committee" element={<ProtectedRoute><CommitteePage /></ProtectedRoute>} />
        <Route path="/know-your-rights" element={<ProtectedRoute><KnowYourRightsPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingAI />
    </>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SplashScreen show={showSplash} />
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
