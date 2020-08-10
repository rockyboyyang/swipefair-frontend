import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import ChatsContainer from "../ChatsContainer";
import AboutUsContainer from "../AboutUsContainer";
import "../../stylesheets/views.css";


const ChatsView = ({ companyState, jobseekerState, setChatId }) => {
  return (
    <>
      <div className="view-grid">
        <Navbar />
        <div className="body-view">
          <div className="dummy-div" />
          {/* <MatchesContainer /> */}
          <ChatsContainer companyState={companyState} jobseekerState={jobseekerState} setChatId={setChatId}/>
          <AboutUsContainer />
        </div>
      </div>
    </>
  );
};

export default ChatsView;
