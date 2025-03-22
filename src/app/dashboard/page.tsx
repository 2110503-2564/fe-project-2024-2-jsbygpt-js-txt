'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import BookingList from '@/components/BookingList';
import { getUserBookings, getProviders, createBooking, updateBooking, deleteBooking, Booking, Provider } from '@/services/bookingService';
import Providers from '@/components/Providers';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    loadBookings();
    setProviders(getProviders());
  }, [currentUser, router]);

  const loadBookings = () => {
    if (!currentUser) return;
    
    try {
      const userBookings = getUserBookings(currentUser.id);
      setBookings(userBookings);
    } catch (error) {
      setError('Error loading bookings');
    }
  };

  const handleAddBooking = (booking: { date: string; providerId: number }) => {
    if (!currentUser) return;
    
    try {
      if (bookings.length >= 3) {
        setError('You can only book up to 3 cars');
        return;
      }
      
      const newBooking = createBooking({
        ...booking,
        userId: currentUser.id,
        userName: currentUser.name
      });
      
      setBookings([...bookings, newBooking]);
      setShowForm(false);
      setError('');
    } catch (error: any) {
      setError(error.message || 'Error creating booking');
    }
  };

  const handleEditBooking = (updatedBooking: { date: string; providerId: number }) => {
    if (!editingBooking) return;
    
    try {
      const updated = updateBooking(editingBooking.id, updatedBooking);
      setBookings(bookings.map(booking => 
        booking.id === updated.id ? updated : booking
      ));
      setEditingBooking(null);
      setShowForm(false);
      setError('');
    } catch (error: any) {
      setError(error.message || 'Error updating booking');
    }
  };

  const handleDeleteBooking = (id: number) => {
    try {
      deleteBooking(id);
      setBookings(bookings.filter(booking => booking.id !== id));
      setError('');
    } catch (error: any) {
      setError(error.message || 'Error deleting booking');
    }
  };

  const startEditing = (booking: Booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  if (!currentUser) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Providers>
      <div className="max-w-4xl mx-auto">
        {/* Main Dashboard Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Car Rentals</h1>
            <div className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full">
              {bookings.length} / 3 Bookings
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6 rounded">
              {error}
            </div>
          )}
          
          {!showForm ? (
            <div className="mb-8">
              <button 
                className={`px-4 py-2 rounded-md text-white font-medium flex items-center ${
                  bookings.length >= 3 
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300'
                }`}
                onClick={() => setShowForm(true)}
                disabled={bookings.length >= 3}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Book New Car
              </button>
              {bookings.length >= 3 && 
                <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                  You have reached the maximum number of bookings (3)
                </p>
              }
            </div>
          ) : (
            <BookingForm 
              providers={providers}
              onSubmit={editingBooking ? handleEditBooking : handleAddBooking}
              booking={editingBooking}
              onCancel={() => {
                setShowForm(false);
                setEditingBooking(null);
              }}
            />
          )}
        </div>
        
        {/* Bookings List Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Your Current Bookings
          </h2>
          <BookingList 
            bookings={bookings}
            providers={providers}
            onEdit={startEditing}
            onDelete={handleDeleteBooking}
          />
        </div>
      </div>
    </Providers>
  );
}