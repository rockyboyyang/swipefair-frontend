import React from "react";
import "../stylesheets/details.css";

const Details = ({
  chattingWithInfoState,
  chattingWithName,
  companyState,
  jobseekerState,
}) => {
  let [chattingWithInfo] = chattingWithInfoState;
  let bio;
  let email;
  let image;
  let openings;

  if (jobseekerState !== "undefined") {
    if (chattingWithInfo !== undefined) {
      bio = chattingWithInfo.bio;
      email = chattingWithInfo.email;
      image = chattingWithInfo.image;
      openings = chattingWithInfo.openings;
      return (
        <div className="right-container">
          {chattingWithName}
          <div>{bio}</div>
          <div>{email}</div>
          {openings.map((op) => 
            <div>{op.title}</div>
          )}
        </div>
      );
    }

  }

  if (companyState !== "undefined") {
    if (chattingWithInfo !== undefined) {
      bio = chattingWithInfo.bio;
      email = chattingWithInfo.email;
      image = chattingWithInfo.image;
      return (
        <div className="right-container">
          {chattingWithName}
          <div>{bio}</div>
          <div>{email}</div>
        </div>
      );
    }
  }
  return (
    <></>
  )
};

export default Details;
