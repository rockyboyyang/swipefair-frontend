import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
// import {ourGet} from '../utils'



const Home = ({matchesState, setMatchesState}) => {
    // const jobseekerId = JSON.parse(localStorage.jobseeker).id
    // useEffect(()=>{},[swipesState])
    // console.log(`${matchesState} from the Home Component`)

  return (
    <div className='view-grid'>
      <Navbar />
      <div className="body-view">
        <MatchesContainer matchesState={matchesState} setMatchesState={setMatchesState}/>
        <SwipeContainer setMatchesState={setMatchesState}/>
        <AboutUsContainer />
      </div>
    </div>
  );
};

export default Home;
