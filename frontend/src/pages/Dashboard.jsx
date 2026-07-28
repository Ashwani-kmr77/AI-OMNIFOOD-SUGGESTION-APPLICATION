import { Link } from "react-router-dom";
import { Brain, CalendarDays, Salad } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    return (
        <section className="page">
            <div className="dash-hero">
                <div>
                    <span className="badge">Dashboard</span>
                    <h1>Hello, {user?.username}</h1>
                    <p>Manage your AI-generated meal plans.</p>
                </div>
            </div>

            <div className="dash-grid">
                <div className="dash-card">
                    <Brain />
                    <h3>Generate Plan</h3>
                    <p>Create weekly meal plan using ML model.</p>
                    <Link className="btn primary" to="/generate-plan">Generate</Link>
                </div>

                <div className="dash-card">
                    <CalendarDays />
                    <h3>Saved Plans</h3>
                    <p>View your saved meal plans.</p>
                    <Link className="btn secondary" to="/my-plans">View Plans</Link>
                </div>

                <div className="dash-card">
                    <Salad />
                    <h3>Healthy Meals</h3>
                    <p>Track calories, protein and health score.</p>
                    <Link className="btn secondary" to="/generate-plan">Start</Link>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;