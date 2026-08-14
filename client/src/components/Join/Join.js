import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const isReady = Boolean(name.trim() && room.trim());

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="joinBadge">
          <span className="joinPulse" />
          <span className="tag">Socket.IO // live</span>
        </div>

        <h1 className="joinHeading">Realtime Chat</h1>
        <p className="joinSubheading">
          Pick a handle, name a room, and start talking. Anyone who joins the same
          room lands in the same conversation.
        </p>

        <form
          className="joinForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="joinField">
            <span className="tag joinLabel">Your name</span>
            <input
              className="joinInput"
              type="text"
              placeholder="ada"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="joinField">
            <span className="tag joinLabel">Room</span>
            <input
              className="joinInput"
              type="text"
              placeholder="general"
              autoComplete="off"
              value={room}
              onChange={(event) => setRoom(event.target.value)}
            />
          </label>

          <Link
            className="joinLink"
            onClick={(event) => (isReady ? null : event.preventDefault())}
            to={`/chat?name=${name}&room=${room}`}
            aria-disabled={!isReady}
            tabIndex={isReady ? 0 : -1}
          >
            <button
              className="joinButton"
              type="submit"
              disabled={!isReady}
            >
              Join room
              <svg className="joinButtonIcon" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2 8h11M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </form>

        <p className="joinFootnote tag">React · Node · Socket.IO</p>
      </div>
    </div>
  );
}
