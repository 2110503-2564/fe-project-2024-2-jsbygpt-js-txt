'use client';

import { useState, useEffect } from 'react';
import { Provider, Booking } from '@/services/bookingService';

interface BookingFormProps {
  providers: Provider[];
  onSubmit: (booking: { date: string; providerId: number }) => void;
  booking?: Booking | null;
  onCancel: () => void;
}

export default function BookingForm({ providers, onSubmit, booking, onCancel }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [providerId, setProviderId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking) {
      setDate(booking.date);
      setProviderId(booking.providerId.toString());
    }
  }, [booking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!date || !providerId) {
      setError('All fields are required');
      return;
    }
    
    const bookingData = {
      date,
      providerId: parseInt(providerId, 10)
    };
    
    onSubmit(bookingData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg mb-6 transition-colors duration-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white py-3 px-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">{booking ? 'Edit Booking' : 'New Car Booking'}</h3>
      </div>
      
      <div className="p-6 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-lg">
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 mb-4 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rental Date
            </label>
            <input 
              type="date" 
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              min={new Date().toISOString().split('T')[0]}
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Car Rental Provider
            </label>
            <select 
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
              value={providerId} 
              onChange={(e) => setProviderId(e.target.value)} 
              required
            >
              <option value="">Select a provider</option>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.address}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {booking ? 'Update' : 'Book'} Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}