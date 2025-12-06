import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user info on mount
        const storedUser = sessionStorage.getItem('userInfo');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user info", error);
                sessionStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                return { success: true, data };
            } else {
                return { success: false, message: data.message || "Credenciales inválidas" };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: "Error al conectar con el servidor" };
        }
    };

    const register = async (userData) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const response = await fetch(`${baseUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('userInfo', JSON.stringify(data));
                setUser(data);
                return { success: true, data };
            } else {
                return { success: false, message: data.message || "Error en el registro" };
            }
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, message: "Error al conectar con el servidor" };
        }
    };

    const logout = () => {
        sessionStorage.removeItem('userInfo');
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
