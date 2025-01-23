import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProvider from './components/UserContext'; // Assuming UserProvider is exported as default from UserContext.js


import Customer from './components/Customer';
import Home from './components/Home';
import NavBar from './components/NavBar';

import Profile from './components/Profile';
import Register from './components/Register';  
import './App.css';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <div className="title">PLEY</div>
          <NavBar />
          <div>
            <Routes>
              {/* Add your routes here */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
