import React, { useState } from 'react';
import axios from 'axios';

const SignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await axios.post('http://localhost:3000/auth/register', formData);
      console.log("Server response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setStatus({
          type: 'success',
          message: 'Registration successful! Welcome aboard! 🎉'
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-lg p-8 w-full max-w-md shadow-xl transform transition-all relative">
        {/* Decorative Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>

          {status.message && (
            <div className={`w-full p-4 mb-4 rounded-lg ${status.type === 'success' ? 'bg-green-100/80 text-green-700' : 'bg-red-100/80 text-red-700'
              }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter a name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="exmple@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100/80 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-gray-200/80 transition duration-200 font-medium disabled:opacity-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-700/90 transition duration-200 font-medium disabled:opacity-50 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;