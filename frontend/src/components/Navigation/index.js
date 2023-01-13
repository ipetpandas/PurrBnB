import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <div className="nav-parent">
      <div className="nav-container">
        <div className="home-icon">
          <NavLink exact to="/">
            <i class="fa-solid fa-cat fa-xl"></i>
            purrbnb
          </NavLink>
        </div>
        {/* <div className="search-bar"> Search Bar </div> */}
        <div className="profile-links">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
