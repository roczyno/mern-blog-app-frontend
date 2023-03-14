import "./login.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://blogallday-api.onrender.com/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="login-input"
          ref={userRef}
        />
        <label>Password</label>
        <input type="password" className="login-input" ref={passwordRef} />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <button className="login-register-button">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
