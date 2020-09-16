import React from "react";
import {useForm} from "react-hook-form"
import "../stylesheets/myprofile.css";
import config from '../config'

const Modal = (props) => {
  const { show, closeModal, setAllexperiences, allexperiences } = props;
  const {register, reset, handleSubmit} = useForm()
  const id = JSON.parse(localStorage.getItem("jobseeker")).id;

  const onSubmit = (data) => {
      console.log(data)
    fetch(`${config.baseUrl}/jobseekers/${id}/experiences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.experiences)
          console.log(allexperiences)
          const updatedexperiences = [...allexperiences, ...data.experiences]
          setAllexperiences(updatedexperiences)
        })
    
    closeModal()
  }

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <div>
          <button className="button-modal" onClick={closeModal}>
            X
          </button>
          <h1>Add your experience</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="job-experience">Title: </label>
              <input type="text" name="title" required ref={register}></input>
            </div>
            <div>
              <label htmlFor="startDateJob">Start Date: </label>
              <input type="date" name="date_start" required ref={register}></input>
            </div>
            <div>
              <label htmlFor="endDateJob">End Date: </label>
              <input type="date" name="date_end" required ref={register}></input>
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea rows="4" cols="50" name="description" required ref={register}></textarea>
            </div>
            <button>Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
