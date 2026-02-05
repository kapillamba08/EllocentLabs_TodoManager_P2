import React, { useState } from "react";

const TodoManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (title.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    const updated = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        updated.push({
          ...tasks[i],
          completed: !tasks[i].completed
        });
      } else {
        updated.push(tasks[i]);
      }
    }

    setTasks(updated);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h2>Todo Manager</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <h3>Pending Tasks</h3>
      <ul>
        {pendingTasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => toggleComplete(task.id)}>Done</button>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Completed Tasks</h3>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => toggleComplete(task.id)}>Undo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoManager;
