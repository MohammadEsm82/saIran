import React, { createContext, useState, useEffect, useContext } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentUser = authApi.getCurrentUser();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (data) => {
        setError(null);
        try {
            const result = await authApi.login(data);
            if (result.success) {
                setUser(result.data.user);
                return result;
            }
            setError(result.message);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const updateProfile = async (data) => {
        setError(null);
        try {
            const result = await authApi.updateProfile(data);
            if (result.success) {
                setUser(result.data);
                return result;
            }
            setError(result.message);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteAccount = async () => {
        setError(null);
        try {
            const result = await authApi.deleteAccount();
            if (result.success) {
                setUser(null);
                return result;
            }
            setError(result.message);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
        updateProfile,
        deleteAccount
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};