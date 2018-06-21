import React from 'react'
import Message from './Message';

const Messages = ({inbox, selectMail, starMail, expandMail}) => {
    return (inbox.map((mail, index) => 
        (<Message {...mail} 
            key={mail.id} 
            selectMail={(selected) => selectMail(index, selected)}
            starMail={() => starMail(index)}
            expandMail={() => expandMail(index)}/>)))
}

export default Messages;