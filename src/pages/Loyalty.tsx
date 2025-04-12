
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import { Award, Gift } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from '@/components/ui/sonner';

const Loyalty = () => {
  const [points, setPoints] = useState(0);
  const [nextReward, setNextReward] = useState(10);
  const [rewards, setRewards] = useState<{id: string, name: string, points: number, claimed: boolean}[]>([
    { id: '1', name: '10% off your next order', points: 10, claimed: false },
    { id: '2', name: 'Free dessert', points: 25, claimed: false },
    { id: '3', name: 'Free delivery (5 times)', points: 50, claimed: false },
    { id: '4', name: 'Complimentary bottle of wine', points: 100, claimed: false },
  ]);
  
  useEffect(() => {
    // Simulate loading user loyalty data
    // In a real app, this would come from Firebase
    setPoints(32);
    setRewards(prev => 
      prev.map(reward => ({
        ...reward,
        claimed: reward.points <= 25
      }))
    );
  }, []);
  
  useEffect(() => {
    // Update next reward target based on current points
    const unclaimed = rewards.find(r => !r.claimed);
    if (unclaimed) {
      setNextReward(unclaimed.points);
    }
  }, [rewards]);
  
  const claimReward = (id: string) => {
    // In a real app, this would update in Firebase
    setRewards(prev => 
      prev.map(reward => 
        reward.id === id ? { ...reward, claimed: true } : reward
      )
    );
    
    toast.success('Reward claimed successfully!');
  };
  
  const getProgress = () => {
    return Math.min(100, (points / nextReward) * 100);
  };

  return (
    <>
      <Header title="Loyalty Card" showBack showNotification />
      <Container>
        <div className="space-y-6">
          {/* Loyalty Card */}
          <div className="bg-gradient-to-br from-restaurant-secondary to-restaurant-primary rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-bold mb-1">Loyalty Card</h2>
                <p className="text-white/80 text-sm">Earn points with every purchase</p>
              </div>
              <Award size={32} className="text-white/90" />
            </div>
            
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-1">{points}</div>
              <p className="text-sm text-white/80">Points Balance</p>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to next reward</span>
                <span>{`${points} / ${nextReward} points`}</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* How it works */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">How It Works</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="bg-restaurant-cream text-restaurant-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">1</div>
                <p>Earn 1 point for every $5 spent on orders</p>
              </li>
              <li className="flex items-start">
                <div className="bg-restaurant-cream text-restaurant-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">2</div>
                <p>Collect points to unlock exclusive rewards</p>
              </li>
              <li className="flex items-start">
                <div className="bg-restaurant-cream text-restaurant-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-medium">3</div>
                <p>Redeem rewards directly from the app</p>
              </li>
            </ul>
          </div>
          
          {/* Available Rewards */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Available Rewards</h2>
            <div className="space-y-3">
              {rewards.map(reward => (
                <div 
                  key={reward.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className={`p-2 mr-3 rounded-lg ${reward.claimed ? 'bg-gray-100' : 'bg-restaurant-yellow'}`}>
                      <Gift size={20} className={reward.claimed ? 'text-gray-400' : 'text-restaurant-primary'} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${reward.claimed ? 'text-gray-400' : ''}`}>{reward.name}</h3>
                      <p className="text-sm text-gray-500">{reward.points} points</p>
                    </div>
                  </div>
                  
                  {reward.claimed ? (
                    <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                      Claimed
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant={points >= reward.points ? 'primary' : 'outline'}
                      disabled={points < reward.points}
                      onClick={() => claimReward(reward.id)}
                    >
                      {points >= reward.points ? 'Claim' : `Need ${reward.points - points} more`}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Loyalty;
