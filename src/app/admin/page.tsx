'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import BookingList from '@/components/BookingList';
import { getAllBookings, getProviders, updateBooking, deleteBooking, Booking, Provider } from '@/services/bookingService';
import Providers from '@/components/Providers';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      router.push('/login');
      return;
    }

    loadBookings();
    setProviders(getProviders());
  }, [currentUser, router]);

  const loadBookings = () => {
    try {
      const allBookings = getAllBookings();
      setBookings(allBookings);
    } catch (error) {
      setError('Error loading bookings');
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

  const filteredBookings = searchTerm 
    ? bookings.filter(booking => 
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(booking.date).toLocaleDateString().includes(searchTerm)
      )
    : bookings;

  if (!currentUser || !currentUser.isAdmin) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <Providers>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
              Total Bookings: {bookings.length}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}
          
          {showForm && (
            <BookingForm 
              providers={providers}
              onSubmit={handleEditBooking}
              booking={editingBooking}
              onCancel={() => {
                setShowForm(false);
                setEditingBooking(null);
              }}
            />
          )}
          
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by customer name or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">All Bookings</h2>
          <BookingList 
            bookings={filteredBookings}
            providers={providers}
            onEdit={startEditing}
            onDelete={handleDeleteBooking}
            showUser={true}
          />
        </div>
      </div>
    </Providers>
  );
}