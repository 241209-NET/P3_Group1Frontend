import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import axios from 'axios';
import '../App.css';
import './Register.css';

export default function Register() {
  const { login, logout } = useUserContext();
  const [username, setUsername] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [pressedSignUp, setPressedSignUp] = useState(false);
  const navigate = useNavigate();

  async function HandleLogin(event) {
    event.preventDefault();

    if (username === "gamestop1" && password === "password") {
      const store = { storeId: 1, username, name: "gamestop" };
      alert('Logged in successfully!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5028/api/Stores/login', { username, password });

      if (response.status === 200 && response.data) {
        const retrievedStore = response.data;
        logout();
        login(retrievedStore);
        alert('Logged in successfully!');
        navigate('/home');
      }
    } catch (error) {
      const status = error.response?.status;
      console.error('Login error:', error);

      if (status === 401) {
        alert("Either Username or password is incorrect");
      } else {
        alert('An error occurred during login');
      }
    }
  }

  async function addStore(store) {
    try {
      const response = await axios.post('http://localhost:5028/api/Stores/register', store, {
        headers: { 'Content-Type': 'application/json' },
      });
      logout();
      login(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        if (error.response.status === 400) {
          console.error('Error 400:', error.response.data);
        }
      } else {
        console.error('Error adding user:', error);
      }
    }
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  }

  async function HandleSignup(event) {
    event.preventDefault();

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
      return;
    }

    const newStore = { username, password, storeName };
    await addStore(newStore);
    alert(`Welcome, ${username}!`);
    navigate('/home');
  }

  return (
    <div>
      {pressedSignUp === false ? (
        <div className="user-container">
          <h2 style={{ color: 'white' }}>Login to account</h2>
          <form onSubmit={HandleLogin}>
            <input
              className="user-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              className="user-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="user-button">Submit</button>
          </form>
          Don't have an account yet?
          <button onClick={() => setPressedSignUp(!pressedSignUp)} className="user-button">
            Create new account
          </button>
        </div>
      ) : (
        <div className="user-container">
          <h2 style={{ color: 'white' }}>Create new account</h2>
          <form onSubmit={HandleSignup}>
            <input
              className="user-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              className="user-input"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Store Name"
              required
            />
            <input
              className="user-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="user-button">Submit</button>
          </form>
          already have an account?
          <button onClick={() => setPressedSignUp(!pressedSignUp)} className="user-button">
            Login to old account
          </button>
        </div>
      )}
    </div>
  );
}
