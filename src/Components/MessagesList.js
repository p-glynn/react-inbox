import React from 'react';
import Message from './Message';

const MessagesList = ({messages, toggleClass, simplePatch}) => {

  return (
    <div>
      {messages.map(message => (<Message key={message.id}
        message= {message}
        toggleClass={toggleClass}
        simplePatch={simplePatch}
        />))}
    </div>
  )
}

export default MessagesList;
