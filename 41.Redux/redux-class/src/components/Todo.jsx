import { useSelector } from "react-redux";

export default function Todo() {
  const todos = useSelector((state) => {
    state.todos;
  });
  console.log(todos);
  return (
    <div>
      <h1> hi from Todo.jsx</h1>
    </div>
  );
}
