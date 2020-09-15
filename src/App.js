import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import ChatsView from "./Components/Pages/ChatsView";
import MessagesView from "./Components/Pages/MessagesView";
import EditProfile from "./Components/Pages/EditProfile";
import MyProfile from "./Components/Pages/MyProfile";

const App = props => {
  const [tokenState, setToken] = useState(localStorage.access_token);
  let jobseeker;
  let company;
  try { 
    jobseeker = JSON.parse(localStorage.jobseeker)
    company = JSON.parse(localStorage.company)
  } catch {

  }
  const [jobseekerState, setJobseeker] = useState(jobseeker);
  const [companyState, setCompany] = useState(company);
  const [chatId, setChatId] = useState('')
  const [matchesState, setMatchesState] = useState([])

  const changeMatchState = (newState) => {
    return setMatchesState(newState);
  }
  
  

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props} setToken={setToken} setJobseeker={setJobseeker} setCompany={setCompany} companyState={companyState}/>} />
        {/* <Route path="/login" component={Login} setToken={setToken} setJobseeker={setJobseeker} companyState={companyState} /> */}
        <Route path="/signup" component={SignUp} />
        <Route exact path="/" render={(props) => <Home {...props} matchesState={matchesState} setMatchesState={changeMatchState} jobseekerState={jobseekerState} companyState={companyState} />} />
        <Route path="/chats" render={(props) => <ChatsView {...props} companyState={companyState} jobseekerState={jobseekerState}  matchesState={matchesState}  setChatId={setChatId} setMatchesState={changeMatchState}/>} />
        <Route path="/messages/:chatId" render={(props) => <MessagesView {...props} chatId={props.match.params.chatId} companyState={companyState} jobseekerState={jobseekerState} matchesState={matchesState} setMatchesState={changeMatchState} />} />
        <Route path="/myprofile" render={(props) => <MyProfile {...props} jobseekerState={jobseekerState}/>} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
};



export default App;
