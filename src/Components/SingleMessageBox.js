import React from 'react';
import "../stylesheets/messagesContainer.css";

const SingleMessageBox = ({ message, role, companyState, jobseekerState }) => {

    if (message.role === role) {
        return (
            <div className="block-user">
                <div className={`${message['role']} message-box user`}>
                    <p>{message['message']}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="block-chattingWith">
                <div className={`${message['role']} message-box chattingWith`}>
                    <p>{message['message']}</p>
                </div>
            </div>
        )
    }
}

export default SingleMessageBox;
