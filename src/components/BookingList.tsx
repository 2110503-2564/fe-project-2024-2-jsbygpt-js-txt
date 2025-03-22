'use client';

import { Booking, Provider } from '@/services/bookingService';

interface BookingListProps {
  bookings: Booking[];
  providers: Provider[];
  onEdit: (booking: Booking) => void;
  onDelete: (id: number) => void;
  showUser?: boolean;
}

export default function BookingList({ 
  bookings, 
  providers, 
  onEdit, 
  onDelete, 
  showUser = false 
}: BookingListProps) {
  // Empty state
  if (bookings.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-lg text-center transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <p className="text-gray-500 dark:text-gray-400 text-lg">No bookings found.</p>
        <p className="text-gray-400 dark:text-gray-500 mt-2">Make a booking to get started.</p>
      </div>
    );
  }

  const getProviderName = (providerId: number): string => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.name : 'Unknown provider';
  };

  const getProviderAddress = (providerId: number): string => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.address : 'Unknown location';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div key={booking.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
          <div className="p-5">
            {showUser && (
              <div className="mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Customer:</span>
                <h4 className="text-gray-900 dark:text-gray-100 font-medium">{booking.userName}</h4>
              </div>
            )}
            
            <div className="mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Date:</span>
              <div className="text-gray-900 dark:text-gray-100 font-medium">
                {formatDate(booking.date)}
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">Provider:</span>
              <div className="text-gray-900 dark:text-gray-100 font-medium">
                {getProviderName(booking.providerId)}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {getProviderAddress(booking.providerId)}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                onClick={() => onEdit(booking)}
                className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this booking?')) {
                    onDelete(booking.id);
                  }
                }}
                className="px-3 py-1 text-sm text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}