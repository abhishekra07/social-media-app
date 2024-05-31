import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContextProvider";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [input, setInput] = useState({ username: "", password: "" });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await login(input);
      navigate("/");
    } catch (e) {
      setErr(e.response.data.error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome to Our Platform</h1>
          <p>
            Welcome back! Please enter your credentials to access your account.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            {err && <p>{err}</p>}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
