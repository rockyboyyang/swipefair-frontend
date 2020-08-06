import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../stylesheets/navbar.css"

const Navbar = (props) => {
    return (
        <div className="navbar-container">
            <div className="my-profile-link">
              <h4>My Profile</h4>
            </div>
            <div className="swipefair-logo">
              <img src="assets/swipefair-logo.png" />
            </div>
            <div className="sign-out-link">
              <h4>Sign Out</h4>
            </div>
        </div>
    )
};

export default Navbar;
