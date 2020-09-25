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
import "../../backendURL";
import backendURL from "../../backendURL";

const MyProfile = ({ jobseekerState, companyState }) => {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({});
  const [comp, setCompany] = useState({});
  const [show, setShow] = useState(false);
  const [allexperiences, setAllexperiences] = useState([]);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // const id = jobseekerState.id;
  let id;
  let fullBackendUrl;
  // let roleBaseUrl;
  let experiencesUrl;
  if (jobseekerState) {
    try {
      id = JSON.parse(localStorage.getItem("jobseeker")).id;
      experiencesUrl = backendURL + `api/jobseekers/${id}/experiences`;
      fullBackendUrl = backendURL + `api/jobseekers/${id}`;
      // roleBaseUrl = backendURL + 'api/jobseekers/'
    } catch (e) {
      // console.log(e);
    }
  } else if (companyState) {
    try {
      id = JSON.parse(localStorage.getItem("company")).id;
      // console.log(id);
      // matchesUrl = backendURL + `api/companies/${id}/matches`
      fullBackendUrl = backendURL + `api/companies/${id}`;
      // roleBaseUrl = backendURL + 'api/companies/'
    } catch (e) {
      // console.log(e);
    }
  }

  const data = async () => {
    const response = await fetch(fullBackendUrl); // + '/'
    const { jobseeker, company } = await response.json();
    if(jobseekerState) {
      setUser(jobseeker);
      return jobseeker;
    } else if (companyState) {
      setCompany(company)
      return company
    }
  } 

  useEffect(() => {
    (async () => {
      const payload = await data();
    })();
    
  }, []);

  useEffect(() => {
    if (jobseekerState) {
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
    }
  }, []);

  // useEffect(() => {
  //   // fetch(`${backendURL}/api/companies/${id}`, {
  //   if (companyState) {
  //     const id = JSON.parse(localStorage.getItem("company")).id;
  //     fetch(`${backendURL}api/companies/${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(({ company }) => {
  //         console.log(company)
  //         setCompany(company);
  //         console.log(comp)
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (jobseekerState) {
      fetch(`${backendURL}api/jobseekers/${id}/experiences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ experiences }) => {
          setAllexperiences(experiences);
        });
    }
  }, []);

  if (jobseekerState) {
    return (
      <div className="view-grid experience" id={show ? "blur" : null}>
        <Navbar />
        <div className="myprofile-container">
          <Modal
            show={show}
            closeModal={closeModal}
            setAllexperiences={setAllexperiences}
            allexperiences={allexperiences}
          />
          <div
            id={show ? "overlay" : null}
            style={{ marginLeft: "35px", padding: "15px" }}
          >
            <h3>Your Profile</h3>
          </div>
          <div
            className="myprofile-image-container"
            id={show ? "overlay" : null}
          >
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
              <div className="body-user-info-fields">
                {user.education_title}
              </div>
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
              <div className="title-user-info-fields" id={show ? "overlay" : null}>Experiences</div>
              <div className="experiences-add-container">
                <div className="add-experience-icon">
                  {<FaPlus id={show ? "overlay" : null} onClick={openModal}></FaPlus>}
                </div>
                <div id={show ? "overlay" : null} style={{ fontSize: 14, color: "gray" }}>
                  Add Experience
                </div>
              </div>
            </div>
            <div>
              <Experiences allexperiences={allexperiences} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="view-grid experience" id={show ? "overlay" : null}>
        <Navbar />
        <div className="myprofile-container">
          {/* <Modal
            show={show}
            closeModal={closeModal}
            setAllexperiences={setAllexperiences}
            allexperiences={allexperiences}
          /> */}
          <div
            id={show ? "overlay" : null}
            style={{ marginLeft: "35px", padding: "15px" }}
          >
            <h3>Your Profile</h3>
          </div>
          <div
            className="myprofile-image-container"
            id={show ? "overlay" : null}
          >
            <img
              src={comp.image}
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
            {comp.company_name}
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
              {/* <div className="user-info-fields">
                <div className="title-user-info-fields"></div>
                <div className="body-user-info-fields">
                  {comp.location === null
                    ? history.push("/editprofile")
                    : comp.location}
                </div>
              </div> */}
              <div className="user-info-fields">
                <div className="title-user-info-fields">Contact Info</div>
                <div className="body-user-info-fields">{comp.email}</div>
              </div>
              <div className="user-info-fields">
                <div className="title-user-info-fields">Location</div>
                <div className="body-user-info-fields">{comp.location}</div>
              </div>
              <div className="user-info-fields">
                <div className="title-user-info-fields">Size</div>
                <div className="body-user-info-fields">{comp.size}</div>
              </div>
              <div className="user-info-fields">
                <div className="title-user-info-fields">Summary</div>
                <div className="body-user-info-fields">{comp.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyProfile;
