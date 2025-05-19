import React from 'react';
import { Clock } from 'lucide-react';
import { useSlotContext } from '../context/SlotContext';



const SlotCard = ({ slot, onBookClick }) => {
  const { cancelSlot } = useSlotContext();
  const bgColor = slot.status === 'booked' ? 'bg-red-100' : 'bg-green-100';
  const borderColor = slot.status === 'booked' ? 'border-red-300' : 'border-green-300';
  const statusColor = slot.status === 'booked' ? 'text-red-700' : 'text-green-700';

  return (
    <div
      className={`p-4 rounded-lg border ${borderColor} ${bgColor} transition-all duration-300 shadow-sm hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={16} className={statusColor} />
            <h3 className="font-medium text-gray-800">{slot.time}</h3>
          </div>

          <div className="mb-3">
            <span className={`text-sm font-medium ${statusColor}`}>
              {slot.status === 'booked' ? 'Booked' : 'Available'}
            </span>

            {slot.status === 'booked' && slot.bookedBy && (
              <p className="text-sm text-gray-600 mt-1">
                Booked by <span className="font-medium">{slot.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        {!(slot.status === 'booked') ? (
          <button
            onClick={() => onBookClick(slot.id)}
            className="w-full py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Book
          </button>
        ) : (
          <button
            onClick={() => cancelSlot(slot.id)}
            className="w-full py-2 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default SlotCard;