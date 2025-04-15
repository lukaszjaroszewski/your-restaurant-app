import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, User, Settings, LogOut } from 'lucide-react';
import { signOut } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setCurrentUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="My Profile" />
      <Container>
        <div className="mb-8 mt-4 flex items-center">
          <div className="h-16 w-16 rounded-full bg-restaurant-secondary flex items-center justify-center text-white text-2xl font-bold">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">{currentUser?.name || 'User'}</h2>
            <p className="text-gray-600">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8 h-36">
            <TabsTrigger value="orders" className="flex flex-col items-center">
              <ClipboardList className="h-5 w-5 mb-1" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="details" className="flex flex-col items-center">
              <User className="h-5 w-5 mb-1" />
              Details
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center">
              <Settings className="h-5 w-5 mb-1" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders">
            <p>Your order history will be displayed here.</p>
          </TabsContent>
          <TabsContent value="details">
            <p>Your profile details can be edited here.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p>Account settings and preferences.</p>
          </TabsContent>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="lg" 
          fullWidth 
          className="mt-8 flex items-center justify-center gap-2"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="h-5 w-5" />
          {loading ? 'Logging out...' : 'Log Out'}
        </Button>
      </Container>
    </div>
  );
};

export default Profile;
