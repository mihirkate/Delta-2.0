import { useState } from "react";

export default function ToDoList() {
  let [todos, setTodos] = useState(["sample task"]);
  let [newTodo, setNewTodo] = useState("");
  function addTask(task) {
    setTodos([...todos, newTodo]);
    setNewTodo("");
  }
  let updateTaskValue = (event) => {
    {
      setNewTodo(event.target.value);
    }
  };
  return (
    <div>
      <h4>To do List </h4>
      <input
        type="text"
        placeholder="Add a Task"
        value={newTodo}
        onChange={updateTaskValue}
      />
      <button onClick={addTask}>Add task </button>

      <ul>
        {todos.map((todo) => {
          return <li>{todo}</li>;
        })}
      </ul>
    </div>
  );
}
