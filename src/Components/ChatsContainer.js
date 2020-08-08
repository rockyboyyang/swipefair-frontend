import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SingleChatBox from './SingleChatBox'
import "../stylesheets/chatsContainer.css";

const ChatsContainer = () => {
    // TODO:  make url dynamic
    // make one for jobseeker and company
    const herokuUrl = "https://boiling-sands-04799.herokuapp.com/api/jobseekers/1/chats";
    const[chatsState, setChatsState] = useState([])
    const data = async () => {
        const response = await fetch(herokuUrl); // + '/'
        const { chats } = await response.json();
        setChatsState(chats);
        console.log(chatsState)
    };

    useEffect(() => {
        data();
    }, [])
    return (
        <div className="center-container">
            {chatsState.map((chat) => 
            <SingleChatBox chat={chat}/>)}
        </div>
    )
};

export default ChatsContainer;
