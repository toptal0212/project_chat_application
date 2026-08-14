import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {
      messages.length === 0
        ? (
          <div className="messagesEmpty">
            <p className="tag">No messages yet</p>
            <p className="messagesEmptyHint">Say something to get the room started.</p>
          </div>
        )
        : messages.map((message, i) => (
          <div key={i}><Message message={message} name={name} /></div>
        ))
    }
  </ScrollToBottom>
);

export default Messages;
