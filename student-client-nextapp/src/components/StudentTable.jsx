'use client';
import axiosInstance from '@/api/axiosInstance';
import React, { useEffect, useState } from 'react';
import StudentFormModal from '@/components/StudentFormModal';
import ConfirmDeleteModal from '@/components/ConfirmModal'

const StudentTable = () => {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ 
    name: '', email: '', age: '', place: '' })
  const [editingId, setEditingId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get('/students/get');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openModal = (student ) => {
    // console.log(student);
    
    if (student) {
      setFormData(student);
      setEditingId(student._id);
    } else {
      setFormData({ name: '', email: '', age: '', place: '' });
      setEditingId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: '', email: '', age: '', place: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/students/update/${editingId}`, formData);
      } else {
        await axiosInstance.post('/students/create', formData);
      }
      closeModal();
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/students/delete/${deleteId}`);
      setDeleteModalOpen(false);
      setDeleteId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
      {/* <div className="flex justify-between"> */}
        <h2 className="text-xl font-semibold">Student List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => openModal()}
        >
          Add Student
        </button>
      </div>

      {students.length === 0 ? 
        <p>No students found.</p>
       : (
        <table className="w-3/4 mx-auto border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Place</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.age}</td>
                
                <td className="border px-4 py-2">{student.place}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => openModal(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => confirmDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <StudentFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={!!editingId}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default StudentTable;
