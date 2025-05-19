import React from 'react';

const UserBookings = ({ bookings }) => {
  if (bookings.length === 0) return null;

  return (
    <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h2 className="text-lg font-medium text-blue-800 mb-2">Your Bookings</h2>
      <div className="flex flex-wrap gap-2">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="px-3 py-1.5 bg-blue-100 rounded-full text-blue-800 text-sm font-medium"
          >
            {booking.time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
