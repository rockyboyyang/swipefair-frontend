import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";

const EditProfile = () => {
  let history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState({});
  const { handleSubmit, errors, register } = useForm();
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
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
      .then(({ jobseeker }) => {
        setUser(jobseeker);
        const res = jobseeker;
        // console.log(res)
        const newData = {
          ...JSON.parse(localStorage.getItem("jobseeker")),
          ...res,
        };
        localStorage.setItem("jobseeker", JSON.stringify(newData));
        setTimeout(() => {
          setSubmitting(false);
          history.push("/myprofile");
        }, 2000)
      });
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
            <label htmlFor="image"><span>*</span>Image: </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg"
              ref={register({
                required: {
                  value: true,
                  message: "Please upload your picture",
                },
              })}
            />
            {errors.image ? (
              <div>{errors.image.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="name"><span>*</span>Name: </label>
            <input
              type="text"
              name="jobseekerName"
              defaultValue={user.name}
              onChange={(e) => setInputValue(e.target.value)}
              ref={register({
                required: {
                  value: true, 
                  message: "Please enter your name"
                } 
              })}
            />
            {errors.jobseekerName ? (
              <div>{errors.jobseekerName.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="location">
              <span>*</span>Location:{" "}
            </label>
            <input
              type="text"
              name="jobseekerLocation"
              defaultValue={user.location}
              onChange={(e) => setInputValue(e.target.value)}
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your location",
                },
              })}
            />
            {errors.jobseekerLocation ? (
              <div>{errors.jobseekerLocation.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="title"><span>*</span>Title: </label>
            <input
              type="text"
              name="jobseekerTitle"
              defaultValue={user.title}
              onChange={(e) => setInputValue(e.target.value)}
              ref={register({
                required: {
                  value: true, 
                  message: "Please provide your title"
                } 
              })}
            />
            {errors.jobseekerTitle ? (
              <div>{errors.jobseekerTitle.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="bio"><span>*</span>Bio: </label>
            <textarea
              rows="4"
              cols="50"
              name="jobseekerBio"
              defaultValue={user.bio}
              onChange={(e) => setInputValue(e.target.value)}
              ref={register({
                required: {
                  value: true, 
                  message: "Please tell us about yourself"
                } 
              })}
            />
            {errors.jobseekerBio ? (
              <div>{errors.jobseekerBio.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="education"><span>*</span>Education: </label>
            <input
              type="text"
              name="education"
              defaultValue={user.education_title}
              onChange={(e) => setInputValue(e.target.value)}
              ref={register({
                required: {
                  value: true, 
                  message: "Please enter your education"
                } 
              })}
            />
            {errors.education ? (
              <div>{errors.education.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="startDate"><span>*</span>Start Date (if specific date unknown, please select the first of the month): </label>
            <input
              type="date"
              name="startDate"
              defaultValue={new Date(
                user.education_date_start
              ).toLocaleDateString()}
              ref={register({
                required: {
                  value: true, 
                  message: "Please enter start date"
                } 
              })}
            />
            {errors.startDate ? (
              <div>{errors.startDate.message}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="endDate"><span>*</span>End Date (if specific date unknown, please select the first of the month): </label>
            <input
              type="date"
              name="endDate"
              defaultValue={new Date(
                user.education_date_end
              ).toLocaleDateString()}
              ref={register({
                required: {
                  value: true, 
                  message: "Please enter end date"
                } 
              })}
            />
            {errors.endDate ? (
              <div>{errors.endDate.message}</div>
            ) : null}
          </div>
          {submitting ? <button>Saving your changes...</button> : <button>Save Changes</button>}
          <button disabled ={submitting} className="btn btn-link">
            <Link to="/myprofile">Cancel</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

