import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import ChatsContainer from "../ChatsContainer";
import AboutUsContainer from "../AboutUsContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const ChatsView = ({ companyState, jobseekerState, setChatId }) => {
  return (
    <>
      <Navbar />
      <MatchesContainer />
      <ChatsContainer companyState={companyState} jobseekerState={jobseekerState} setChatId={setChatId}/>
      <AboutUsContainer />
    </>
  );
};

export default ChatsView;
