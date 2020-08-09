import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import ChatsView from "./Components/Pages/ChatsView";
import MatchesView from "./Components/Pages/MatchesView";
import MessagesView from "./Components/Pages/MessagesView";
import EditProfile from "./Components/Pages/EditProfile";

const App = props => {
  const [tokenState, setToken] = useState(localStorage.access_token);
  const [jobseekerState, setJobseeker] = useState(localStorage.jobseeker);
  const [companyState, setCompany] = useState(localStorage.company);
  const [chatId, setChatId] = useState('')


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props} setToken={setToken} setJobseeker={setJobseeker} setCompany={setCompany} companyState={companyState}/>} />
        {/* <Route path="/login" component={Login} setToken={setToken} setJobseeker={setJobseeker} companyState={companyState} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/chats" render={(props) => <ChatsView {...props} companyState={companyState} jobseekerState={jobseekerState} setChatId={setChatId}/>} />
        <Route path="/messages/:chatId" render={(props) => <MessagesView {...props} chatId={props.match.params.chatId} companyState={companyState} jobseekerState={jobseekerState}/>} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
};



export default App;
