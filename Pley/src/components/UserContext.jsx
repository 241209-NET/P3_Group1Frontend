import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    // Initialize state from localStorage or set to null
    const [currentStoreId, setCurrentStoreId] = useState(() => {
        return localStorage.getItem('currentStoreId') || null;
    });

    const [currentUsername, setCurrentUsername] = useState(() => {
        return localStorage.getItem('currentUsername') || null;
    });

    const [currentStoreName, setCurrentStoreName] = useState(() => {
        return localStorage.getItem('currentStoreName') || null;
    });

    // Sync state values with localStorage when they change
    useEffect(() => {
        if (currentUsername && currentStoreId && currentStoreName) {
            localStorage.setItem('currentStoreId', currentStoreId);
            localStorage.setItem('currentUsername', currentUsername);
            localStorage.setItem('currentStoreName', currentStoreName);
        } else {
            localStorage.removeItem('currentStoreId');
            localStorage.removeItem('currentUsername');
            localStorage.removeItem('currentStoreName');
        }
    }, [currentUsername, currentStoreId, currentStoreName]); // Update all relevant state values

    // Login function to set user data
    function login(store) {
        setCurrentStoreId(store.storeId);
        setCurrentUsername(store.username);
        setCurrentStoreName(store.name);
    }

    // Logout function to clear user data
    function logout() {
        setCurrentStoreId(null);
        setCurrentUsername(null);
        setCurrentStoreName(null);
    }

    return (
        <UserContext.Provider value={{ currentStoreId, currentUsername, currentStoreName, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}