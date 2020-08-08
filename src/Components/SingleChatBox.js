import React, { useState, useEffect } from 'react';
import "../stylesheets/chatsContainer.css";


const SingleChatBox = ({chat}) => {
    return (
        <div className={`chat-${chat.id} chatBox`}>
            {chat.company_name}
        </div>
    )
}

export default SingleChatBox;