import React from 'react';

import './InfoBar.css';

const InfoBar = ({ room, users }) => {
  const count = users && users.length ? users.length : 0;

  return (
    <header className="infoBar">
      <div className="leftInnerContainer">
        <span className="onlineDot" aria-hidden="true" />
        <div className="roomMeta">
          <span className="tag roomTag">Room</span>
          <h3 className="roomName">{room}</h3>
        </div>
      </div>

      <div className="rightInnerContainer">
        <span className="memberCount">
          {count} {count === 1 ? 'person' : 'people'} online
        </span>
        <a className="leaveButton" href="/" title="Leave room" aria-label="Leave room">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default InfoBar;
