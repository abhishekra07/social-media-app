import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Profile from "../../assets/profile.jpg";

import "./navbar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="left">
        <span>SocialNest</span>
        <HomeOutlinedIcon className="icon" />
        <GridViewOutlinedIcon className="icon" />
        <div className="search">
          <SearchOutlinedIcon className="icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon className="icon" />
        <MailOutlinedIcon />
        <NotificationsOutlinedIcon className="icon" />
        <div className="userInfo">
          <img src={Profile} alt="User Icon" />
          <span>Abhishek Rathore</span>
        </div>
      </div>
    </div>
  );
}
