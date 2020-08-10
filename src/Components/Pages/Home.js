import React, {useState, useEffect} from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
// import {ourGet} from '../utils'



const Home = ({matchesState, setMatchesState}) => {
    // const jobseekerId = JSON.parse(localStorage.jobseeker).id
  
    // console.log(`${matchesState} from the Home Component`)

  return (
    <div className='home-view'>
      <Navbar />
<<<<<<< HEAD
      <MatchesContainer matchesState={matchesState}/>
      <SwipeContainer fetchMatches={fetchMatches}  setMatchesState={setMatchesState}/>
=======
      <MatchesContainer matchesState={matchesState} setMatchesState={setMatchesState}/>
      <SwipeContainer setMatchesState={setMatchesState}/>
>>>>>>> master
      <AboutUsContainer />
    </div>
  );
};

export default Home;
