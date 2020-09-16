import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {useHistory} from "react-router-dom"
import { useForm } from "react-hook-form";
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";

const EditProfile = () => {
  let history = useHistory()
  const { handleSubmit } = useForm();
  const storedUser = JSON.parse(localStorage.getItem("jobseeker"));

  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState({});

  const id = JSON.parse(localStorage.getItem("jobseeker")).id;

  useEffect(() => {
    fetch(`${config.baseUrl}/jobseekers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ jobseeker }) => {
        setUser(jobseeker);
      });
  }, []);

  const onSubmit = () => {
    const formData = new FormData();
    const imageField = document.querySelector('input[name="image"]');
    const nameField = document.querySelector('input[name="jobseekerName"]');
    const bioField = document.querySelector('textarea[name="jobseekerBio"]');
    const titleField = document.querySelector('input[name="jobseekerTitle"]');
    const locationField = document.querySelector(
      'input[name="jobseekerLocation"]'
    );
    const educationTitleField = document.querySelector(
      'input[name="education"]'
    );
    const educationStartDate = document.querySelector(
      'input[name="startDate"]'
    );
    const educationEndDate = document.querySelector('input[name="endDate"]');
    formData.append("image", imageField.files[0]);
    formData.append("name", nameField.value);
    formData.append("bio", bioField.value);
    formData.append("title", titleField.value);
    formData.append("location", locationField.value);
    formData.append("education_title", educationTitleField.value);
    formData.append("education_date_start", educationStartDate.value);
    formData.append("education_date_end", educationEndDate.value);

    fetch(`${config.baseUrl}/jobseekers/${id}`, {
      method: "PUT",
      body: formData,
    })
    .then((res) => res.json())
    .then(({jobseeker}) => {
      setUser(jobseeker);
      const res = jobseeker
      console.log(res)
      const newData = {...JSON.parse(localStorage.getItem('jobseeker')), ...res}
      console.log(newData)
      localStorage.setItem('jobseeker', JSON.stringify(newData))
      history.push('/myprofile')
    })
  };

  return (
    <div className="view-grid">
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div>
          <img src={user.image} style={{ height: 200 }} alt="pic" />
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="image">Image: </label>
            <input type="file" name="image" accept="image/jpeg" />
          </div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="jobseekerName"
              defaultValue={user.name}
              onChange={(e) => setInputValue(e.target.value)}
              // value={inputValue}
            />
          </div>
          <div>
            <label htmlFor="location">Location: </label>
            <input
              type="text"
              name="jobseekerLocation"
              defaultValue={user.location}
              onChange={(e) => setInputValue(e.target.value)}
              // value={inputValue}
            />
          </div>
          <div>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="jobseekerTitle"
              defaultValue={user.title}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio: </label>
            <textarea
              rows="4"
              cols="50"
              name="jobseekerBio"
              defaultValue={user.bio}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <h3>Education</h3>
            <label htmlFor="education">School: </label>
            <input
              type="text"
              name="education"
              defaultValue={user.education_title}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              name="startDate"
              defaultValue={new Date(user.education_date_start).toLocaleDateString()}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              name="endDate"
              defaultValue={new Date(user.education_date_end).toLocaleDateString()}
            />
          </div>
          <button>Save Changes</button>
          <button className="btn btn-link">
                <Link to="/myprofile">Cancel</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

// TODO: add default values based on current user, add upload support with AWS
