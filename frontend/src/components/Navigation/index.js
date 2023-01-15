import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  // <Navigation> is just a home icon and <ProfileButton>

  // When loaded <Navigation> gets session user
  const sessionUser = useSelector((state) => state.session.user);

  // const sessionLinks = <ProfileButton user={sessionUser} />;

  return (
    <div className="nav-parent">
      <div className="nav-container">
        <div className="home-icon">
          <NavLink exact to="/">
            <i className="fa-solid fa-cat fa-xl"></i>
            purrbnb
          </NavLink>
        </div>
        {/* <div className="search-bar"> Search Bar </div> */}
        {/*Once loaded, render ProfileButton and pass the user prop */}
        {isLoaded && <ProfileButton user={sessionUser}></ProfileButton>}
      </div>
    </div>
  );
}

export default Navigation;

// let sessionLinks;
// if (sessionUser) {
//   sessionLinks = (
//     <li>
//       <ProfileButton user={sessionUser} />
//     </li>
//   );
// } else {
//   sessionLinks = (
//     <li>
//       <NavLink to="/login">Log In</NavLink>
//       <NavLink to="/signup">Sign Up</NavLink>
//     </li>
//   );
// }
