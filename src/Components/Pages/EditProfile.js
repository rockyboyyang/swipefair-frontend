import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";

const EditProfile = (props) => {
  const { handleSubmit } = useForm();
  const [image, setImage] = useState()

  

  const onSubmit = () => {
    const formData = new FormData();
    const imageField = document.querySelector('input[name="image"]')
    const nameField = document.querySelector('input[name="image"]')
    const bioField = document.querySelector('input[name="image"]')
    const titleField = document.querySelector('input[name="image"]')
    const locationField = document.querySelector('input[name="image"]')
    const educationTitleField = document.querySelector('input[name="image"]')
    const educationStartDate = document.querySelector('input[name="image"]')
    const educationEndDate = document.querySelector('input[name="image"]')
    const jobTitleField = document.querySelector('input[name="image"]')
    const startDateJobField = document.querySelector('input[name="image"]')
    const endDateJobField = document.querySelector('input[name="image"]')
    const descriptionField = document.querySelector('input[name="image"]')
  };

  return (
    <div className="view-grid">
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div>
          <img src={image} style={{"height": 200}} alt="pic" />  
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="image">Image: </label>
            <input type="file" name="image" accept="image/jpeg" />
          </div>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="jobseekerName" />
          </div>
          <div>
            <label htmlFor="location">Location: </label>
            <input type="text" name="jobseekerLocation" />
          </div>
          <div>
            <label htmlFor="title">Title: </label>
            <input type="text" name="jobseekerTitle" />
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <textarea rows="4" cols="50" name="jobseekerBio" />
          </div>
          <div>
            <h3>Education</h3>
            <label htmlFor="education">School: </label>
            <input type="text" name="education" />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" />
          </div>
          <div>
            <label htmlFor="endDate">End Date: </label>
            <input type="date" name="endDate" />
          </div>
          <div>
            <h3>Experience</h3>
            <label htmlFor="job-experience">Title: </label>
            <input type="text" name="jobTitle"></input>
          </div>
          <div>
            <label htmlFor="startDateJob">Start Date: </label>
            <input type="date" name="startDateJob"></input>
          </div>
          <div>
            <label htmlFor="endDateJob">End Date: </label>
            <input type="date" name="endDateJob"></input>
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <textarea rows="4" cols="50" name="jobDescription"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

// TODO: add default values based on current user, add upload support with AWS
