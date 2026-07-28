import { Link, NavLink, useNavigate } from "react-router-dom";
import { Utensils } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="navbar">
            <Link to="/" className="logo">
                <span><Utensils size={22} /></span>
                Omnifood AI
            </Link>

            <nav className="nav">
                <NavLink to="/">Home</NavLink>

                {user ? (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/generate-plan">Generate</NavLink>
                        <NavLink to="/my-plans">My Plans</NavLink>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <Link className="nav-cta" to="/register">Get Started</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;