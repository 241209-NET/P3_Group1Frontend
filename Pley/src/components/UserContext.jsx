import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
    // Initialize state from localStorage or set to null
    const [currentStoreId, setCurrentStoreId] = useState(() => {
        return localStorage.getItem('currentStoreId') || null;
    });

    const [currentUsername, setCurrentUsername] = useState(() => {
        return localStorage.getItem('currentUsername') || null; //name of store
    });

    const [currentName, setCurrentName] = useState(() => {
        return localStorage.getItem('currentName') || null; //name of current user
    });

    // Sync state values with localStorage when they change
    useEffect(() => {
        if (currentUsername && currentStoreId && currentName) {
            localStorage.setItem('currentStoreId', currentStoreId);
            localStorage.setItem('currentUsername', currentUsername);
            localStorage.setItem('currentName', currentName);
        } else {
            localStorage.removeItem('currentStoreId');
            localStorage.removeItem('currentUsername');
            localStorage.removeItem('currentName');
        }
    }, [currentUsername, currentStoreId, currentName]); // Update all relevant state values

    // Login function to set user data
    function login(store) {
        setCurrentStoreId(store.storeId);
        setCurrentUsername(store.username);
        setCurrentName(store.name);
    }

    // Logout function to clear user data
    function logout() {
        setCurrentStoreId(null);
        setCurrentUsername(null);
        setCurrentName(null);
    }

    return (
        <UserContext.Provider value={{ currentStoreId, currentUsername, currentName, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}