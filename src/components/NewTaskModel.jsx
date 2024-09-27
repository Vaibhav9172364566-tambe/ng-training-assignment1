/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/NewTaskModal.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTasks } from "react-icons/fa";


const NewTaskModal = ({ addTask, updateTask, taskToEdit, closeModal }) => {
  const [task, setTask] = useState({
    
    name: '',
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Low',
    comments: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit); // Populate fields if editing
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      updateTask(task); // Call update function
    } else {
      addTask(task); // Call add function
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {taskToEdit ? 'Edit Task' : 'New Task'}
        </h2>
        <hr />
        
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4"> {/* Flex container for Assigned To and Status */}
            <div className="flex-1">
              <label className="block mb-1">
                <span className="text-red-500">*</span> Assigned To {/* Required indicator */}
              </label>
              <input
                type="text"
                name="assignedTo"
                className="border p-2 rounded w-full"
                value={task.assignedTo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">
                <span className="text-red-500">*</span> Status {/* Required indicator */}
              </label>
              <select
                name="status"
                className="border p-2 rounded w-full"
                value={task.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex mb-4 space-x-4"> {/* Flex container for Due Date and Priority */}
            <div className="flex-1">
              <label className="block mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="border p-2 rounded w-full"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">
                <span className="text-red-500">*</span> Priority {/* Required indicator */}
              </label>
              <select
                name="priority"
                className="border p-2 rounded w-full"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="comments"
              className="border p-2 rounded w-full"
              value={task.comments}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-2"> {/* Align buttons to the right with space between */}
            <button
              type="button"
              className="bg-yellow-300 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {taskToEdit ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
