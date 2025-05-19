import React from 'react';
import SlotCard from './SlotCard';

const SlotGrid = ({ slots, onBookClick }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {slots.map((slot) => (
        <SlotCard key={slot.id} slot={slot} onBookClick={onBookClick} />
      ))}
    </div>
    {slots.length === 0 && (
      <div className="text-center py-12">
        <p className="text-gray-500">No slots match your filter criteria.</p>
      </div>
    )}
  </>
);

export default SlotGrid;
