// frontend/src/components/NavigationRef/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    if (showMenu) setShowMenu(false);
    dispatch(sessionActions.logout());
  };

  const menuClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  if (!user) {
    return (
      <>
        <button className="profile-button" onClick={openMenu}>
          <div className="profile-button-container">
            <i className="fa-solid fa-bars"></i>
            <i className="fas fa-user-circle fa-xl" />
          </div>
        </button>
        <div className={menuClassName} ref={menuRef}>
          <div className="dropdown-wrapper">
            {/* <NavLink className="dropdown-links" to="/login">
              <div>Log In</div>
            </NavLink> */}

            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              onButtonClick={(e) => {
                setShowMenu(false);
              }}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              onButtonClick={(e) => {
                setShowMenu(false);
              }}
            />

            {/* <NavLink className="dropdown-links signup-modal-link" to="/signup">
              <div>Sign Up</div>
            </NavLink> */}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <div className="profile-button-container">
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-shield-cat fa-xl"></i>
        </div>
      </button>
      <div className={menuClassName} ref={menuRef}>
        <div className="dropdown-wrapper">
          <div className="dropdown-user-info">
            <p>
              <b>{user.username}</b>
            </p>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-links">
            <a href=".trips" className="dropdown-trips">
              Trips
            </a>
          </div>
          <div className="dropdown-links">
            <a href="/spots" className="dropdown-spots">
              Airbnb your home
            </a>
          </div>
          <div className="dropdown-divider"></div>

          <div className="dropdown-links logout-link">
            <a onClick={logout}>Log Out</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
