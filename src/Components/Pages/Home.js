import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
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
    <div className='home-view'>
      <Navbar />
      <MatchesContainer />
      <SwipeContainer />
      <AboutUsContainer />
    </div>
  );
};

export default Home;
