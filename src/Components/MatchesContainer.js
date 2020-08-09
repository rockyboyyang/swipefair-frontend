import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../stylesheets/matches.css";
import SwipeContainer from "./SwipeContainer";
import CompanyList from './CompanyList'



const MatchesContainer = ({matchesState}) => { 
  // const jobseekerId = JSON.parse(localStorage.jobseeker).id
    return ( matchesState.length ? 
        <div className="center-container">
          div
          <div>Matched with the Following Companies</div>
            {matchesState.map((match) => 
              
            <CompanyList match={match} /*setMatchesState={setMatchesState}*//>)}
        </div> : <div>No matches yet</div>
    )
  

};



export default MatchesContainer;

