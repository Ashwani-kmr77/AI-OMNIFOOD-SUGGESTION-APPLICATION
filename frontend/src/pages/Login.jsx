import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);
            login(res.data.user, res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <section className="auth">
            <form className="auth-card" onSubmit={submitHandler}>
                <span className="badge">Login</span>
                <h1>Welcome Back</h1>

                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button className="btn primary full">Login</button>

                <p>New user? <Link to="/register">Create Account</Link></p>
            </form>
        </section>
    );
}

export default Login;