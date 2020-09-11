import React, { useState } from "react";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";
import { uploadImage } from "../../uploadImage";

import { BrowserRouter, Route, Switch } from "react-router-dom";
const EditProfile = (props) => {
  const [profileImage, setImage] = useState(undefined);
  const [jobseekerInfo, setJobseekerInfo] = useState({
    location: "",
    title: "",
    bio: "",
    education_title: "",
    education_start: "",
    education_end: "",
  });
  // const [location, setLocation] = useState('')
  // const [title, setTitle] = useState('')
  // const [bio, setBio] = useState('')
  // const [education_title, setTitles ]= useState('')
  // const [education_start, setTitles ]= useState('')
  // const [education_end, setTitles ]= useState('')
  const updateField = (e) => {
    const fieldName = e.targetName;
    const info = {};
    setJobseekerInfo({
      ...setJobseekerInfo,
      ...{ [fieldName]: fieldName },
    });
  };

  const onclick = (e) => {
    e.preventDefault();
    debugger;
    uploadImage(profileImage);
  };
  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form>
          <p>Profile Picture</p>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            id="jobseeker-image"
            name="image"
            accept="image/*"
          />

          <p>Name</p>
          <input
            type="text"
            onChange={updateField}
            id="jobseeker-name"
            name="jobseeker_name"
            value={jobseekerInfo.name}
          />

          <p>Location</p>
          <input
            onChange={updateField}
            type="text"
            name="jobseeker_location"
            id="jobseeker-location"
            value={jobseekerInfo.location}
          />

          <p>Title</p>
          <input
            onChange={updateField}
            type="text"
            name="obseeker_title"
            id="jobseeker-title"
            value={jobseekerInfo.title}
          />

          <p>Bio</p>
          <textarea
            id="jobseeker-bio"
            value={jobseekerInfo.bio}
            rows="4"
            cols="50"
            onChange={updateField}
          />

          <div className="education-container">
            <p>Education</p>
            <input
              onChange={updateField}
              type="text"
              id="education-title"
              value={jobseekerInfo.education_title}
            />
            <p>Start Date</p>
            <input
              onChange={updateField}
              type="month"
              id="education-start"
              value={jobseekerInfo.education_start}
            />
            <p>End Date</p>
            <input
              onChange={updateField}
              type="month"
              id="education-end"
              value={jobseekerInfo.education_end}
            />
          </div>

          <input onClick={onclick} type="submit" value="Accept Changes" />
        </form>
      </div>
    </>
  );
};

export default EditProfile;

// TODO: add default values based on current user, add upload support with AWS
