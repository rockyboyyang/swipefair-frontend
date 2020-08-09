import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "../stylesheets/messagesContainer.css";

const MessagesContainer = ({ chattingWithName, messageState, sendMessage, goBack, newMessageState, handleNewMessageState }) => {

    return (
        <div className="center-container">
            <nav>
                <div onClick={goBack}>
                    BACK
                </div>
                <div>
                    <h1>{chattingWithName}</h1>
                </div>
            </nav>
            <div>
                {messageState.map((message) => 
                <div className={`${message['role']} message-box`}>
                    <p>{message['message']}</p>
                </div>)}
            </div>
            <form>
                <input 
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
