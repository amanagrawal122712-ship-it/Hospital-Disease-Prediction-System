import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          🏥 MedPredict AI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 font-medium items-center">
          <Link to="/">Home</Link>
          <Link to="/predict">Predict</Link>
          <Link to="/history">History</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/nearby-hospitals">Nearby Hospitals</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/chat">AI Chat</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-blue-800 flex flex-col px-6 py-4 gap-4 text-lg">

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

          <Link to="/predict" onClick={() => setMenuOpen(false)}>Predict</Link>

          <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>

          <Link to="/appointments" onClick={() => setMenuOpen(false)}>
            Appointments
          </Link>

          <Link
            to="/nearby-hospitals"
            onClick={() => setMenuOpen(false)}
          >
            Nearby Hospitals
          </Link>

          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>

          <Link to="/chat" onClick={() => setMenuOpen(false)}>
            AI Chat
          </Link>

          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;