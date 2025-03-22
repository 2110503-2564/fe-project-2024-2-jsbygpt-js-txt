import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getUserBookings, getProviders, createBooking, updateBooking, deleteBooking } from '../services/bookingService';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      loadBookings();
      setProviders(getProviders());
    }
  }, [currentUser]);

  const loadBookings = () => {
    try {
      const userBookings = getUserBookings(currentUser.id);
      setBookings(userBookings);
    } catch (error) {
      setError('Error loading bookings');
    }
  };

  const handleAddBooking = (booking) => {
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
    } catch (error) {
      setError(error.message || 'Error creating booking');
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
      <h2>Your Bookings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!showForm ? (
        <div className="mb-3">
          <button 
            className="btn btn-primary" 
            onClick={() => setShowForm(true)}
            disabled={bookings.length >= 3}
          >
            Add New Booking
          </button>
          {bookings.length >= 3 && 
            <small className="text-danger d-block mt-1">
              You have reached the maximum number of bookings (3)
            </small>
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
      
      <BookingList 
        bookings={bookings}
        providers={providers}
        onEdit={startEditing}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
};

export default Dashboard;