import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/myprofile.css";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Experiences from "../Experiences";
import Modal from "../Modal";
import "../../stylesheets/myprofile.css";

const MyProfile = ({ jobseekerState }) => {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [allexperiences, setAllexperiences] = useState([]);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const id = jobseekerState.id;

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

  useEffect(() => {
    fetch(`${config.baseUrl}/jobseekers/${id}/experiences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ experiences }) => {
        setAllexperiences(experiences);
      });
  }, []);

  return (
    <div className="view-grid experience" id={show ? 'blur' : null}>
      <Navbar />
      <div className="myprofile-container" >
        <Modal
          show={show}
          closeModal={closeModal}
          setAllexperiences={setAllexperiences}
          allexperiences={allexperiences}
        />
        <div id={show ? "overlay" : null} style={{marginLeft: "35px", padding: "15px"}}>
          <h3>Your Profile</h3>
        </div>
        <div className="myprofile-image-container" id={show ? "overlay" : null}>
          <img
            src={user.image}
            style={{
              height: 200,
              width: 200,
              borderRadius: "20px",
              padding: "10px",
            }}
            alt="pic"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {user.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div className="edit-icon">
            <FaEdit onClick={() => history.push("/editprofile")} />
          </div>
          <div style={{ color: "gray", fontSize: "14px" }}>Edit profile</div>
        </div>
        <div className="second-section">
          <div id={show ? "overlay" : null}>
            <div className="user-info-fields">
              <div className="title-user-info-fields">Title</div>
              <div className="body-user-info-fields">
                {user.title === null
                  ? history.push("/editprofile")
                  : user.title}
              </div>
            </div>
            <div className="user-info-fields">
              <div className="title-user-info-fields">Location</div>
              <div className="body-user-info-fields">{user.location}</div>
            </div>
            <div className="user-info-fields">
              <div className="title-user-info-fields">Summary</div>
              <div className="body-user-info-fields">{user.bio}</div>
            </div>
          </div>
          <div className="user-info-fields" id={show ? "overlay" : null}>
            <div className="title-user-info-fields">Education</div>
            <div className="body-user-info-fields">{user.education_title}</div>
          </div>
          <div className="user-info-fields" id={show ? "overlay" : null}>
            <div className="title-user-info-fields">Start Date</div>
            <div className="body-user-info-fields">
              {new Date(user.education_date_start).toLocaleDateString()}
            </div>
          </div>
          <div className="user-info-fields" id={show ? "overlay" : null}>
            <div className="title-user-info-fields">End Date</div>
            <div className="body-user-info-fields">
              {new Date(user.education_date_end).toLocaleDateString()}
            </div>
          </div>
          <div className="user-info-fields experiences">
            <div className="title-user-info-fields">Experiences</div>
            <div className="experiences-add-container">
              <div className="add-experience-icon">{<FaPlus onClick={openModal} ></FaPlus>}</div>
              <div style={{fontSize: 14, color: 'gray'}}>Add Experience</div>
            </div>
          </div>
          <div>
            <Experiences allexperiences={allexperiences} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
