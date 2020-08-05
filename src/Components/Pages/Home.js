import React from "react";
import Navbar from "../Navbar"
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";

import { BrowserRouter, Route, Switch } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <Navbar />
      <MatchesContainer />
      <SwipeContainer />
      <AboutUsContainer />
    </div>
  )
}

export default Home;
