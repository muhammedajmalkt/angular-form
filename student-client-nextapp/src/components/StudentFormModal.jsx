'use client';
import React from 'react';

const StudentFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded w-full max-w-md text-black/70" onClick={(e)=>e.stopPropagation()}>
      
      {/* <div className="bg-white p-6 rounded w-full max-w-md text-black/70" > */}
        <h3 className="text-lg font-semibold mb-4 ">
          {isEditing ? 'Edit Student' : 'Add Student'}
        </h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            // required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            required
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Place"
            value={formData.place}
            required
            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
