
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in
    // In a real app, this would check Firebase Auth state
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  // Wrap authenticated routes
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    // Still loading auth state
    if (isAuthenticated === null) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    
    // Not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    // Authenticated, render children
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto min-h-screen bg-restaurant-cream">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Main App Routes */}
              <Route path="/" element={
                <AuthRoute>
                  <>
                    <Home />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              <Route path="/menu" element={
                <AuthRoute>
                  <>
                    <Menu />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              <Route path="/cart" element={
                <AuthRoute>
                  <>
                    <Cart />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              <Route path="/loyalty" element={
                <AuthRoute>
                  <>
                    <Loyalty />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              <Route path="/book" element={
                <AuthRoute>
                  <>
                    <Book />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              <Route path="/profile" element={
                <AuthRoute>
                  <>
                    <Profile />
                    <BottomNavigation />
                  </>
                </AuthRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
