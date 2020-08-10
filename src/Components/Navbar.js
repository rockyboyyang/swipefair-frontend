import React from "react";
import { useHistory } from "react-router-dom";
import "../stylesheets/navbar.css"

const Navbar = (props) => {
  let history = useHistory()

  const returnHome = () => {
    history.push('/')
  }

  const editProfile = () => {
    history.push('/editprofile')
  }

  const signOut = () => {
    localStorage.clear()
    history.push('/login')
  }


  return (
      <div className="navbar-container">
          <div className="my-profile-link">
            <h4 onClick={editProfile}>My Profile</h4>
          </div>
          <div className="swipefair-logo">
            <img onClick={returnHome} src="assets/swipefair-logo.png" alt="logo" />
          </div>
          <div className="sign-out-link">
            <h4 onClick={signOut}>Sign Out</h4>
          </div>
      </div>
    )
};

export default Navbar;
