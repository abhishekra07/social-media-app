import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { useState } from "react";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post(
        "http://localhost:8081/api/users/register",
        input
      );
      navigate("/login");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>SocialNest</h1>
          <p>Please Register</p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            {err && <p>{err}</p>}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
