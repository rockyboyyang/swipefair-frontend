import React from "react";
import "../stylesheets/details.css";

const Details = ({ chattingWithInfoState, chattingWithName }) => {
  let [chattingWithInfo] = chattingWithInfoState;
  console.log(chattingWithInfo);
  if (chattingWithInfo) {
    const { email, bio, } = chattingWithInfo;
    return (
      <div className="right-container">
        {chattingWithName}
        {email}
        {bio}
        {/* {openings} */}
      </div>
    );
  } else {
    return null;
  }
};

export default Details;
