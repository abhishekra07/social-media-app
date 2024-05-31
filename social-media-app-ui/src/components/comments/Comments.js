import Profile from "../../assets/profile.jpg";

import "./comments.css";

function Comments() {
  return (
    <div className="comments">
      <div className="write">
        <img src={Profile} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      <div className="comment">
        <img src={Profile} alt="" />
        <div className="comment-info">
          <span>Abhishek</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut
          </p>
        </div>
        <span className="date">1 min ago</span>
      </div>
    </div>
  );
}

export default Comments;
