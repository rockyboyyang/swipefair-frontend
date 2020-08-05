import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import MessagesContainer from "../MessagesContainer";
import Details from "../Details";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const MessagesView = () => {
  return (
    <>
      <Navbar />
      <MatchesContainer />
      <MessagesContainer />
      <Details />
    </>
  );
};

export default MessagesView;
