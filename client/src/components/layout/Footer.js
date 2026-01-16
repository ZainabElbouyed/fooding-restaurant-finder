
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-2xl font-bold italic mb-2">FOODING</p>
        <p className="text-gray-400">
          © 2026 FOODING. Tous droits réservés.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">
            Confidentialité
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Conditions
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
