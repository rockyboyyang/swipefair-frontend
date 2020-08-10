import React, { useState, useEffect } from "react";
import "../stylesheets/matches.css";
import CompanyList from "./CompanyList";
import { useHistory, } from "react-router-dom";

export default function MatchesContainer({ setMatchesState, matchesState }) {
  const jobseekerId = JSON.parse(window.localStorage.jobseeker).id;
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;
  let history = useHistory();
  const fetchMatches = async () => {
    const res = await fetch(jobseekerMatchesUrl); // + '/'
    const response = await res.json();
    return response.matches;
  };

  useEffect(() => {
    (async () => {
      setMatchesState(await fetchMatches());
    })();
  }, []);

  const combineCompanies = (arrOfObjs) => {
    const ans = {};
    arrOfObjs.forEach((value) => {
      if (ans[value.company.company_name] === undefined) {
        ans[value.company.company_name] = {image: value.company.image, openings:[value.opening]};
      } else {
        ans[value.company.company_name].openings.push(value.opening);
      }
    });
    return ans;
  };

  const redirectToChats = () => {
    history.push('/chats')
  }

  if (matchesState.length) {
    const matches = combineCompanies(matchesState);
    console.log(matches)
    return (
      <div className="left-container">
        <div className="match-header">
          <h2>Matched with the Following Companies</h2>
          <div onClick={redirectToChats}>CHATS</div>
        </div>
        {Object.keys(matches).map((company_name) => (
          <CompanyList company_name={company_name} image={matches[company_name].image} openings={matches[company_name].openings} />
        ))}
      </div>
    );
  } else {
    return <div className="left-container">No matches yet</div>;
  }
}



