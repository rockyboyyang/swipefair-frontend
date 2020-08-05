import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Login'
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Chats from "./Components/Chats";
import Messages from "./Components/Messages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}  />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/chats" component={Chats} />
        <Route path="/messages" component={Messages} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
