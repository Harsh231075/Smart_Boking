import React from 'react';
import { Calendar } from 'lucide-react';

const Header = ({ token, onSignupClick }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Schedulo Lite</h1>
        </div>
        {!token && (
          <button
            onClick={onSignupClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Sign Up
          </button>
        )}
      </div>
      <p className="mt-1 text-gray-600">Book your preferred time slot</p>
    </div>
  </header>
);

export default Header;
