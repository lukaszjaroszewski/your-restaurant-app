
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the main home page 
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-restaurant-cream">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Loading Restaurant App...</h1>
        <p className="text-xl text-gray-600">Please wait</p>
      </div>
    </div>
  );
};

export default Index;
