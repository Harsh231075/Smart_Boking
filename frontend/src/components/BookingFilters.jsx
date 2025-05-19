import React from 'react';

const BookingFilters = ({ filterType, setFilterType }) => (
  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 className="text-xl font-semibold text-gray-800">Available Time Slots</h2>
    <div className="inline-flex rounded-md shadow-sm">
      {['all', 'available', 'booked'].map((type) => (
        <button
          key={type}
          onClick={() => setFilterType(type)}
          className={`px-4 py-2 text-sm font-medium border ${filterType === type
            ? type === 'available'
              ? 'bg-green-50 text-green-700 border-green-300'
              : type === 'booked'
                ? 'bg-red-50 text-red-700 border-red-300'
                : 'bg-blue-50 text-blue-700 border-blue-300'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } ${type === 'all' ? 'rounded-l-md' : type === 'booked' ? 'rounded-r-md' : ''}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default BookingFilters;
