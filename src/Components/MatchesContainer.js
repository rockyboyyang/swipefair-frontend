import React, {useState, useEffect} from "react";
import "../stylesheets/matches.css";
import CompanyList from './CompanyList'



const MatchesContainer = ({matchesState}) => { 
  // const jobseekerId = JSON.parse(localStorage.jobseeker).id
    return ( matchesState.length ? 
        <div className="left-container">
          <div>Matched with the Following Companies</div>
            {matchesState.map((match) => 
              
            <CompanyList match={match} /*setMatchesState={setMatchesState}*//>)}
        </div> : <div>No matches yet</div>
    )
  

};

export default MatchesContainer;
