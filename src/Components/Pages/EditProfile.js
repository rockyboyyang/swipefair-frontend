import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/edit-profile.css";
import '../../backendURL'
import backendURL from "../../backendURL";

const EditProfile = () => {
  let history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState({});
  const { handleSubmit, errors, register } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const id = JSON.parse(localStorage.getItem("jobseeker")).id;

  useEffect(() => {
    fetch(`${backendURL}api/jobseekers/${id}`, {
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

    fetch(`${backendURL}api/jobseekers/${id}`, {
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
        }, 2000);
      });
  };

  return (
    <div className="view-grid">
      <Navbar />
      <div className="edit-profile-container">
        <h2>Edit Your Profile</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className='form-container'>
            <div className="image-container">
              {/* <div> */}
                <label style={{ paddingBottom: "5px", paddingTop: '5px', fontWeight: 'bold' }} htmlFor="image">
                  <span style={{color: 'lightseagreen'}}>*</span>Profile Photo{" "}
                  </label>
                  <img src={user.image} style={{ width: 200 }} alt="pic" />
              {/* </div> */}
              <div>
                
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg"
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please upload your picture",
                    },
                  })}
                  style={{marginTop: '10px', width: 200}}
                />
                {errors.image ? <div className='errors'>{errors.image.message}</div> : null}
              </div>
            </div>
            <div className="inputs-container">
              <div className="form-input">
                <label htmlFor="name">
                  <span>*</span>Name{" "}
                </label>
                <input
                  type="text"
                  name="jobseekerName"
                  defaultValue={user.name}
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your name",
                    },
                  })}
                />
                {errors.jobseekerName ? (
                  <div className='errors'>{errors.jobseekerName.message}</div>
                ) : null}
                </div>
                <div className="form-input">
                <label htmlFor="location">
                  <span>*</span>Location{" "}
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
                  <div className='errors'>{errors.jobseekerLocation.message}</div>
                ) : null}
              </div>
              <div className="form-input">
                <label htmlFor="title">
                  <span>*</span>Title{" "}
                </label>
                <input
                  type="text"
                  name="jobseekerTitle"
                  defaultValue={user.title}
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please provide your title",
                    },
                  })}
                />
                {errors.jobseekerTitle ? (
                  <div className='errors'>{errors.jobseekerTitle.message}</div>
                ) : null}
              </div>
              <div className="form-input">
                <label htmlFor="bio">
                  <span>*</span>Bio{" "}
                </label>
                <textarea
                  rows="4"
                  cols="50"
                  name="jobseekerBio"
                  defaultValue={user.bio}
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please tell us about yourself",
                    },
                  })}
                />
                {errors.jobseekerBio ? (
                  <div className='errors'>{errors.jobseekerBio.message}</div>
                ) : null}
              </div>
              <div className="form-input">
                <label htmlFor="education">
                  <span>*</span>Education{" "}
                </label>
                <input
                  type="text"
                  name="education"
                  defaultValue={user.education_title}
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your education",
                    },
                  })}
                />
                {errors.education ? <div>{errors.education.message}</div> : null}
              </div>
              <div className="form-input">
                <label htmlFor="startDate">
                  <span>*</span>Start Date (if specific date unknown, please select
                  the first of the month){" "}
                </label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={new Date(
                    user.education_date_start
                  ).toLocaleDateString()}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter start date",
                    },
                  })}
                  style={{ padding: "4px", width: "fit-content" }}
                />
                {errors.startDate ? <div className='errors'>{errors.startDate.message}</div> : null}
              </div>
              <div className="form-input">
                <label htmlFor="endDate">
                  <span>*</span>End Date (if specific date unknown, please select
                  the first of the month){" "}
                </label>
                <input
                  type="date"
                  name="endDate"
                  defaultValue={new Date(
                    user.education_date_end
                  ).toLocaleDateString()}
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter end date",
                    },
                  })}
                  style={{ padding: "4px", width: "fit-content" }}
                />
                {errors.endDate ? <div className='errors'>{errors.endDate.message}</div> : null}
              </div>
              <div className="buttons-container">
                {submitting ? (
                  <button className="submit-edit-button">Saving your changes...</button>
                ) : (
                  <button className="submit-edit-button">Save Changes</button>
                )}
                <button disabled={submitting} className="submit-edit-button">
                  <Link to="/myprofile">Cancel</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
