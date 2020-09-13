import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";

const EditProfile = (props) => {
  const { handleSubmit } = useForm();
  // const [image, setImage] = useState()

  const currentImage = JSON.parse(localStorage.getItem('jobseeker')).image; 
  const currentEmail = JSON.parse(localStorage.getItem('jobseeker')).email; 
  // setImage(currentImage)

  const onSubmit = () => {
    const formData = new FormData();
    const imageField = document.querySelector('input[name="image"]')
    const nameField = document.querySelector('input[name="jobseekerName"]')
    const bioField = document.querySelector('textarea[name="jobseekerBio"]')
    const titleField = document.querySelector('input[name="jobseekerTitle"]')
    const locationField = document.querySelector('input[name="jobseekerLocation"]')
    const educationTitleField = document.querySelector('input[name="education"]')
    const educationStartDate = document.querySelector('input[name="startDate"]')
    const educationEndDate = document.querySelector('input[name="endDate"]')
    const jobTitleField = document.querySelector('input[name="jobTitle"]')
    const startDateJobField = document.querySelector('input[name="startDateJob"]')
    const endDateJobField = document.querySelector('input[name="endDateJob"]')
    const descriptionField = document.querySelector('textarea[name="jobDescription"]')
    const emailField = document.querySelector('input[name="email"]')
    formData.append('image', imageField.files[0])
    formData.append('email', emailField.value)
    formData.append('name', nameField.value)
    formData.append('bio', bioField.value)
    formData.append('title', titleField.value)
    formData.append('location', locationField.value)
    formData.append('education_title', educationTitleField.value)
    formData.append('education_date_start', educationStartDate.value)
    formData.append('education_date_end', educationEndDate.value)
    formData.append('exp_title', jobTitleField.value)
    formData.append('date_start', startDateJobField.value)
    formData.append('date_end', endDateJobField.value)
    formData.append('description', descriptionField.value)
  };

  return (
    <div className="view-grid">
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div>
          <img src={currentImage} style={{"height": 200}} alt="pic" />  
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
          <input name="email" value={currentEmail} type="hidden"></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

// TODO: add default values based on current user, add upload support with AWS
