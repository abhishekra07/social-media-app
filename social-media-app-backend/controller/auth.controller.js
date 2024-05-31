import query from "../util/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/auth.js";

import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password, name } = req.body;
  const USER_SELECT_QUERY = `SELECT * FROM users WHERE username = '${username}'`;
  try {
    const users = await query(USER_SELECT_QUERY);
    console.log("users ", users);
    if (users.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, error: "Username already exists." });
    } else {
      //use bycrypt library to hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const ADD_NEW_USER_QUERY = `INSERT INTO users (username, password, email, name, profile_picture, cover_picture, active) VALUES ('${username}', '${hashedPassword}', '${email}', '${name}', 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Download.png', 'http://www.rashidaplastics.co.za/wp-content/uploads/2020/07/free-download-beautiful-background-by-yvesia-1024x768-for-your-pretty-png-backgrounds-1024_768.png', 'true')`;
      const user = await query(ADD_NEW_USER_QUERY);

      return res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (e) {
    console.log("Error: ", e);
    return res.status(503).json({ success: false, error: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const USER_SELECT_QUERY = `SELECT * FROM users WHERE username = '${username}'`;
  const users = await query(USER_SELECT_QUERY);
  if (users.rows.length > 0) {
    const user = users.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Password" });
    } else {
      let token = generateToken(
        user,
        process.env.JWT_SECRET,
        process.env.EXPIRES_IN
      );
      const { password, ...others } = user;
      return res
        .cookie("authToken", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          data: others,
        });
    }
  } else {
    return res.status(404).json({ success: true, message: "User not found!!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("auth-token")
    .json({ success: true, message: "Logout successful" });
};
