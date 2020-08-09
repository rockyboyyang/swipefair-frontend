import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../stylesheets/matches.css";
import SwipeContainer from "./SwipeContainer";

const MatchesContainer = (props) => { 
  const jobseekerId = JSON.parse(localStorage.jobseeker).id
  const herokuUrl = `https://boiling-sands-04799.herokuapp.com/api/jobseekers/${jobseekerId}/matches`;
  const[matchesState, setMatchesState] = useState([])
  const fetchMatches = async () => {
      const res = await fetch(herokuUrl); // + '/'
      const { matches } = await response.json();
      setMatchesState(matches);
  };

    useEffect(() => {
        fetchMatches();
    }, [matchesState])

    return (
        <div className="center-container">
            {matchesState.map((match) => 
            <MatchDetail match={match} setMatchesState={setMatchesState}/>)}
        </div>
    )
  

  // return <div className="left-container">Hello from Matches Container</div>;
};



export default MatchesContainer;

