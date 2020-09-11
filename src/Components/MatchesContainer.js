import React, { useEffect, useState } from "react";
import "../stylesheets/matches.css";
import CompanyList from "./CompanyList";
import { useHistory, } from "react-router-dom";

export default function MatchesContainer({ setMatchesState, matchesState, jobseekerState, companyState, openingsState  }) {
  let jobseekerId;
  try {
    jobseekerId = JSON.parse(window.localStorage.jobseeker).id;
  } catch (e) {
    // console.log(e)
  }
  const jobseekerMatchesUrl = `http://localhost:5000/api/jobseekers/${jobseekerId}/matches`;
  let history = useHistory();

  let role;
  let id;

  if (companyState !== 'undefined') {
    try {
      id = companyState.id
    } catch (e) {

    }
  }
  if (jobseekerState !== 'undefined') {
    try {
      id = jobseekerState.id
    } catch (e) {

    }
  }
  console.log(id, 'id')
  jobseekerState !== 'undefined' ? role = 'jobseekers' : role = 'companies'

  // TODO: change to heroku in the future
  const herokuUrl = `http://localhost:5000/api/${role}/${id}/chats`
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
      // console.log(data  )
      setMatchesState(data);
      // console.log(matchesState)
    };
    // console.log('triggered')
    setMatches()
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
  let matches;
  if (matchesState.length) {
    matches = combineCompanies(matchesState);
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



