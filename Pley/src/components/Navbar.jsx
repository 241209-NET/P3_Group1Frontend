import { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import './Register';
import './Profile';

import { useUserContext } from './UserContext';

export default function NavBar() {
  let currentUserId = 1; // Initialize state for current user ID
  
  const { currentStoreId, setCurrentStoreId, currentToken, logout } = useUserContext()

  return (
    <nav className="navBar">
      {currentToken === null ? (
        // Links to show when no user is logged in
        <>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/customer-list" className="nav-link">Customer List</Link>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          
        </>
      ) : (
        <>
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/customer" className="nav-link">Customer</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <button onClick={{logout}}>logout?</button>
        </>
        
      )}
    </nav>
  );
}