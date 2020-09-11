import React, { useEffect, useState } from "react";
import "../stylesheets/matches.css";
import CompanyList from "./CompanyList";
import { useHistory, } from "react-router-dom";

export default function MatchesContainer({ setMatchesState, matchesState, jobseekerState, companyState, openingsState  }) {
  const jobseekerId = JSON.parse(window.localStorage.jobseeker).id;
  const jobseekerMatchesUrl = `https://boiling-sands-04799.herokuapp.com/api/jobseekers/${jobseekerId}/matches`;
  let history = useHistory();

  let role;
  let id;
  if (companyState !== 'undefined') id = JSON.parse(companyState).id
  if (jobseekerState !== 'undefined') id = JSON.parse(jobseekerState).id

  jobseekerState !== 'undefined' ? role = 'jobseekers' : role = 'companies'

  // TODO: change to heroku in the future
  const herokuUrl = `https://boiling-sands-04799.herokuapp.com/api/${role}/${id}/chats`
  const [chatsState, setChatsState] = useState([])
  const data = async () => {
    const response = await fetch(herokuUrl); // + '/'
    const { chats } = await response.json();
    setChatsState(chats);
  };

  const fetchMatches = async () => {
    const res = await fetch(jobseekerMatchesUrl); // + '/'
    const response = await res.json();
    return response.matches;
  };

  useEffect(() => {
    data();
  }, [])

  useEffect(() => {
    let setMatches = async () => {
      const data = await fetchMatches()
      console.log(data  )
      setMatchesState(data);
      console.log(matchesState)
    };
    console.log('triggered')
    setMatches()
  }, [openingsState]);

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
    // console.log(matches)
    return (
      <div className="left-container">
        <div className="match-header">
          <h2>Matches</h2>
          <div onClick={redirectToChats}>CHATS</div>
        </div>
        {Object.keys(matches).map((company_name) => (
          <CompanyList company_name={company_name} image={matches[company_name].image} openings={matches[company_name].openings} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="left-container">
        <div className="match-header">
          <h2>Matches</h2>
          <div onClick={redirectToChats}>CHATS</div>
        </div>
        <h2 className="no-matches-header">No matches yet <br /> Swipe to get more matches!</h2>
      </div>
    );
  }
}



