import { createContext, useContext, useState, useEffect } from 'react';

import axios from 'axios';

const UserContext = createContext();
const baseURL = "https://pleyapi-fsaxgge9gda2f5g3.eastus2-01.azurewebsites.net";

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    // Initialize state from localStorage or set to null
    const [currentStoreId, setCurrentStoreId] = useState(() => {
        return localStorage.getItem('currentStoreId') || null;
    });

    const [currentToken, setCurrentToken] = useState(() => {
        return localStorage.getItem('currentToken') || null;
    });

    const [currentUsername, setCurrentUsername] = useState(() => {
        return localStorage.getItem('currentUsername') || null;
    });

    const [currentStoreName, setCurrentStoreName] = useState(() => {
        return localStorage.getItem('currentStoreName') || null;
    });

    const [currentURL, setCurrentURL] = useState(() => {
        return baseURL;
    });

    // Sync state values with localStorage when they change
    useEffect(() => {
        if (currentUsername && currentStoreId && currentStoreName && currentToken) {
            localStorage.setItem('currentStoreId', currentStoreId);
            localStorage.setItem('currentUsername', currentUsername);
            localStorage.setItem('currentStoreName', currentStoreName);
            localStorage.setItem('currentToken', currentToken);
        } else {
            localStorage.removeItem('currentStoreId');
            localStorage.removeItem('currentUsername');
            localStorage.removeItem('currentStoreName');
            localStorage.removeItem('currentToken');
        }
    }, [currentUsername, currentStoreId, currentStoreName, currentToken]);

    // Login function to set user data
    function login(store) {
        setCurrentStoreId(store.store.id);
        setCurrentUsername(store.store.username);
        setCurrentStoreName(store.store.name);
        setCurrentToken(store.token);

        //localStorage.setItem("currentToken", store.token);

        axios.defaults.headers.common["Authorization"] = `${store.token}`;
    }

    // Logout function to clear user data
    function logout() {
        setCurrentStoreId(null);
        setCurrentUsername(null);
        setCurrentStoreName(null);
        setCurrentToken(null);

        //localStorage.removeItem("currentStoreId");
        //localStorage.removeItem("currentUsername");
        //localStorage.removeItem("currentStoreName");
        //localStorage.removeItem("currentToken");
    
        //Remove Authorization header from Axios
        delete axios.defaults.headers.common["Authorization"];

    }

    return (
        <UserContext.Provider value={{ currentStoreId, currentUsername, currentStoreName, currentToken, currentURL, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}