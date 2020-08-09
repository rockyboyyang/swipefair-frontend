import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "../stylesheets/messagesContainer.css";
import SingleMessageBox from './SingleMessageBox'
const MessagesContainer = ({ role, chattingWithName, messageState, sendMessage, goBack, newMessageState, handleNewMessageState, jobseekerState, companyState }) => {

    return (
        <div className="center-container messages-container">
            <nav>
                <div onClick={goBack}>
                    BACK
                </div>
                <div>
                    <h1>{chattingWithName}</h1>
                </div>
            </nav>
            <div className="messages_display">
                {messageState.map((message) => 
                <SingleMessageBox message={message} jobseekerState={jobseekerState} companyState={companyState} role={role}/>)}
            </div>
            <form>
                <input className="text-box"
                type="text" 
                placeholder="Enter Message" 
                value={newMessageState}
                onChange={handleNewMessageState}>
                </input>
                <button onClick={sendMessage}>Send Message</button>
            </form>
        </div>
    )
};

export default MessagesContainer;
