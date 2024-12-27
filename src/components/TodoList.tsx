import React, { useState, useMemo } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Do HW", completed: false },
    { id: 2, text: "Buy Gifts", completed: false },
    { id: 3, text: "Read Books", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const handleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const { incompleteTasks, completedTasks } = useMemo(() => {
    const incomplete = tasks.filter((task) => !task.completed);
    const completed = tasks.filter((task) => task.completed);
    return { incompleteTasks: incomplete, completedTasks: completed };
  }, [tasks]);

  return (
    <div>
      <h2>Todo List</h2>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <div>
          <h3>Incomplete Tasks</h3>
          <ul>
            {incompleteTasks.map((task) => (
              <li key={task.id}>
                <div>{task.text}</div>
                {!task.completed && (
                  <button onClick={() => handleComplete(task.id)}>
                    Complete
                  </button>
                )}
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Completed Tasks</h3>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id}>
                <div>{task.text}</div>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
