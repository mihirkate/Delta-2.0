// reducers

import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  todos: [{ id: "abcd", task: "demo-task", isDone: false }],
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducer: {
    // -------------  add in Todo -------------
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        task: action.payload,
        isDone: false,
      };
      state.todos.push(newTodo);
    },

    // -------------  Delete in Todo -------------
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    // -------------  marks as done  in Todo -------------
    markAsDone: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.isDone = true;
        }
      });
    },
  },
});
export const { addTodo, deleteTodo, markAsDone } = todoSlice.actions;
export default todoSlice.reducer;
