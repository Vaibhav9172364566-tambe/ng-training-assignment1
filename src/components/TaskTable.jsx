/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

const TaskTable = ({ tasks, deleteTask, updateTask, setEditingTask, setShowNewTaskModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ isVisible: false, task: null });

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const onPageChange = (action) => {
    switch (action) {
      case 'first':
        setCurrentPage(1);
        break;
      case 'prev':
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        break;
      case 'next':
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        break;
      case 'last':
        setCurrentPage(totalPages);
        break;
      default:
        break;
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowNewTaskModal(true);
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(taskId)) {
        updatedSelected.delete(taskId);
      } else {
        updatedSelected.add(taskId);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTasks(new Set());
    } else {
      const allTaskIds = new Set(currentTasks.map(task => task.id));
      setSelectedTasks(allTaskIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteTask = (task) => {
    setConfirmDelete({ isVisible: true, task });
  };

  const confirmDeleteTask = () => {
    if (confirmDelete.task) {
      deleteTask(confirmDelete.task.id);
      setConfirmDelete({ isVisible: false, task: null });
    }
  };

  const cancelDeleteTask = () => {
    setConfirmDelete({ isVisible: false, task: null });
  };

  const handleDeleteSelected = () => {
    if (window.confirm('Do you want to delete the selected tasks?')) {
      selectedTasks.forEach((taskId) => {
        deleteTask(taskId);
      });
      setSelectedTasks(new Set());
      setSelectAll(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 text-[#A4AAB9]">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-2 text-[#A4AAB9]">Assigned To</th>
            <th className="py-2 text-[#A4AAB9]">Status</th>
            <th className="py-2 text-[#A4AAB9]">Due Date</th>
            <th className="py-2 text-[#A4AAB9]">Priority</th>
            <th className="py-2 text-[#A4AAB9]">Comments</th>
            <th className="py-2 text-[#A4AAB9]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td className="py-2 border text-center">
                <input
                  type="checkbox"
                  checked={selectedTasks.has(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
              </td>
              <td className="py-2 border text-center text-blue-400">{task.assignedTo}</td>
              <td className="py-2 border text-center text-[#A3A3A3]">{task.status}</td>
              <td className="py-2 border text-center text-[#A3A3A3]">{task.dueDate}</td>
              <td className="py-2 border text-center text-[#A3A3A3]">{task.priority}</td>
              <td className="py-2 border text-center text-[#A3A3A3]">{task.comments}</td>
              <td className="py-2 border text-center ">
                <button
                  className="bg-[#ffe7a7] text-white py-1 px-2 rounded mr-2"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-[#ffe7a7] text-white py-1 px-2 rounded "
                  onClick={() => handleDeleteTask(task)} // Use new delete handler
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmDelete.isVisible && (
        <div className="mt-4 p-4 border">
  <p className="bg-red-500 text-white text-center mb-4 p-2 w-1/2 mx-auto">
    Do you want to delete task {confirmDelete.task.assignedTo}?
  </p>
  <div className="flex justify-center space-x-2">
    <button
      className="bg-red-500 text-white py-1 px-2 rounded bg-[#99B09E]"
      onClick={cancelDeleteTask}
    >
      No
    </button>
    <button
      className="bg-green-500 text-white py-1 px-2 rounded bg-[#ffe7a7]"
      onClick={confirmDeleteTask}
    >
      Yes
    </button>
  </div>
</div>



      )}

      <div className="flex justify-end items-center mt-4">
        <button
          className="flex items-center px-3 py-1 bg-gray-200 rounded mx-1 text-[#A4AAB9]"
          onClick={() => onPageChange('first')}
          disabled={currentPage === 1}
        >
          <FaAngleDoubleUp className="mr-1" />
          First
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded mx-1 text-[#A4AAB9]"
          onClick={() => onPageChange('prev')}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded mx-1 text-[#A4AAB9]">
          <span className="mx-2">{currentPage}</span>
        </button>

        <button
          className="px-3 py-1 bg-gray-200 rounded mx-1 text-[#A4AAB9]"
          onClick={() => onPageChange('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="flex items-center px-3 py-1 bg-gray-200 rounded mx-1 text-[#A4AAB9]"
          onClick={() => onPageChange('last')}
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleDown className="mr-1" />
          Last
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
