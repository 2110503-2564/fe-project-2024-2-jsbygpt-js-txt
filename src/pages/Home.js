import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to Car Rental Booking</h1>
      <p className="lead">Book your rental car with ease.</p>
      <hr className="my-4" />
      <p>To get started, please register or login.</p>
      <Link to="/register" className="btn btn-primary me-2">Register</Link>
      <Link to="/login" className="btn btn-secondary">Login</Link>
    </div>
  );
};

export default Home;