import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  
  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  const handleQuantityChange = (id: string, change: number) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    updateCart(newCart);
  };
  
  const handleRemoveItem = (id: string) => {
    const newCart = cartItems.filter(item => item.id !== id);
    updateCart(newCart);
    toast.success('Item removed from cart');
  };
  
  const handleCheckout = () => {
    if (deliveryOption === 'delivery' && !address) {
      toast.error('Please enter your delivery address');
      return;
    }
    
    setLoading(true);
    
    // Simulate processing order
    setTimeout(() => {
      updateCart([]);
      setLoading(false);
      toast.success('Order placed successfully!');
      navigate('/');
    }, 1500);
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOption === 'delivery' ? 3.99 : 0;
  const total = subtotal + deliveryFee;
  
  if (cartItems.length === 0) {
    return (
      <>
        <Header title="Your Order" />
        <Container className="flex flex-col items-center justify-center h-[70vh]">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 text-center">Add items from our menu to start your order</p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header title="Your Order" />
      <Container>
        <div className="space-y-6">
          {/* Order Items */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Order Items</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md mr-3"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-restaurant-primary font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 w-5 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Delivery Options */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Delivery Options</h2>
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-1 py-3 rounded-lg border ${
                  deliveryOption === 'delivery'
                    ? 'border-restaurant-primary bg-restaurant-primary bg-opacity-10'
                    : 'border-gray-300'
                }`}
                onClick={() => setDeliveryOption('delivery')}
              >
                <span className={deliveryOption === 'delivery' ? 'text-restaurant-primary font-medium' : ''}>
                  Delivery
                </span>
              </button>
              
              <button
                className={`flex-1 py-3 rounded-lg border ${
                  deliveryOption === 'pickup'
                    ? 'border-restaurant-primary bg-restaurant-primary bg-opacity-10'
                    : 'border-gray-300'
                }`}
                onClick={() => setDeliveryOption('pickup')}
              >
                <span className={deliveryOption === 'pickup' ? 'text-restaurant-primary font-medium' : ''}>
                  Pickup
                </span>
              </button>
            </div>
            
            {deliveryOption === 'delivery' && (
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
            )}
            
            {deliveryOption === 'pickup' && (
              <p className="text-sm text-gray-600">
                Pick up your order at: 123 Gourmet Street, Foodie City
              </p>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{deliveryOption === 'delivery' ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span>
              </div>
              
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-restaurant-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Checkout Button */}
          <Button 
            fullWidth 
            size="lg" 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Cart;
