import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const storedUser = localStorage.getItem("omnifood_user");

    const [user, setUser] = useState(
        storedUser ? JSON.parse(storedUser) : null
    );

    const login = (userData, token) => {
        localStorage.setItem("omnifood_user", JSON.stringify(userData));
        localStorage.setItem("omnifood_token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("omnifood_user");
        localStorage.removeItem("omnifood_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);