import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users, room }) => (
  <aside className="textContainer">
    <div className="sidebarHeader">
      <span className="tag">Realtime Chat</span>
      <h1 className="sidebarTitle">Rooms, live over WebSockets</h1>
      <p className="sidebarBlurb">
        Messages are pushed to everyone in the room the moment they are sent —
        no polling, no refresh.
      </p>
    </div>

    <div className="sidebarSection">
      <span className="tag">Connected to</span>
      <p className="sidebarRoom">{room || '—'}</p>
    </div>

    <div className="sidebarSection sidebarPeople">
      <span className="tag">
        In this room {users && users.length ? `(${users.length})` : ''}
      </span>
      {
        users && users.length
          ? (
            <ul className="activeContainer">
              {users.map(({ name }) => (
                <li key={name} className="activeItem">
                  <span className="activeAvatar" aria-hidden="true">
                    {name.charAt(0).toUpperCase()}
                  </span>
                  <span className="activeName">{name}</span>
                  <span className="activeDot" aria-hidden="true" />
                </li>
              ))}
            </ul>
          )
          : <p className="sidebarEmpty">Connecting…</p>
      }
    </div>

    <p className="sidebarFooter tag">React · Node · Socket.IO</p>
  </aside>
);

export default TextContainer;
