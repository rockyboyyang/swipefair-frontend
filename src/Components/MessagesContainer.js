import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "../stylesheets/messagesContainer.css";

const MessagesContainer = ({ companyState, jobseekerState, chatId }) => {
    let baseUrl = "http://localhost:5000/api"
    let role;
    let id;

    if (companyState !== 'undefined') id = JSON.parse(companyState).id
    if (jobseekerState !== 'undefined') id = JSON.parse(jobseekerState).id
    jobseekerState !== 'undefined' ? role = 'jobseekers' : role = 'companies'
    console.log(chatId)
    const herokuUrl = baseUrl + `/${role}/${id}/chats/${chatId}/messages`

    const [messageState, setMessageState] = useState([])
    const [newMessageState, setNewMessageState] = useState('')

    const data = async () => {
        const response = await fetch(herokuUrl); // + '/'
        // const lol = await response.json();
        const { messages } = await response.json();
        let messageArr = []
        for(let i = 0; i < messages.length; i++) messageArr.push(messages[i])
        console.log(messageArr)
        console.log(messageState)
        setMessageState(messageArr);
        console.log(!newMessageState)
    };

    const sendMessage = async(e) => {
        e.preventDefault()
        if(!newMessageState) return;
        let postMessageUrl = baseUrl + `/${role}/${id}/chats/${chatId}/messages`
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
        (function() {
            window.location.reload(true);
        })();
    }

    const handleNewMessageState = event => {
        setNewMessageState(event.target.value)
    }

    useEffect(() => {
        data();
    }, [])

    return (
        <div className="center-container">
            {messageState.map((message) => 
            <div className={`${message['role']} message-box`}>
                <p>{message['message']}</p>
            </div>)}
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
