import { Link } from "react-router-dom";
import { Brain, Leaf, Truck, CalendarCheck, ShieldCheck } from "lucide-react";

function Home() {
    return (
        <main>
            <section className="hero">
                <div className="hero-text">
                    <span className="badge">AI Food Subscription</span>
                    <h1>A healthy meal <span> delivered </span> to your door every single day.</h1>
                    <p>
                        Omnifood AI creates personalized weekly meal plans based on your
                        diet, likes, dislikes and nutrition goals.
                    </p>

                    <div className="actions">
                        <Link to="/register" className="btn primary">Start Eating Well</Link>
                        <Link to="/login" className="btn secondary">Login</Link>
                    </div>

                    <div className="stats">
                        <div><h3>250K+</h3><p>Meals delivered</p></div>
                        <div><h3>5K+</h3><p>Recipes</p></div>
                        <div><h3>92%</h3><p>Health score</p></div>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="plate">🥗</div>
                    <h2>Today’s AI Meal</h2>
                    <p>Avocado Power Salad</p>

                    <div className="macro">
                        <span>400 kcal</span>
                        <span>24g protein</span>
                        <span>Score 92</span>
                    </div>
                </div>
            </section>

            <section className="section">
                <span className="badge">Features</span>
                <h2>Why Omnifood?</h2>

                <div className="grid">
                    <div className="feature"><Brain /><h3>AI Planning</h3><p>Personalized meal plans using ML.</p></div>
                    <div className="feature"><Leaf /><h3>Healthy Food</h3><p>Balanced nutrition and organic ingredients.</p></div>
                    <div className="feature"><Truck /><h3>Fast Delivery</h3><p>Fresh meals delivered daily.</p></div>
                    <div className="feature"><CalendarCheck /><h3>Pause Anytime</h3><p>Flexible subscription for users.</p></div>
                </div>
            </section>

            <section className="section dark">
                <span className="badge">Workflow</span>
                <h2>How it works</h2>

                <div className="steps">
                    <div><span>01</span><h3>Select Preferences</h3><p>Choose diet, likes and dislikes.</p></div>
                    <div><span>02</span><h3>ML Ranks Meals</h3><p>Model predicts health score.</p></div>
                    <div><span>03</span><h3>Save Plan</h3><p>Store your weekly meal plan.</p></div>
                </div>
            </section>

            <section className="section">
                <span className="badge">Pricing</span>
                <h2>Simple pricing</h2>

                <div className="pricing">
                    <div className="price-card">
                        <h3>Starter</h3>
                        <h1>$399</h1>
                        <p>1 meal per day</p>
                        <ul>
                            <li>Free delivery</li>
                            <li>Order 11am - 9pm</li>
                            <li>Cancel anytime</li>
                        </ul>
                    </div>

                    <div className="price-card popular">
                        <h3>Complete</h3>
                        <h1>$649</h1>
                        <p>2 meals per day</p>
                        <ul>
                            <li>Free delivery</li>
                            <li>Order 24/7</li>
                            <li>Latest recipes</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="cta">
                <ShieldCheck size={42} />
                <h2>Start your AI meal journey today</h2>
                <p>Generate your first plan in seconds.</p>
                <Link to="/register" className="btn primary">Create Account</Link>
            </section>
        </main>
    );
}

export default Home;