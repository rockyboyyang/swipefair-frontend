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
    }
  }

  if (companyState !== "undefined") {
    if (chattingWithInfo !== undefined) {
      bio = chattingWithInfo.bio;
      email = chattingWithInfo.email;
      image = chattingWithInfo.image;
    }
  }

  return (
    <div className="right-container">
      {chattingWithName}
      <div>{bio}</div>
      <div>{email}</div>
      <div>{openings}</div>
    </div>
  );
};

export default Details;
