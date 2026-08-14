import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form" onSubmit={event => sendMessage(event)}>
    <input
      className="input"
      type="text"
      placeholder="Type a message…"
      autoComplete="off"
      aria-label="Message"
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
    />
    <button
      className="sendButton"
      type="submit"
      disabled={!message}
      aria-label="Send message"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2 8h11M9 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </form>
)

export default Input;
