import React from "react";
import "../stylesheets/details.css";
// import { BrowserRouter, Route, Switch } from "react-router-dom";

const Details = ({ chattingWithInfoState, chattingWithName, companyState, jobseekerState }) => {
  let [chattingWithInfo] = chattingWithInfoState
  let bio;
  let email;
  let image;
  let openings;

  if(jobseekerState !== 'undefined') {
    if(chattingWithInfo !== undefined) {
      bio = chattingWithInfo.bio
      email = chattingWithInfo.email
      image = chattingWithInfo.image
      openings = chattingWithInfo.openings
    }
  }

  if(companyState !== 'undefined') {
    if(chattingWithInfo !== undefined) {
      bio = chattingWithInfo.bio
      email = chattingWithInfo.email
      image = chattingWithInfo.image
    }
  }

  return (
  <div className="right-container">{chattingWithName}</div>
  )
};

export default Details;
