import { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import './Register';
import './Profile';
import { IoLogOut } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";

import { useUserContext } from './UserContext';

export default function NavBar() {
  
  const { currentStoreId, setCurrentStoreId, currentToken, logout } = useUserContext()

  return (
    <nav className="navBar">
      {currentToken === null ? (
        // Links to show when no user is logged in
        <>
          <Link to="/home" className="nav-link"><FaHome className='my-icon'/>  Home</Link>
          <Link to="/customer-list" className="nav-link"><FaThList className='my-icon'/>  Customer List</Link>
          <Link to="/register" className="nav-link"><MdAccountCircle className='my-icon'/>  Register/Login</Link>
          
        </>
      ) : (
        <>
          <Link to="/home" className="nav-link"><FaHome className='my-icon'/>  Home</Link>
          <Link to="/customer-list" className="nav-link"><FaThList className='my-icon'/>  Customer List</Link>
          <Link to="/profile" className="nav-link"><IoStorefront className='my-icon'/>  Profile</Link>
          <Link to="/home">
            <button onClick={logout}><IoLogOut className='my-icon'/>logout?</button>
          </Link>
        </>
        
      )}
    </nav>
  );
}