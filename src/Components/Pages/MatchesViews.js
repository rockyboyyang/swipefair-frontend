import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipesContainer from "../SwipesContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const MatchesView = () => {
  return (
    <>
      <Navbar />
      <MatchesContainer />
      <SwipesContainer />
    </>
  );
};

export default ChatsView;
