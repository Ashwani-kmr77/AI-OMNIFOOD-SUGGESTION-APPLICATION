import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GeneratePlan from "./pages/GeneratePlan";
import MyPlans from "./pages/MyPlans";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/generate-plan" element={<ProtectedRoute><GeneratePlan /></ProtectedRoute>} />
        <Route path="/my-plans" element={<ProtectedRoute><MyPlans /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;