import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Pages/Login'
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import ChatsView from "./Components/Pages/ChatsView";
import MessagesView from "./Components/Pages/MessagesView";
import EditProfile from "./Components/Pages/EditProfile";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/chats" component={ChatsView} />
        <Route path="/messages" component={MessagesView} />
        <Route path="/editprofile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
