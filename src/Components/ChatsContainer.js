import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SingleChatBox from './SingleChatBox'
import "../stylesheets/chatsContainer.css";

const ChatsContainer = ({ companyState, jobseekerState, setChatId }) => {
    // TODO:  make url dynamic
    // make one for jobseeker and company
    let role;
    let id;
    if (companyState !== 'undefined') id = JSON.parse(companyState).id
    if (jobseekerState !== 'undefined') id = JSON.parse(jobseekerState).id

    jobseekerState !== 'undefined' ? role = 'jobseekers' : role = 'companies'

    // TODO: change to heroku in the future
    const herokuUrl = `http://localhost:5000/api/${role}/${id}/chats`
    const[chatsState, setChatsState] = useState([])
    const data = async () => {
        const response = await fetch(herokuUrl); // + '/'
        const { chats } = await response.json();
        setChatsState(chats);
    };

    useEffect(() => {
        data();
    }, [])

    return (
        <div className="center-container chats-container">
            {chatsState.map((chat) => 
            <SingleChatBox chat={chat} role={role} setChatId={setChatId} />)}
        </div>
    )
};

export default ChatsContainer;
