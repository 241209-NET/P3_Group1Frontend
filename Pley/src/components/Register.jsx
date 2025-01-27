
import { useState } from 'react';
import { Link } from 'react-router-dom';
//import { useUserContext } from 'UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import './Register.css';


export default function Register() {

    //const { login, logout, currentStoreId, currentUsername, currentStoreName } = useUserContext();

    const [username, setUsername] = useState('');
    const [storeName, setStoreName] = useState('');
    const [password, setPassword] = useState('');

    const [currentId, setCurrentId] = useState(null);
    const [pressedSignUp, setPressedSignUp] = useState(false);
    /*
    async function HandleLogin(event) {
        
        event.preventDefault();
    
        try {
            
            const response = await axios.post('https://p3-pley.azurewebsites.net/api/Store/login', {
                username: username,
                password: password,
            });
    
            if (response.status === 200 && response.data) {
                
                const retrievedStore = response.data;
                
                logout();
                login(retrievedStore);
                alert('Logged in successfully!');
                navigate('/home');

            }

        } 
        catch (error) {

            const status = error.response.status;
            
            console.error('Login error:', error);
            
            if (status === 401) {

                alert("Either Username or password is incorrect");

            } 
            else {

                alert('An error occurred during login');

            }
        }
    }
        */

    function HandleLogin() {

        alert("add code here");

    }

    /*
    // Add new store to the database
    async function addStore(store) {

        try {
            const response = await axios.post('https://p3-pley.azurewebsites.net/api/Store', Store, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //alert('User added successfully: id ' + response.data.userId);
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
    */

    /*
    //Check if username is available
    async function isValidUsername(username) {
        try {
            const response = await axios.get(`https://p3-pley.azurewebsites.net/api/Store/username/${username}`);
            //username is taken
            if (response.data) {
                alert(`Username "${username}" is already taken. Please choose another one.`);
                return false;
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                //username is available
                return true;
            }
            alert('Error checking username: ', error.response);
            return false;
        }
        //other error occured
        return false;
    }
    */

    //Password validation regex
    //Special characters are not required now. Only uppercase, lowercase, and number are required and 8 characters
    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    }

    // Handle signup process
    async function HandleSignup(event) {
        //Prevent form submission from refreshing the page
        event.preventDefault(); 

        if (!isValidPassword(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number");
            return;
        }

        if (!await isValidUsername(username)) {
            return;
        }
        

        const newStore = { username, password, storeName };

        await addUser(newStore);

        alert(`Welcome, ${username}!`);
        navigate('/home');
    }    


 
    return (

        <div>

            {(pressedSignUp === false) ? (

                <div className="user-container">
                
                <h2>- Login to your account -</h2>
                <form onSubmit={HandleLogin}>


                        <input
                            className="user-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            required
                        />


                        <input
                            className="user-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
                        />

                    <button type="submit" className="user-button">
                        Submit
                    </button>
                    
                </form>
                <div className="change-register">
                    - Don't have an account? -
                    <button onClick={() => setPressedSignUp(state => !state)} className="change-button">Signup</button>
                </div>
            </div>

          ) : (

            <div className="user-container">
                <h2>- Create new account -</h2>
                <form onSubmit={HandleSignup}>

                        <input
                            className="user-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            required
                        />

                        <input
                            className="user-input"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            required
                            placeholder="store name"
                        />

                        <input
                            className="user-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
                        />
                    
                    <button type="submit" className="user-button">
                        Submit
                    </button>
                    
                </form>
                <div className="change-register">
                    - Already have an account? -
                    <button onClick={() => setPressedSignUp(state => !state)} className="change-button">Login</button>
                </div>
            </div>

          )}


        </div>

    );

}