import React, { useState, useEffect } from "react";
import "../stylesheets/matches.css";
import CompanyList from "./CompanyList";

export default function MatchesContainer({ setMatchesState, matchesState }) {
  const jobseekerId = JSON.parse(window.localStorage.jobseeker).id;
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;

  const fetchMatches = async () => {
    const res = await fetch(jobseekerMatchesUrl); // + '/'
    const response = await res.json();
    console.log(response);
    return response.matches;
  };

  useEffect(() => {
    (async () => {
      console.log(setMatchesState);
      setMatchesState(await fetchMatches());
    })();
  }, []);

  const combineCompanies = (arrOfObjs) => {
    const ans = {};
    arrOfObjs.forEach((value) => {
      if (ans[value.company.company_name] === undefined) {
        ans[value.company.company_name] = {image: value.company.image, openings:[value.openings]};
      } else {
        ans[value.company.company_name].openings.push(value.openings);
      }
    });
    return ans;
  };

  if (matchesState.length) {
    const matches = combineCompanies(matchesState);
    return (
      <div className="left-container">
        <div>Matched with the Following Companies</div>
        {Object.keys(matches).map((company_name) => (
          <CompanyList company_name={company_name} image={matches[company_name].image} openings={matches[company_name].openings} />
        ))}
      </div>
    );
  } else {
    return <div className="left-container">No matches yet</div>;
  }
}
