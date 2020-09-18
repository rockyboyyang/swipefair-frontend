import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../stylesheets/myprofile.css";
import config from "../config";
import { FaWindowClose } from "react-icons/fa";


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
    }, 2000);
  };

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <div>
          {/* <button className="button-modal" onClick={closeModal}>
            <FaWindowClose />
          </button> */}
          <FaWindowClose className="button-modal" onClick={closeModal}>
          </FaWindowClose>
          <h2>Add your experience</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                marginTop: "10px",
                borderTop: "1px solid lightseagreen",
              }}
            >
              <label style={{ paddingBottom: "5px" }} htmlFor="job-experience">
                <span style={{ color: "lightseagreen" }}>*</span>Title:
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
                style={{ padding: "6px" }}
              ></input>
              {errors.title ? (
                <div style={{ color: "lightseagreen" }}>
                  {errors.title.message}
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <label style={{ paddingBottom: "5px" }} htmlFor="startDateJob">
                <span style={{ color: "lightseagreen" }}>*</span>Start Date (if
                specific date unknown, please select the first of the month):{" "}
              </label>
              <input
                type="date"
                name="date_start"
                id="date_start"
                ref={register({
                  required: {
                    value: true,
                    message: "Please select start date",
                  },
                })}
                style={{ padding: "4px", width: "fit-content" }}
              ></input>
              {errors.date_start ? (
                <div style={{ color: "lightseagreen" }}>
                  {errors.date_start.message}
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <label style={{ paddingBottom: "5px" }} htmlFor="endDateJob">
                <span style={{ color: "lightseagreen" }}>*</span>End Date (if
                specific date unknown, please select the first of the month):{" "}
              </label>
              <input
                type="date"
                name="date_end"
                id="date_end"
                ref={register({
                  required: {
                    value: true,
                    message: "Please select end date",
                  },
                })}
                style={{ padding: "4px", width: "fit-content" }}
              ></input>
              {errors.date_end ? (
                <div style={{ color: "lightseagreen" }}>
                  {errors.date_end.message}
                </div>
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <label style={{ paddingBottom: "5px" }} htmlFor="description">
                <span style={{ color: "lightseagreen" }}>*</span>Description:
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
                <div style={{ color: "lightseagreen" }}>
                  {errors.description.message}
                </div>
              ) : null}
            </div>
            <div style={{display: 'flex', justifyContent: "flex-start", padding: "10px"}}>
            {submitting ? (
              <button className="submit-button">
                Submitting
              </button>
            ) : (
              <button className="submit-button">
                Submit
              </button>
            )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
