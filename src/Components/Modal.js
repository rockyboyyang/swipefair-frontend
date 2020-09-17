import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../stylesheets/myprofile.css";
import config from "../config";

const Modal = (props) => {
  const { show, closeModal, setAllexperiences, allexperiences } = props;
  const { register, handleSubmit, errors } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const id = JSON.parse(localStorage.getItem("jobseeker")).id;

  const onSubmit = (data, e) => {
    setSubmitting(true);
    fetch(`${config.baseUrl}/jobseekers/${id}/experiences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedexperiences = [...allexperiences, ...data.experiences];
        setAllexperiences(updatedexperiences);
      });
    setTimeout(() => {
      e.target.reset();
      setSubmitting(false);
      closeModal();
    }, 2000)
  };

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
              <label htmlFor="job-experience">
                <span>*</span>Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                ref={register({
                  required: {
                    value: true,
                    message: "Please provide your job title",
                  },
                })}
              ></input>
              {errors.title ? <div>{errors.title.message}</div> : null}
            </div>
            <div>
              <label htmlFor="startDateJob">
                <span>*</span>Start Date (if specific date unknown, please
                select the first of the month):{" "}
              </label>
              <input
                type="date"
                name="date_start"
                id="date_start"
                ref={register({
                  required: {
                    value: true,
                    message: "Please provide start date",
                  },
                })}
              ></input>
              {errors.date_start ? (
                <div>{errors.date_start.message}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="endDateJob">
                <span>*</span>End Date (if specific date unknown, please select
                the first of the month):{" "}
              </label>
              <input
                type="date"
                name="date_end"
                id="date_end"
                ref={register({
                  required: {
                    value: true,
                    message: "Please provide end date",
                  },
                })}
              ></input>
              {errors.date_end ? <div>{errors.date_end.message}</div> : null}
            </div>
            <div>
              <label htmlFor="description">
                <span>*</span>Description:
              </label>
              <textarea
                rows="4"
                cols="50"
                name="description"
                id="description"
                ref={register({
                  required: {
                    value: true,
                    message: "Please provide a brief description of your job",
                  },
                })}
              ></textarea>
              {errors.description ? (
                <div>{errors.description.message}</div>
              ) : null}
            </div>
              {submitting ? <button>Submitting</button> : <button>Submit</button> }
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
