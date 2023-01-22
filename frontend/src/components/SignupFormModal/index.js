import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          // console.log("ERROR DATA, ", data.errors);
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signup-form">
      <div className="signup-form-container">
        <header className="signup-title-wrapper">
          <div>
            {/* <button className="modal-close-button" onClick={closeModal}>
              <i className="fa-solid fa-x fa-sm"></i>
            </button> */}
          </div>
          <div className="signup-title">Sign Up</div>
          <div></div>
        </header>
        <div className="signup-form-wrapper">
          <div className="signup-pane">
            <div className="welcome-wrapper">Welcome to PurrBnB</div>
            <form onSubmit={handleSubmit}>
              <div className="errors-style">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </div>
              <div className="form-input">
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={email}
                    // placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="emailInput">Email</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={username}
                    // placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="usernameInput">Username</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={firstName}
                    // placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <label htmlFor="firstNameInput">First Name</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="text"
                    value={lastName}
                    // placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <label htmlFor="lastNameInput">Last Name</label>
                </div>
                <div className="input-box-divider">
                  <input
                    className="input-fields"
                    type="password"
                    value={password}
                    // placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="input-box-end">
                  <input
                    className="input-fields"
                    type="password"
                    value={confirmPassword}
                    // placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirmPasswordInput">Confirm Password</label>
                </div>
              </div>
              <button className="form-button" type="submit">
                <span>Sign Up</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormModal;
