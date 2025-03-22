export const initializeData = () => {
  // Initialize admin user if not exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  const adminExists = users.some(user => user.isAdmin);
  
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
};