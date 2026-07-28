import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phoneNumber: "",
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
            const res = await api.post("/auth/register", form);
            login(res.data.user, res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
        }
    };

    return (
        <section className="auth">
            <form className="auth-card" onSubmit={submitHandler}>
                <span className="badge">Signup</span>
                <h1>Create Account</h1>

                <input name="username" placeholder="Full Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button className="btn primary full">Register</button>

                <p>Already have account? <Link to="/login">Login</Link></p>
            </form>
        </section>
    );
}

export default Register;