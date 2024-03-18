import { useState } from "react";
import CommentsForms from "./CommentsForm";
export default function Form() {
  let [formData, setFormData] = useState({
    fullName: "",
    username: "",
  });

  let handleChange = (event) => {
    let fieldName = event.target.name;
    let newVal = event.target.value;
    setFormData((currData) => {
      currData[fieldName] = newVal;
      return { ...currData, [fieldName]: newVal };
    });
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({
      fullName: "",
      username: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <>
        <CommentsForms />
      </>
    </form>
  );
}
