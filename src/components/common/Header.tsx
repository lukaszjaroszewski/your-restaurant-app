
import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false,
  showNotification = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-3 p-1"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        {showNotification && (
          <button className="p-2">
            <Bell size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
