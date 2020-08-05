import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import ChatsContainer from "../ChatsContainer";
import AboutUsContainer from "../AboutUsContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const ChatsView = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MatchesContainer />
      <ChatsContainer />
      <AboutUsContainer />
    </>
  );
};

export default ChatsView;
