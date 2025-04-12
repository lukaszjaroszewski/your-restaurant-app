
import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DishCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  onAddToCart?: (id: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
  available,
  onAddToCart
}) => {
  const handleAddToCart = () => {
    if (available && onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <div className="dish-card mb-4">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-restaurant-secondary text-white text-xs px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className="font-bold text-restaurant-primary">${price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-3">
          {!available ? (
            <span className="text-gray-500 text-sm italic">Not available for delivery</span>
          ) : (
            <span className="text-gray-500 text-sm">Available</span>
          )}
          
          <button 
            onClick={handleAddToCart}
            disabled={!available}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full",
              available 
                ? "bg-restaurant-primary text-white hover:bg-opacity-90" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
