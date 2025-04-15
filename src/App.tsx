
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Loyalty from "./pages/Loyalty";
import Book from "./pages/Book";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Layout Components
import BottomNavigation from "./components/layout/BottomNavigation";

const queryClient = new QueryClient();

const AuthRoutes = () => {
  const { currentUser, loading } = useAuth();
  
  // Still loading auth state
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Authenticated, render routes with auth protection
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="/forgot-password" element={currentUser ? <Navigate to="/" replace /> : <ForgotPassword />} />
      
      {/* Main App Routes - Protected */}
      <Route path="/" element={
        currentUser ? (
          <>
            <Home />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      <Route path="/menu" element={
        currentUser ? (
          <>
            <Menu />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      <Route path="/cart" element={
        currentUser ? (
          <>
            <Cart />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      <Route path="/loyalty" element={
        currentUser ? (
          <>
            <Loyalty />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      <Route path="/book" element={
        currentUser ? (
          <>
            <Book />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      <Route path="/profile" element={
        currentUser ? (
          <>
            <Profile />
            <BottomNavigation />
          </>
        ) : <Navigate to="/login" replace />
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-restaurant-cream">
              <AuthRoutes />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
