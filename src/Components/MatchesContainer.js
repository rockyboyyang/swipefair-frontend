import React, {useState, useEffect} from "react";
import "../stylesheets/matches.css";
import CompanyList from './CompanyList'



const MatchesContainer = () => { 
  const [matchesState, setMatchesState] = useState([])
  const jobseekerId = JSON.parse(window.localStorage.jobseeker).id
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;

  const fetchMatches = async(jobseekerId)=> {
      const res = await fetch(jobseekerMatchesUrl); // + '/'
      return await res.json();
    };

    useEffect(async()=> {
      setMatchesState(await fetchMatches())
    }, [])

    return  matchesState.length ? (
        <div className="left-container">
          <div>Matched with the Following Companies</div>
            {matchesState.map((match) => 
            <CompanyList match={match} />)}
        </div>) : (<div>No matches yet</div>)
  

};

export default MatchesContainer;
