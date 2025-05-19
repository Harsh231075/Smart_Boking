import React from 'react';
import Home from './pages/Home';
import ToastContainer from './components/Toast';
import { SlotProvider } from './context/SlotContext';

function App() {
  return (
    <SlotProvider>
      <Home />
      <ToastContainer />
    </SlotProvider>
  );
}

export default App;