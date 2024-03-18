import { useState } from "react";

export default function CommentsForms() {
  let [formData, setFormData] = useState({
    username: "",
    remarks: "",
    rating: 5,
  });

  let handleInputChange = (event) => {
    setFormData((currData) => {
      return {
        ...currData,
        [event.target.name]: event.target.value,
      };
    });
  };

  let handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    setFormData({
      username: "",
      remarks: "",
      rating: 5,
    });
  };
  return (
    <div>
      <h4>Give a comment</h4>

      <form onClick={handleSubmit}>
        <br />
        <label htmlFor="username">Username :</label>
        {/* -------Input ------ */}
        <input
          type="text"
          placeholder="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          name="usernname"
        />
        <br /> <br />
        <label htmlFor="remarks">Remarks</label>
        <textarea
          value={formData.remarks}
          onChange={handleInputChange}
          id="remarks"
          name="remarks"
        >
          Remarks
        </textarea>{" "}
        <br /> <br />
        <label htmlFor="ratting">Ratings :</label>{" "}
        <input
          type="number"
          id="rating"
          placeholder="rating"
          value={formData.rating}
          onChange={handleInputChange}
          name="rating"
        />
        <br />
        <br />
        <button>Submit </button>
      </form>
    </div>
  );
}
