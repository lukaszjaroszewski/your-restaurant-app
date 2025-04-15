
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, Award, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: Utensils },
    { path: '/cart', label: 'Order', icon: ShoppingCart },
    { path: '/loyalty', label: 'Loyalty', icon: Award },
    { path: '/book', label: 'Book', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl z-10">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "nav-icon w-16 pt-2 pb-1",
              currentPath === item.path ? "active" : "text-gray-500"
            )}
          >
            <item.icon size={24} className="mb-1" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
