import React, { useState, useEffect } from 'react';

const BookingForm = ({ providers, onSubmit, booking = null, onCancel }) => {
  const [date, setDate] = useState('');
  const [providerId, setProviderId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking) {
      setDate(booking.date);
      setProviderId(booking.providerId.toString());
    }
  }, [booking]);

  const handleSubmit = (e) => {
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
    <div className="card mb-4">
      <div className="card-header">
        {booking ? 'Edit Booking' : 'Add New Booking'}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input 
              type="date" 
              className="form-control" 
              id="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              min={new Date().toISOString().split('T')[0]}
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="provider" className="form-label">Car Rental Provider</label>
            <select 
              className="form-select" 
              id="provider" 
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
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {booking ? 'Update' : 'Book'} Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;