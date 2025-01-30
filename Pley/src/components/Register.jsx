import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import axios from 'axios';
// import '../App.css';
import './Register.css';

export default function Register() {
  const { login, logout } = useUserContext();
  const [username, setUsername] = useState('');
  const [storeName, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [pressedSignUp, setPressedSignUp] = useState(false);
  const navigate = useNavigate();

  //let token = null;

  async function HandleLogin(event) {
    
    event.preventDefault();

    //if (username === "gamestop1" && password === "password") {
      //const store = { storeId: 1, username, name: "gamestop" };
      //alert('Logged in successfully!');
      //return;
    //}

    try {
      const response = await axios.post('http://localhost:5028/api/Account/login', { username, password });

      if (response.status === 200 && response.data?.token) {
       
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
      const response = await axios.post('http://localhost:5028/api/Account/register', store, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status === 200 && response.data?.token) {

        logout();
        login(response.data);

      }


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
          <h2>Login</h2>
          <form onSubmit={HandleLogin}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Submit</button>
          </form>
          <small>Don't have an account yet?</small>
          <button onClick={() => setPressedSignUp(!pressedSignUp)}>
            Create account
          </button>
        </div>
      ) : (
        <div className="user-container">
          <h2>Create Account</h2>
          <form onSubmit={HandleSignup}>

            <input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Store Name"
              required
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Submit</button>
          </form>
          <small>already have an account?</small>
          <button onClick={() => setPressedSignUp(!pressedSignUp)}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
