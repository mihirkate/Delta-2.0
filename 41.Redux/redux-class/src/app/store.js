import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoslice";
export default configureStore({
  reducer: todoReducer,
});
