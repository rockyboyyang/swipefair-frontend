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

  if (chattingWithInfo !== undefined) {
    bio = chattingWithInfo.bio;
    email = chattingWithInfo.email;
    image = chattingWithInfo.image;
    openings = chattingWithInfo.openings;
    return (
      <>
        {jobseekerState ? (
          <div className="right-container">
            <img className="details-image" src={image}/>
            <div className="details-header">
              <h2>{chattingWithName}</h2>
            </div>
            <div className="details-bio">
              <h4>About</h4>
              <p>{bio}</p>
            </div>
            <div className="details-contact">
              <h4>Contact</h4>
              <p>{email}</p>
            </div>
            <h3 className="op-details-header">Openings</h3>
            <div className="op-details-container">
              {openings.map((op) =>
                <div className="details-opening">
                  <h4>{op.title}</h4>
                  <p>{op.description}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="right-container">
            <img className="details-image" src={image} />
            <div className="details-header">
              <h2>{chattingWithName}</h2>
            </div>
            <div className="details-bio">
              <h4>About</h4>
              <p>{bio}</p>
            </div>
            <div className="details-contact">
              <h4>Contact</h4>
              <p>{email}</p>
            </div>
            <div className="details-title">
              <h4>Title</h4>
              <p>{chattingWithInfo.title}</p>
            </div>
            <div className="details-location">
              <h4>Location</h4>
              <p>{chattingWithInfo.location}</p>
            </div>
            {/* <h3 className="op-details-header">Openings</h3> */}
            {/* <div className="op-details-container">
              {openings.map((op) =>
                <div className="details-opening">
                  <h4>{op.title}</h4>
                  <p>{op.description}</p>
                </div>
              )}
            </div> */}
          </div>
        )}
      </>
    );
  }
  // if (jobseekerState !== undefined) {

  // }

  if (companyState !== undefined) {
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
