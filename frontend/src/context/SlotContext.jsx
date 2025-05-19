import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const SlotContext = createContext();

export const useSlotContext = () => {
  const context = useContext(SlotContext);
  if (!context) {
    throw new Error('useSlotContext must be used within a SlotProvider');
  }
  return context;
};

export const SlotProvider = ({ children }) => {
  const [slots, setSlots] = useState([]);
  const [toasts, setToasts] = useState([]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:3000/slots");
      setSlots(response.data);
    } catch (error) {
      addToast("error", "Failed to load slots.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);


  const bookSlot = async (id, name) => {
    console.log(id, name);
    try {
      await axios.post("http://localhost:3000/slots/book", { id, name });
      addToast("success", "Slot booked successfully!");
      fetchSlots();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Booking failed");
    }
  };


  const cancelSlot = async (id) => {
    // console.log(id);
    try {
      await axios.post("http://localhost:3000/slots/cancel", { id });
      addToast("info", "Booking cancelled");
      fetchSlots();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Cancellation failed");
    }
  };


  const addToast = (type, message) => {
    const newToast = {
      id: Date.now().toString(),
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(newToast.id), 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getUserBookings = () => {
    return slots.filter((slot) => slot.status === "booked");
  };

  return (
    <SlotContext.Provider
      value={{
        slots,
        bookSlot,
        cancelSlot,
        toasts,
        addToast,
        removeToast,
        getUserBookings,
        fetchSlots,
      }}
    >
      {children}
    </SlotContext.Provider>
  );
};
