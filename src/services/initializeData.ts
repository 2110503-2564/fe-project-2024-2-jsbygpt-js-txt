export const initializeData = () => {
  if (typeof window === 'undefined') {
    return; // Don't run on server
  }
  
  // Initialize admin user if not exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  const adminExists = users.some((user: any) => user.isAdmin);
  
  if (!adminExists) {
    users.push({
      id: 1,
      name: 'Admin',
      phone: '000-000-0000',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    });
    
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Initialize providers
  if (!localStorage.getItem('providers')) {
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
    
    localStorage.setItem('providers', JSON.stringify(providers));
  }
};