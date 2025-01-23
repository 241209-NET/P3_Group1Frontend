import { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import './Register';
import './Profile';

export default function NavBar() {
  let currentUserId = null; // Initialize state for current user ID

  return (
    <nav className="navBar">
      {currentUserId === null ? (
        // Links to show when no user is logged in
        <>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/customer" className="nav-link">Customer</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/customer" className="nav-link">Customer</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </>
      )}
    </nav>
  );
}