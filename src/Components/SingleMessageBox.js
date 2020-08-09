import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import "../stylesheets/messagesContainer.css";

const SingleMessageBox = ({ message, role, companyState, jobseekerState }) => {
    console.log(role, message.role)
    if (message.role === role) {
        return (
            <div className={`${message['role']} message-box user`}>
                <p>{message['message']}</p>
            </div>
        )
    } else {
        return (
            <div className={`${message['role']} message-box chattingWith`}>
                <p>{message['message']}</p>
            </div>
        )
    }
}

export default SingleMessageBox;