import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const author = (user || '').trim();

  // The server emits both 'admin' and 'Admin' for system notices.
  const isSystemMessage = author.toLowerCase() === 'admin';
  const isSentByCurrentUser = author === trimmedName;

  if (isSystemMessage) {
    return (
      <div className="systemMessage">
        <span className="systemMessageText">{ReactEmoji.emojify(text)}</span>
      </div>
    );
  }

  const initial = author.charAt(0).toUpperCase();

  return (
    <div className={`messageContainer ${isSentByCurrentUser ? 'justifyEnd' : 'justifyStart'}`}>
      {
        !isSentByCurrentUser && (
          <span className="avatar" aria-hidden="true">{initial}</span>
        )
      }

      <div className="messageStack">
        <span className="tag sentText">{isSentByCurrentUser ? 'You' : author}</span>
        <div className={`messageBox ${isSentByCurrentUser ? 'ownMessage' : 'peerMessage'}`}>
          <p className="messageText">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
