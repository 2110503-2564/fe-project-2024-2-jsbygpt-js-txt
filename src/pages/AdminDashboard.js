import React, { useState, useEffect } from 'react';
import { getAllBookings, getProviders, updateBooking, deleteBooking } from '../services/bookingService';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
    setProviders(getProviders());
  }, []);

  const loadBookings = () => {
    try {
      const allBookings = getAllBookings();
      setBookings(allBookings);
    } catch (error) {
      setError('Error loading bookings');
    }
  };

  const handleEditBooking = (updatedBooking) => {
    try {
      const updated = updateBooking(editingBooking.id, updatedBooking);
      setBookings(bookings.map(booking => 
        booking.id === updated.id ? updated : booking
      ));
      setEditingBooking(null);
      setShowForm(false);
      setError('');
    } catch (error) {
      setError('Error updating booking');
    }
  };

  const handleDeleteBooking = (id) => {
    try {
      deleteBooking(id);
      setBookings(bookings.filter(booking => booking.id !== id));
      setError('');
    } catch (error) {
      setError('Error deleting booking');
    }
  };

  const startEditing = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  return (
    <div>
      <h2>Admin Dashboard - All Bookings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
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
      
      <BookingList 
        bookings={bookings}
        providers={providers}
        onEdit={startEditing}
        onDelete={handleDeleteBooking}
        showUser={true}
      />
    </div>
  );
};

export default AdminDashboard;