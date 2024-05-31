import Profile from "../../assets/profile.jpg";

import "./rightbar.css";

function RightBar() {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="items">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <span>Abhishek Rathore</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <span>Abhishek Rathore</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="items">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <p>
                <span>Abhishek Rathore</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <p>
                <span>Abhishek Rathore</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <p>
                <span>Abhishek Rathore</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <p>
                <span>Abhishek Rathore</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="items">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <div className="online"></div>
              <span>Abhishek Rathore</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={Profile} alt="" />
              <div className="online"></div>
              <span>Abhishek Rathore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
