import React from "react";
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import SwipeContainer from "../SwipeContainer";
import AboutUsContainer from "../AboutUsContainer";
import '../../stylesheets/homeview.css'
import { useHistory, } from "react-router-dom";
// import {ourGet} from '../utils'



const Home = ({matchesState, setMatchesState, jobseekerState, companyState }) => {
    // const jobseekerId = JSON.parse(localStorage.jobseeker).id
    // useEffect(()=>{},[swipesState])
  let history = useHistory()
  if (!localStorage.access_token) {
    history.push('/login')
  }
  return (
    <div className='view-grid'>
      <Navbar />
      <div className="body-view">
        <MatchesContainer jobseekerState={jobseekerState} companyState={companyState} matchesState={matchesState} setMatchesState={setMatchesState}/>
        <SwipeContainer setMatchesState={setMatchesState}/>
        <AboutUsContainer />
      </div>
    </div>
  );
};

export default Home;
