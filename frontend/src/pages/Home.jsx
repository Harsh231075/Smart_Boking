import React, { useEffect, useState } from 'react';
import { useSlotContext } from '../context/SlotContext';
import Header from '../components/Header';
import BookingFilters from '../components/BookingFilters';
import UserBookings from '../components/UserBookings';
import SlotGrid from '../components/SlotGrid';
import BookingModal from '../components/BookingModal';
import SignupModal from '../components/SignupModal';

const Home = () => {
  const { slots, getUserBookings } = useSlotContext();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const token = localStorage.getItem('token');
  const userBookings = getUserBookings();


  useEffect(() => {
    if (!token) {
      setIsSignupOpen(true);
    }
  }, [token]);

  const handleBookClick = (id) => {
    if (!token) {
      setIsSignupOpen(true);
      return;
    }

    const slot = slots.find((s) => s.id === id);
    if (slot) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const filteredSlots = slots.filter((slot) => {
    if (filterType === 'all') return true;
    if (filterType === 'available') return slot.status === 'available';
    if (filterType === 'booked') return slot.status === 'booked';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header token={token} onSignupClick={() => setIsSignupOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserBookings bookings={userBookings} />
        <BookingFilters filterType={filterType} setFilterType={setFilterType} />
        <SlotGrid slots={filteredSlots} onBookClick={handleBookClick} />
      </main>

      {/* Modal for Booking Slot */}
      <BookingModal slot={selectedSlot} isOpen={isModalOpen} onClose={closeModal} />

      {/* Modal for Signup */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </div>
  );
};

export default Home;
