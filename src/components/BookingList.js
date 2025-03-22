import React from 'react';

const BookingList = ({ bookings, providers, onEdit, onDelete, showUser = false }) => {
  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  const getProviderName = (providerId) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? provider.name : 'Unknown provider';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {showUser && <th>User</th>}
            <th>Date</th>
            <th>Provider</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              {showUser && <td>{booking.userName}</td>}
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{getProviderName(booking.providerId)}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary me-2" 
                  onClick={() => onEdit(booking)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this booking?')) {
                      onDelete(booking.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;