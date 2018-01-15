import React from 'react';
import Message from './Message';

const MessagesList = ({messages, toggleClass, simplePatch, expand}) => {

  return (
    <div>
      {messages.map(message => (<Message key={message.id}
        message= {message}
        toggleClass={toggleClass}
        simplePatch={simplePatch}
        expand={expand}/>))}
    </div>
  )
}

export default MessagesList;
