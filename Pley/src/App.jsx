import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import UserProvider from './components/UserContext'; // Assuming UserProvider is exported as default from UserContext.js


import Customer from './components/Customer';
import Home from './components/Home';
import NavBar from './components/NavBar';

import Profile from './components/Profile';
import Register from './components/Register';
import CustomerList from './components/CustomerList'; 

import './App.css';
import logo_pley_1 from './assets/logo_pley_1.png';
import logo_pley_2 from './assets/logo_pley_2.png';
import logo_pley_2_crop from './assets/logo_pley_2_crop.png';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <div className="title">
            <img id='logo-image' src = {logo_pley_2_crop}/>
          </div>
          <NavBar />
          <div>
            <Routes>
              {/* Add your routes here */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/customer/:id" element={<Customer />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/customer-list" element={<CustomerList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
