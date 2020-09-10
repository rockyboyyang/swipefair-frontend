import React, {useState, useEffect} from "react";
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
  const [openingsState, setOpeningsState] = useState([]);
  useEffect(() => {
    console.log('hey')
  }, [matchesState, setMatchesState])
  return (
    <>
      {localStorage.access_token ? (
        <div className='view-grid'>
          <Navbar />
          <div className="body-view">
            <MatchesContainer jobseekerState={jobseekerState} companyState={companyState} matchesState={matchesState} setMatchesState={setMatchesState}  openingsState={openingsState} setOpeningsState={setOpeningsState}/>
            <SwipeContainer setMatchesState={setMatchesState} openingsState={openingsState} setOpeningsState={setOpeningsState}/>
            <AboutUsContainer />
          </div>
        </div>
      ) : (
        <>
        </>
      )}
    </>
  )
};

export default Home;
