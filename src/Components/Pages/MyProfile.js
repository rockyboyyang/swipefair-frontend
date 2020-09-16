import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/myprofile.css";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Experiences from '../Experiences'
import Modal from '../Modal'
import '../../stylesheets/myprofile.css'

const MyProfile = ({ jobseekerState }) => {
    let history = useHistory()
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)
    const [allexperiences, setAllexperiences] = useState([])


    const openModal = () => setShow(true)
    const closeModal = () => setShow(false)

    const id = jobseekerState.id

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
    <div className="view-grid experience">
      <Navbar />
      <div className='edit-profile-container'>
        <Modal show={show} closeModal={closeModal} setAllexperiences={setAllexperiences} allexperiences={allexperiences}/>
        <div>
          <h3>Profile</h3>
        </div>
        <div>
          <img src={user.image} style={{ height: 200 }} alt="pic" />
        </div>
        <div>
            {user.name}
        </div>
        <div>
            <FaEdit onClick={() => history.push('/editprofile')}/>
            <p>Edit Profile</p>
        </div>
        <div>
            Title: {user.title}
        </div>
        <div>
            Location: {user.location}
        </div>
        <div>
            About me: {user.bio}
        </div>
        <div>
            Education: {user.education_title}
        </div>
        <div>
            Start Date: {new Date(user.education_date_start).toLocaleDateString()}
        </div>
        <div>
            End Date: {new Date(user.education_date_end).toLocaleDateString()}
        </div>
        <div>
            Experiences:
            <div>
                {/* !show is added in front of button element so that button only renders 
                when a modal is not open  */}
                {!show && <FaPlus onClick={openModal}></FaPlus>}
                <p>Add Experience</p>
                {/* <Modal show={show} closeModal={closeModal}/> */}
            </div>
        </div>
        <div>
            <Experiences allexperiences={allexperiences}/>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
