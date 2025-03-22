export type Provider = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

export type Booking = {
  id: number;
  userId: number;
  userName: string;
  providerId: number;
  date: string;
  createdAt: string;
  updatedAt?: string;
};

// Initialize some sample rental car providers
const initializeProviders = () => {
  const providers: Provider[] = [
    {
      id: 1,
      name: 'Luxury Motors Thailand',
      address: '123 Sukhumvit Rd, Bangkok',
      phone: '02-123-4567',
    },
    {
      id: 2,
      name: 'Premium Auto Rentals',
      address: '456 Silom Ave, Bangkok',
      phone: '02-765-4321',
    },
    {
      id: 3,
      name: 'Elite Car Services',
      address: '789 Ratchadamri Blvd, Bangkok',
      phone: '02-555-7890',
    },
    {
      id: 4,
      name: 'Exotic Car Collection',
      address: '101 Thonglor, Bangkok',
      phone: '02-987-6543',
    },
    {
      id: 5,
      name: 'VIP Auto Leasing',
      address: '222 Asoke, Bangkok',
      phone: '02-876-5432',
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
export const getProviders = (): Provider[] => {
  initialize();
  return JSON.parse(localStorage.getItem('providers') || '[]');
};

// Get all bookings
export const getAllBookings = (): Booking[] => {
  initialize();
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

// Get user bookings
export const getUserBookings = (userId: number): Booking[] => {
  initialize();
  const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings.filter(booking => booking.userId === userId);
};

// Create booking
export const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  initialize();
  const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  // Check if user already has 3 bookings
  const userBookingsCount = bookings.filter(b => b.userId === booking.userId).length;
  if (userBookingsCount >= 3) {
    throw new Error('You can only book up to 3 cars');
  }
  
  const newBooking: Booking = {
    ...booking,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return newBooking;
};

// Update booking
export const updateBooking = (id: number, updatedBooking: Partial<Booking>): Booking => {
  initialize();
  const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
  const index = bookings.findIndex(booking => booking.id === id);
  
  if (index === -1) {
    throw new Error('Booking not found');
  }
  
  const updated: Booking = { 
    ...bookings[index], 
    ...updatedBooking, 
    updatedAt: new Date().toISOString() 
  };
  
  bookings[index] = updated;
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return updated;
};

// Delete booking
export const deleteBooking = (id: number): boolean => {
  initialize();
  const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
  const filteredBookings = bookings.filter(booking => booking.id !== id);
  
  if (filteredBookings.length === bookings.length) {
    throw new Error('Booking not found');
  }
  
  localStorage.setItem('bookings', JSON.stringify(filteredBookings));
  return true;
};