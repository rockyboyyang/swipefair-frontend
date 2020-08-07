import React from "react";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css"

import { BrowserRouter, Route, Switch } from "react-router-dom";

const EditProfile = (props) => {
  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form>
          <p>Profile Picture</p>
          <input type="file" id="jobseeker-image" name="img" accept="image/*" />

          <p>Name</p>
          <input type="text" id="jobseeker-name" value="jobseeker-name"/>

          <p>Location</p>
          <input type="text" id="jobseeker-location" value="jobseeker-location"/>

          <p>Title</p>
          <input type="text" id="jobseeker-title" value="jobseeker-title"/>

          <p>Bio</p>
          <textarea id="jobseeker-bio" value="jobseeker-bio" rows="4" cols="50" />

          <div className="education-container">
            <p>Education</p>
            <input type="text" id="education-title" value="education-title"/>
            <p>Start Date</p>
            <input type="month" id="education-start" />
            <p>End Date</p>
            <input type="month" id="education-end" />
          </div>

          <input type="submit" value="Accept Changes" />
        </form>
      </div>
    </>
  );
};

export default EditProfile;

// TODO: add default values based on current user, add upload support with AWS
