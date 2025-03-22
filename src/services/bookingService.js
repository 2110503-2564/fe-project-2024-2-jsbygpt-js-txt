// Initialize some sample rental car providers
const initializeProviders = () => {
  const providers = [
    {
      id: 1,
      name: 'ABC Car Rental',
      address: '123 Main St, City',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'XYZ Auto Hire',
      address: '456 Oak Ave, Town',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Fast & Easy Rentals',
      address: '789 Pine Blvd, Village',
      phone: '555-123-4567',
    },
  ];
  
  if (!localStorage.getItem('providers')) {
    localStorage.setItem('providers', JSON.stringify(providers));
  }
};

// Initialize data
const initialize = () => {
  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }
  initializeProviders();
};

// Get all providers
export const getProviders = () => {
  initialize();
  return JSON.parse(localStorage.getItem('providers') || '[]');
};

// Get all bookings
export const getAllBookings = () => {
  initialize();
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

// Get user bookings
export const getUserBookings = (userId) => {
  initialize();
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings.filter(booking => booking.userId === userId);
};

// Create booking
export const createBooking = (booking) => {
  initialize();
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  // Check if user already has 3 bookings
  const userBookingsCount = bookings.filter(b => b.userId === booking.userId).length;
  if (userBookingsCount >= 3) {
    throw new Error('You can only book up to 3 cars');
  }
  
  const newBooking = {
    ...booking,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

// Update booking
export const updateBooking = (id, updatedBooking) => {
  initialize();
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    throw new Error('Booking not found');
  }
  
  const updated = { ...bookings[index], ...updatedBooking, updatedAt: new Date().toISOString() };
  bookings[index] = updated;
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return updated;
};

// Delete booking
export const deleteBooking = (id) => {
  initialize();
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const filteredBookings = bookings.filter(booking => booking.id !== id);
  
  if (filteredBookings.length === bookings.length) {
    throw new Error('Booking not found');
  }
  
  localStorage.setItem('bookings', JSON.stringify(filteredBookings));
  return true;
};