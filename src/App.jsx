/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import NewTaskModal from './components/NewTaskModel';
import { FaTasks, FaSearch } from 'react-icons/fa'; // Importing the search icon

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const taskId = new Date().getTime().toString(); // Unique ID
    const updatedTask = { ...newTask, id: taskId };
    setTasks((prevTasks) => [...prevTasks, updatedTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null); // Clear editing task
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setTaskToEdit(task); // Set task to be edited
    setShowNewTaskModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowNewTaskModal(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        {/* Header Section */}

        <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-4">
        
          <div className="flex items-center flex-col space-y-2">
          <div className="flex items-center space-x-2">
  <FaTasks className="text-2xl text-gray-700" />
  <div className="flex flex-col">
    <span className="font-semibold text-lg text-[#A4AAB9]">Tasks</span>
    <span className="font-semibold text-lg text-[#A4AAB9]">All Tasks</span>
  </div>
</div>

<div className="text-gray-600 text-[#A4AAB9]">
  {tasks.length} <span className="font-bold text-[#A4AAB9]">records</span> {/* Change 'text-blue-500' to your desired color class */}
</div>

          </div>

          {/* Action Buttons and Search */}
          <div className="flex flex-col space-y-2"> {/* Flex column to stack elements */}
  <div className="flex items-center ">
    <button
      className="bg-[#ffe7a7] text-white py-2 px-8 rounded"
      onClick={() => setShowNewTaskModal(true)}
    >
      New Task
    </button>
    <button
      className="bg-[#ffe7a7] text-white py-2 px-8 rounded"
      onClick={closeModal} // Use closeModal function here
    >
      Refresh
    </button>
  </div>
  
  {/* Search Bar */}
  <div className="flex items-center  bg-white-800 rounded px-2 mt-2 "> {/* Flex container for search */}
  <FaSearch className="text-gray-500 mr-2" /> {/* Search Icon with margin-right */}
  <input
    type="text"
    placeholder="Search" // Placeholder text
    className="bg-transparent p-2 outline-none"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


</div>

        </div>

        {/* Task Table */}
        <TaskTable
          tasks={filteredTasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          setEditingTask={handleEdit}
          setShowNewTaskModal={setShowNewTaskModal}
        />
        
        {/* Modal for Adding/Editing Task */}
        {showNewTaskModal && (
          <NewTaskModal
            addTask={addTask}
            updateTask={updateTask}
            taskToEdit={taskToEdit}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default App;
