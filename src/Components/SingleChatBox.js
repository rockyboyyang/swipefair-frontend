import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import "../stylesheets/chatsContainer.css";


const SingleChatBox = ({chat, role, setChatId }) => {
    let history = useHistory()

    const onClick = () => {
        console.log(chat)
        setChatId(chat.chatId)
        history.push(`./messages/${chat.chatId}`)
    }

    if(role === 'jobseekers') {
        return (
            <div className={`chat-${chat.chatId} chatBox`} onClick={onClick}>
                {chat.company_name}
            </div>
        )
    } else {
        return (
            <div className={`chat-${chat.chatId} chatBox`} onClick={onClick}>
                {chat.name}
            </div>
        )
    }
}

export default SingleChatBox;