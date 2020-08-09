import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../stylesheets/matches.css";
import SwipeContainer from "./SwipeContainer";
import CompanyList from './CompanyList'



const MatchesContainer = () => { 
  const [matchesState, setMatchesState] = useState([])
  const jobseekerId = JSON.parse(window.localStorage.jobseeker).id
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;

  const fetchMatches = async(jobseekerId)=> {
      const res = await fetch( `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`); // + '/'
      return await res.json();
    };

    useEffect(async()=> {
      setMatchesState(await fetchMatches())
    }, [])

    return  matchesState ? (
        <div className="center-container">
          <div>Matched with the Following Companies</div>
            {matchesState.map((match) => 
            <CompanyList match={match} />)}
        </div>) : (<div>No matches yet</div>)
  

};



export default MatchesContainer;

