import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

import { useSlotContext } from '../context/SlotContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useSlotContext();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};



const Toast = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-100',
          border: 'border-green-500',
          text: 'text-green-800',
          icon: <CheckCircle size={18} className="text-green-600" />
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          border: 'border-red-500',
          text: 'text-red-800',
          icon: <XCircle size={18} className="text-red-600" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          text: 'text-blue-800',
          icon: <Info size={18} className="text-blue-600" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} rounded-md p-3 min-w-[280px] shadow-md flex items-center justify-between animate-slideInRight`}>
      <div className="flex items-center gap-2">
        {styles.icon}
        <p className={`${styles.text} font-medium text-sm`}>{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-500 hover:text-gray-700"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ToastContainer;