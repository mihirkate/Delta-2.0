import { useState } from "react";

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
      <label htmlFor="fullName">Fulllname &nbsp;</label>
      <input
        type="text"
        placeholder="Your name here "
        value={formData.fullName}
        onChange={handleChange}
        id="fullName"
        name="fullName"
      />
      <input
        type="text"
        placeholder="Your username here "
        value={formData.username}
        onChange={handleChange}
        id="fullName"
        name="username"
      />
      <button>Submit </button>
    </form>
  );
}
