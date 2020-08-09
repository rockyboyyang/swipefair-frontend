import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Pages/Login'
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import ChatsView from "./Components/Pages/ChatsView";
import MatchesView from "./Components/Pages/MatchesView";
import MessagesView from "./Components/Pages/MessagesView";
import EditProfile from "./Components/Pages/EditProfile";

const App = props => {
  const [tokenState, setToken] = useState("");
  const [jobseekerState, setJobseeker] = useState("");
  const [companyState, setCompany] = useState("");
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props} setToken={setToken} setJobseeker={setJobseeker} companyState={companyState}/>} />
        {/* <Route path="/login" component={Login} setToken={setToken} setJobseeker={setJobseeker} companyState={companyState} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/matches" component={MatchesView} />

        <Route path="/chats" component={ChatsView} />
        <Route path="/messages" component={MessagesView} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
}



export default App;
