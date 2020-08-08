import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import {ourGet} from '../utils'


const ourGet = async(path) => {
  const backendUrl = "http://localhost:5000/api/";
  const response = await fetch(backendUrl + path);
  return await response.json();
}
// const backendUrl = "http://localhost:5000/api";
// const data = async (str) => {
//   const response = await fetch(backendUrl + str);
//   return await response.json();
// };

const Home = () => {
  return (
    <div>
      <Navbar />
      <MatchesContainer />
      <SwipeContainer />
      <AboutUsContainer />
    </div>
  );
};

export default Home;
