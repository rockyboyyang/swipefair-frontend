import React, {useState, useEffect} from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
// import {ourGet} from '../utils'



const Home = ({matchesState, setMatchesState}) => {
    // const jobseekerId = JSON.parse(localStorage.jobseeker).id
    useEffect(()=>{},[swipesState])
    // console.log(`${matchesState} from the Home Component`)

  return (
    <div className='home-view'>
      <Navbar />
      <MatchesContainer matchesState={matchesState} setMatchesState={setMatchesState}/>
      <SwipeContainer setMatchesState={setMatchesState}/>
      <AboutUsContainer />
    </div>
  );
};

export default Home;
