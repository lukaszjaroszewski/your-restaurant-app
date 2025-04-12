import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import DishCard from '@/components/common/DishCard';
import { toast } from 'sonner';

// Sample menu data
const menuCategories = [
  'All', 'Starters', 'Main Course', 'Desserts', 'Beverages'
];

const menuItems = [
  {
    id: '1',
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with tomatoes, olive oil, salt and pepper.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Starters',
    available: true
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, and olive oil.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Main Course',
    available: true
  },
  {
    id: '3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert made of coffee-soaked ladyfingers and mascarpone cream.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Desserts',
    available: true
  },
  {
    id: '4',
    name: 'Draught Beer',
    description: 'Fresh draught beer from local brewery.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Beverages',
    available: false
  },
  {
    id: '5',
    name: 'Fettuccine Alfredo',
    description: 'Fettuccine pasta tossed with butter and parmesan cheese.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Main Course',
    available: true
  },
  {
    id: '6',
    name: 'Caprese Salad',
    description: 'Sliced mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d58e4c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
    category: 'Starters',
    available: true
  },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const handleAddToCart = (id: string) => {
    // In a real app, this would add the item to a cart state or context
    const item = menuItems.find(item => item.id === id);
    if (item) {
      toast.success(`Added ${item.name} to cart`);
      // Update cart in localStorage for demo purposes
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const itemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === id);
      
      if (itemIndex >= 0) {
        existingCart[itemIndex].quantity += 1;
      } else {
        existingCart.push({ ...item, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
  };
  
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Header title="Menu" showBack showNotification />
      <Container>
        {/* Category filters */}
        <div className="pb-4 mb-4 overflow-x-auto">
          <div className="flex space-x-2 w-max">
            {menuCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-restaurant-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu items */}
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => (
            <DishCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              available={item.available}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No items found in this category</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Menu;
