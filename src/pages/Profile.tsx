
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, User, Settings, LogOut } from 'lucide-react';

// Mock order history
const orderHistory = [
  {
    id: 'ORD12345',
    date: '2023-03-15',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { name: 'Tiramisu', quantity: 1, price: 7.99 }
    ],
    status: 'Delivered',
    total: 22.98
  },
  {
    id: 'ORD12346',
    date: '2023-03-10',
    items: [
      { name: 'Fettuccine Alfredo', quantity: 1, price: 16.99 },
      { name: 'Bruschetta', quantity: 1, price: 8.99 }
    ],
    status: 'Delivered',
    total: 25.98
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  const [userDetails, setUserDetails] = useState({
    name: 'Demo User',
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA'
  });
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    reminders: true
  });
  
  const handleLogout = () => {
    // In a real app, this would clear Firebase Auth session
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  const handleSaveDetails = () => {
    // In a real app, this would update Firebase Auth/Firestore
    setEditing(false);
    toast.success('Profile updated successfully');
  };
  
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  return (
    <>
      <Header title="Profile" showNotification />
      <Container>
        <div className="mb-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-restaurant-cream rounded-full flex items-center justify-center mb-3">
            <User size={32} className="text-restaurant-primary" />
          </div>
          <h2 className="text-xl font-semibold">{userDetails.name}</h2>
          <p className="text-gray-500 text-sm">{userDetails.email}</p>
        </div>
        
        <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="history" className="flex flex-col gap-1 py-2">
              <ClipboardList size={18} />
              <span className="text-xs">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex flex-col gap-1 py-2">
              <User size={18} />
              <span className="text-xs">Details</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col gap-1 py-2">
              <Settings size={18} />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-restaurant-secondary text-white px-4 py-2 flex justify-between">
                      <span>Order #{order.id}</span>
                      <span>{order.date}</span>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between font-semibold border-t border-gray-100 pt-2">
                        <span>Total</span>
                        <span className="text-restaurant-primary">${order.total.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center">
                <ClipboardList size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="font-medium mb-1">No orders yet</h3>
                <p className="text-gray-500 text-sm mb-4">Your order history will appear here</p>
                <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details" className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <Button 
                size="sm" 
                variant={editing ? 'primary' : 'outline'}
                onClick={() => editing ? handleSaveDetails() : setEditing(true)}
              >
                {editing ? 'Save' : 'Edit'}
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{userDetails.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{userDetails.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{userDetails.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Delivery Address
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={userDetails.address}
                    onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{userDetails.address}</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            
            <div className="space-y-5">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-medium mb-3">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Order Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.orders}
                        onChange={() => handleNotificationToggle('orders')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-restaurant-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Promotions & Offers</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.promotions}
                        onChange={() => handleNotificationToggle('promotions')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-restaurant-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Reservation Reminders</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifications.reminders}
                        onChange={() => handleNotificationToggle('reminders')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-restaurant-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-medium mb-3">Privacy & Security</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => toast.info('Password reset would be initiated here')}
                  >
                    Change Password
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => toast.info('This would log you out from all devices')}
                  >
                    Log Out from All Devices
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => toast.info('Account deletion process would start here')}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                fullWidth 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Log Out
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
};

export default Profile;
