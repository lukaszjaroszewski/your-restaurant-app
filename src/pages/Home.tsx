
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { MapPin, Clock, Phone, Utensils as MenuIcon } from 'lucide-react';

// Simulated restaurant data
const restaurantInfo = {
  name: "La Bella Cucina",
  description: "La Bella Cucina brings the authentic flavors of Italy to your table. Our recipes are crafted with passion, using only the finest, fresh ingredients to deliver an unforgettable dining experience. From handmade pasta to wood-fired pizzas, every dish tells a story of tradition and innovation.",
  address: "123 Gourmet Street, Foodie City",
  phone: "+1 (555) 123-4567",
  hours: {
    weekdays: "11:00 AM - 10:00 PM",
    weekends: "10:00 AM - 11:00 PM"
  },
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  ],
  specialties: ["Handmade Pasta", "Wood-fired Pizza", "Tiramisu", "Fine Italian Wines"]
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header title={restaurantInfo.name} showNotification />
      <Container>
        <div className="space-y-6 animate-fade-in">
          {/* Hero Image */}
          <div className="relative w-full h-48 overflow-hidden rounded-xl">
            <img 
              src={restaurantInfo.images[0]} 
              alt={restaurantInfo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <h2 className="text-white text-xl font-bold">Welcome to {restaurantInfo.name}</h2>
              <p className="text-white text-sm">Authentic Italian Cuisine</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <Clock className="text-restaurant-primary mb-2" size={24} />
              <h3 className="font-medium text-sm mb-1">Hours</h3>
              <p className="text-xs text-center text-gray-600">
                Mon-Fri: {restaurantInfo.hours.weekdays}<br />
                Sat-Sun: {restaurantInfo.hours.weekends}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <MapPin className="text-restaurant-primary mb-2" size={24} />
              <h3 className="font-medium text-sm mb-1">Location</h3>
              <p className="text-xs text-center text-gray-600">{restaurantInfo.address}</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <Phone className="text-restaurant-primary mb-2" size={24} />
              <h3 className="font-medium text-sm mb-1">Contact</h3>
              <p className="text-xs text-center text-gray-600">{restaurantInfo.phone}</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <MenuIcon className="text-restaurant-primary mb-2" size={24} />
              <h3 className="font-medium text-sm mb-1">Menu</h3>
              <Button 
                size="sm" 
                onClick={() => navigate('/menu')} 
                className="mt-1"
              >
                View Menu
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">About Us</h2>
            <p className="text-gray-700 text-sm mb-4">
              {restaurantInfo.description}
            </p>
            
            <h3 className="font-medium mb-2">Our Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {restaurantInfo.specialties.map((specialty, index) => (
                <span 
                  key={index} 
                  className="bg-restaurant-yellow px-3 py-1 rounded-full text-xs font-medium text-restaurant-secondary"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {restaurantInfo.images.map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${restaurantInfo.name} Gallery ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 pt-4">
            <Button 
              fullWidth 
              onClick={() => navigate('/book')}
            >
              Book a Table
            </Button>
            <Button 
              variant="outline" 
              fullWidth 
              onClick={() => navigate('/menu')}
            >
              Order Now
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
