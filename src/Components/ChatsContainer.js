import React, { useState, useEffect } from 'react';
import SingleChatBox from './SingleChatBox'
import "../stylesheets/chatsContainer.css";
import backendURL from '../backendURL'

const ChatsContainer = ({ companyState, jobseekerState, setChatId }) => {
    // TODO:  make url dynamic
    // make one for jobseeker and company
    let role;
    let id;
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

    jobseekerState !== 'undefined' ? role = 'jobseekers' : role = 'companies'

    // TODO: change to heroku in the future
    const herokuUrl = backendURL + `/api/${role}/${id}/chats`
    const[chatsState, setChatsState] = useState([])
    const data = async () => {
        const response = await fetch(herokuUrl); // + '/'
        const { chats } = await response.json();
        setChatsState(chats);
    };

    useEffect(() => {
        try {
            data();
        } catch (e) {

        }
    }, [])

    return (
        <>
            {chatsState ? (
                <div className="center-container chats-container">
                    {chatsState.map((chat) =>
                    <SingleChatBox chat={chat} role={role} setChatId={setChatId} />)}
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
};

export default ChatsContainer;
