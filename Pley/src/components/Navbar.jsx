import { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import './Register';
import './Profile';
import { FaHome } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";

export default function NavBar() {
  let currentUserId = null; // Initialize state for current user ID

  return (
    <nav className="navBar">
      {currentUserId === null ? (
        // Links to show when no user is logged in
        <>
          <Link to="/home" className="nav-link"><FaHome className='my-icon'/>  Home</Link>
          <Link to="/customer-list" className="nav-link"><FaThList className='my-icon'/>  Customer List</Link>
          <Link to="/register" className="nav-link"><MdAccountCircle className='my-icon' />  Register</Link>
          <Link to="/profile" className="nav-link"><IoStorefront className='my-icon' />  Profile</Link>
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