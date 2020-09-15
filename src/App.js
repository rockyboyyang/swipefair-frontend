import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import ChatsView from "./Components/Pages/ChatsView";
import MessagesView from "./Components/Pages/MessagesView";
import EditProfile from "./Components/Pages/EditProfile";
import backendURL from "./backendURL";

const App = props => {
  const [tokenState, setToken] = useState(localStorage.access_token);
  let jobseeker;
  let company;
  try { 
    if (window.localStorage.jobseeker !== 'undefined') jobseeker = JSON.parse(localStorage.jobseeker)
    if (window.localStorage.company !== 'undefined') company = JSON.parse(localStorage.company)
  } catch (e) {
    console.log(e)
  }
  const [jobseekerState, setJobseeker] = useState(jobseeker);
  const [companyState, setCompany] = useState(company);
  const [chatId, setChatId] = useState('')
  const [matchesState, setMatchesState] = useState([])
  const [userCompanyOpenings, setUserCompanyOpenings] = useState({})
  // console.log(JSON.parse(localStorage.company))
  const changeMatchState = (newState) => {
    return setMatchesState(newState);
  }
  
  const getUserCompanyOpenings = async () => {
    let response = await fetch(backendURL + 'api/openings')
    const { opening } = await response.json()
    let userOpenings = opening.filter((element) => {
      return element.company_name === companyState.company_name
    })
    // console.log(opening)
    setUserCompanyOpenings(userOpenings)
  }

  useEffect(() => {
    if(companyState) {
      getUserCompanyOpenings()
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props} setToken={setToken} setJobseeker={setJobseeker} setCompany={setCompany} companyState={companyState}/>} />
        {/* <Route path="/login" component={Login} setToken={setToken} setJobseeker={setJobseeker} companyState={companyState} /> */}
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" render={(props) => <Home {...props} matchesState={matchesState} setMatchesState={changeMatchState} jobseekerState={jobseekerState} companyState={companyState} userCompanyOpenings={userCompanyOpenings}/>} />
        <Route path="/chats" render={(props) => <ChatsView {...props} companyState={companyState} jobseekerState={jobseekerState} matchesState={matchesState} setChatId={setChatId} setMatchesState={changeMatchState} userCompanyOpenings={userCompanyOpenings}/>} />
        <Route path="/messages/:chatId" render={(props) => <MessagesView {...props} chatId={props.match.params.chatId} companyState={companyState} jobseekerState={jobseekerState} matchesState={matchesState} setMatchesState={changeMatchState} />} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
};



export default App;
