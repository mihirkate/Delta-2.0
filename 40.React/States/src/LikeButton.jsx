import { useState } from "react";

export function LikeButton() {
  let [isLiked, setisLiked] = useState(false);
  let [clicks, setClicks] = useState(0);
  let toggleLike = () => {
    setisLiked(!isLiked);
    setClicks(clicks + 1);
  };
  let countLikes = () => {
    count = +1;
  };
  return (
    <div>
      <br />
      <br />
      <button onClick={toggleLike}>
        {isLiked ? (
          <i className="fa-solid fa-heart"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </button>
      <p>clicks= {clicks}</p>
    </div>
  );
}
