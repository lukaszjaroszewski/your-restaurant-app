import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', 
  '1:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
];

const tables = [
  { id: 1, seats: 2, position: { x: 10, y: 10 }, available: true },
  { id: 2, seats: 2, position: { x: 10, y: 70 }, available: true },
  { id: 3, seats: 4, position: { x: 70, y: 10 }, available: true },
  { id: 4, seats: 4, position: { x: 70, y: 70 }, available: false },
  { id: 5, seats: 6, position: { x: 130, y: 40 }, available: true },
  { id: 6, seats: 8, position: { x: 200, y: 20 }, available: false },
];

const Book = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleTableSelect = (tableId: number) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.available) {
      setSelectedTable(tableId);
    }
  };
  
  const handleNext = () => {
    if (step === 1 && (!date || !selectedTime)) {
      toast.error('Please select a date and time');
      return;
    }
    
    if (step === 2 && selectedTable === null) {
      toast.error('Please select a table');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = () => {
    if (!date || !selectedTime || selectedTable === null) {
      toast.error('Please complete all reservation details');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Table booked successfully!');
      
      // Reset form
      setStep(1);
      setSelectedTable(null);
      setSelectedTime(null);
      setGuests(2);
    }, 1500);
  };

  return (
    <>
      <Header title="Book a Table" />
      <Container>
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex justify-between mb-6">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    step === stepNumber 
                      ? 'bg-restaurant-primary text-white'
                      : step > stepNumber
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs text-gray-500">
                  {stepNumber === 1 ? 'Date & Time' : stepNumber === 2 ? 'Select Table' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold mb-4">Choose Date & Time</h2>
              
              <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="mx-auto"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </div>
              
              <h3 className="font-medium mb-3">Available Times</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 text-sm rounded-lg border ${
                      selectedTime === time
                        ? 'border-restaurant-primary bg-restaurant-primary text-white'
                        : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              <h3 className="font-medium mb-3">Number of Guests</h3>
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex justify-between items-center">
                <span>Guests</span>
                <div className="flex items-center">
                  <button 
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </button>
                  <span className="mx-4 font-medium">{guests}</span>
                  <button 
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Table Selection */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold mb-4">Select a Table</h2>
              
              <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                <div className="relative w-full h-60 border border-gray-200 rounded-lg bg-gray-50 mb-4">
                  {/* Restaurant layout */}
                  <div className="absolute left-1/2 top-0 w-20 h-8 bg-gray-300 -translate-x-1/2 flex items-center justify-center text-xs font-medium">
                    Entrance
                  </div>
                  
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      style={{
                        left: `${table.position.x}px`,
                        top: `${table.position.y}px`,
                      }}
                      className={`absolute w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer ${
                        !table.available
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : selectedTable === table.id
                            ? 'bg-restaurant-primary text-white'
                            : 'bg-white border border-gray-300 hover:border-restaurant-primary'
                      }`}
                      onClick={() => table.available && handleTableSelect(table.id)}
                    >
                      <div className="text-center">
                        <div className="font-medium">Table {table.id}</div>
                        <div className="text-xs">{table.seats} seats</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-restaurant-primary rounded mr-2"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>
              
              {selectedTable && (
                <div className="bg-restaurant-cream rounded-xl p-4 border border-restaurant-yellow">
                  <h3 className="font-medium mb-2">Selected Table</h3>
                  <p>Table {selectedTable} - {tables.find(t => t.id === selectedTable)?.seats} seats</p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold mb-4">Confirm Your Reservation</h2>
              
              <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
                <h3 className="font-medium border-b pb-2 mb-3">Reservation Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium">{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Table</span>
                    <span className="font-medium">Table {selectedTable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium">{guests} people</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-restaurant-cream rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Note: A confirmation email will be sent to you after booking. Please arrive 15 minutes before your reservation time.
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <Button 
                variant="outline" 
                fullWidth 
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            
            <Button 
              fullWidth 
              onClick={handleNext}
              disabled={loading}
            >
              {loading 
                ? 'Processing...' 
                : step === 3 
                  ? 'Confirm Booking' 
                  : 'Continue'
              }
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Book;
