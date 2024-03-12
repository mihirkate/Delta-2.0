import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDoList() {
  let [todos, setTodos] = useState([
    { task: "Sample Text ", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  /* _______________________________________________________________________ */
  /* ---------------------------Add new Task ---------------------------  */

  let addNewTask = () => {
    setTodos((prevTodo) => {
      return [...prevTodo, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Update  Task ---------------------------  */

  let updateTaskValue = (event) => {
    {
      setNewTodo(event.target.value);
    }
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Delete   Task ---------------------------  */
  let deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Uppercase all the Task ---------------------------  */
  let upperCaseAll = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      });
    });

    console.log(newTodo);
  };

  /* _______________________________________________________________________ */
  /* ---------------------------LowerCase all The Task ---------------------------  */
  let lowerCaseAll = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toLowerCase(),
        };
      });
    });
    console.log(newTodo);
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Uppercase One of the Task ---------------------------  */
  let upperCaseOne = (id) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      });
    });
    console.log(id);
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Mark as Done one of  The Task ---------------------------  */
  let marksAsDoneOne = () => {
    console.log("marked as done ");
    setTodos((todos) => {
      return todos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      });
    });
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Mark as Done all The Task ---------------------------  */

  let markAllAsDone = () => {
    setTodos((todos) => {
      return todos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      });
    });
  };

  /* _______________________________________________________________________ */
  /* ---------------------------Strike out The Task ---------------------------  */
  /*  const getTaskStyle = (isDone) => {
    return {
      textDecoration: isDone ? "line-through" : "none",
    };
  }; */
  /* _______________________________________________________________________ */
  /* --------------------------- Main Div  ---------------------------  */

  return (
    <div>
      <h4>To do List </h4>
      <input
        type="text"
        placeholder="Add a Task"
        value={newTodo}
        onChange={updateTaskValue}
      />
      <button onClick={addNewTask}>Add task </button>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>
              &nbsp;
              <button onClick={() => deleteTask(todo.id)}>Delete </button>
              &nbsp;
              <button onClick={() => upperCaseOne(todo.id)}>
                UppercaseOne
              </button>
              <button onClick={() => marksAsDoneOne()}>Mark as Done</button>
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <button onClick={upperCaseAll}>Upcase all </button>
      &nbsp;&nbsp;
      <button onClick={lowerCaseAll}>Lowercase all </button>
      <button onClick={markAllAsDone}>Mark all </button>
    </div>
  );
}
