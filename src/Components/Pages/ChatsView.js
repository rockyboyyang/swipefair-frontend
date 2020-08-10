import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import ChatsContainer from "../ChatsContainer";
import AboutUsContainer from "../AboutUsContainer";
import "../../stylesheets/views.css";
import { useHistory, } from "react-router-dom";


const ChatsView = ({ companyState, jobseekerState, setChatId, matchesState, setMatchesState }) => {
  let history = useHistory()
  if (!localStorage.access_token) {
    history.push('/login')
  }
  return (
    <>
      <div className="view-grid">
        <Navbar />
        <div className="body-view">
          <MatchesContainer jobseekerState={jobseekerState} companyState={companyState} matchesState={matchesState} setMatchesState={setMatchesState} />
          <ChatsContainer companyState={companyState} jobseekerState={jobseekerState} setChatId={setChatId} />
          <AboutUsContainer />
        </div>
      </div>
    </>
  );
};

export default ChatsView;
