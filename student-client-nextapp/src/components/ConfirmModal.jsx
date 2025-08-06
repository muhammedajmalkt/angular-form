'use client';
import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded w-full max-w-sm text-black/70" onClick={(e)=>e.stopPropagation()}>
      
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-4">Are you sure you want to delete this student?</p>
        <br/>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
