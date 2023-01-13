import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <header className="login-title-wrapper">
          <div className="login-title">Log in</div>
        </header>
        <div className="login-form-wrapper">
          <div className="login-pane">
            <div className="welcome-wrapper">Welcome to Airbnb</div>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <div className="form-input">
                <div className="login-input-box">
                  <label for="emailInput">Username or Email</label>
                  <input
                    id="emailInput"
                    name="emailInput"
                    className="email-input"
                    placeholder="Username or Email"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>
                <div className="password-input-box">
                  <label for="passwordInput">Password</label>
                  <input
                    id="passwordInput"
                    name="passwordInput"
                    placeholder="Password"
                    className="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="login-button" type="submit">
                <span className="login-button-gradient"></span>
                <span>Log In</span>
              </button>
              <div className="or-divider-wrapper">
                <div className="or-divider">or</div>
              </div>
              <button className="demo-button" type="submit">
                <div className="demo-button-icon">😊</div>
                <div>Continue as Demo User</div>
                <div></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
