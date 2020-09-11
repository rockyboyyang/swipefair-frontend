import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import MatchesContainer from "../MatchesContainer";
import MessagesContainer from "../MessagesContainer";
import Details from "../Details";
import { BrowserRouter, Route, Switch, useHistory, } from "react-router-dom";
import backendURL from '../../backendURL'


const MessagesView = ({ companyState, jobseekerState, chatId, matchesState, setMatchesState}) => {
  let role_plural;
  let role;
  let id;
  let history = useHistory();

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

  jobseekerState !== 'undefined' ? role = 'jobseeker' : role = 'company'
  jobseekerState !== 'undefined' ? role_plural = 'jobseekers' : role_plural = 'companies'

  if (!localStorage.access_token) {
    history.push('/login')
  }

  const fullBackendUrl = backendURL + `api/${role_plural}/${id}/chats/${chatId}/messages`

  const [messageState, setMessageState] = useState([])
  const [newMessageState, setNewMessageState] = useState('')
  const [chattingWithName, setChattingWithName] = useState('')
  const [chattingWithInfoState, setChattingWithInfoState] = useState([])

  const data = async () => {
    const response = await fetch(fullBackendUrl); // + '/'
    // const lol = await response.json();
    const { messages, name, chatWithInfo } = await response.json();
    let messageArr = []
    for (let i = 0; i < messages.length; i++) messageArr.push(messages[i])
    setChattingWithName(name)
    setMessageState(messageArr);
    setChattingWithInfoState(chatWithInfo)
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessageState) return;
    let postMessageUrl = backendURL + `api/${role_plural}/${id}/chats/${chatId}/messages`
    const body = {
      body: newMessageState,
    }
    const res = await fetch(postMessageUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // TODO:
    // might want to rerender component but this works for now
    if (res.ok) {
      setNewMessageState('')
      data()
    }
  }

  const handleNewMessageState = event => {
    setNewMessageState(event.target.value)
  }

  const goBack = event => {
    history.push('../chats')
  }

  useEffect(() => {
    data();
  }, [])
  return (
    <>
      <div className='view-grid'>
        <Navbar />
        <div className="body-view">
          <MatchesContainer jobseekerState={jobseekerState} companyState={companyState} matchesState={matchesState} setMatchesState={setMatchesState}/>
          <MessagesContainer companyState={companyState}
          jobseekerState={jobseekerState}
          chatId={chatId}
          chattingWithName={chattingWithName}
          messageState={messageState}
          sendMessage={sendMessage}
          goBack={goBack}
          newMessageState={newMessageState}
          setNewMessageState={setNewMessageState}
          handleNewMessageState={handleNewMessageState}
          role={role}/>
          <Details chattingWithInfoState={chattingWithInfoState} chattingWithName={chattingWithName} jobseekerState={jobseekerState} companyState={companyState}/>
        </div>
      </div>
    </>
  );
};

export default MessagesView;
