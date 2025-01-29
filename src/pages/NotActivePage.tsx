import React from 'react';
import { Link } from 'react-router-dom';

const NotActivePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e54c8] to-[#699ed0]">
      <div className="bg-white rounded-2xl shadow-xl max-w-[450px] w-full p-10">
        <h3 className="text-[#699ed0] font-bold text-2xl mb-3 text-center">
          Compte non activé
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Votre compte n'est pas encore actif. Merci de patienter pendant que nous vérifions votre compte.
        </p>
        <Link 
          to="/"
          className="block w-full bg-[#699ed0] text-white text-center font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-[#5a8dbd]"
        >
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default NotActivePage;