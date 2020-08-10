import React from 'react';
import { useHistory } from "react-router-dom";
import "../stylesheets/chatsContainer.css";


const SingleChatBox = ({chat, role, setChatId }) => {
    let history = useHistory()

    const onClick = () => {
        setChatId(chat.chatId)
        history.push(`./messages/${chat.chatId}`)
    }

    if(role === 'jobseekers') {
        return (
            <div className={`chat-${chat.chatId} chatBox`} onClick={onClick}>
                <img src={chat.image}/>
                <div className="company_info">
                    <p id="chat_company">{chat.company_name}</p>
                    <p id="chat_location">{chat.location}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`chat-${chat.chatId} chatBox`} onClick={onClick}>
                <img src={chat.image} />
                <div className="company_info">
                    <p id="chat_name">{chat.name}</p>
                    <p id="chat_location">{chat.location}</p>
                </div>
                {chat.name}
            </div>
        )
    }
}

export default SingleChatBox;