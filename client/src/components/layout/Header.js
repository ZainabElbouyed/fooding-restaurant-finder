
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-primary italic font-display">
            FOODING
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/city-guide"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              CityGuide
            </Link>

            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Bonjour, <span className="font-semibold">{user?.nom}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition shadow-md"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition shadow-md"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
