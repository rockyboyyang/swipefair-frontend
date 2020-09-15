import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'
import config from "../../config";
import Navbar from "../Navbar";
import "../../stylesheets/myprofile.css";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Experiences from '../Experiences'

const MyProfile = ({ jobseekerState }) => {
    let history = useHistory()
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState({})
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


  return (
    <div className="view-grid">
      <Navbar />
      <div className='edit-profile-container'>
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
                <FaPlus onClick={() => console.log("hi")}/>
                <p>Add Experience</p>
            </div>
        </div>
        <div>
            <Experiences />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
