# Realtime Chat

Chat rooms over WebSockets. Anyone who joins the same room name lands in the same
conversation, and messages are pushed to every member the moment they are sent — no
polling, no refresh.

React on the front end, Node + Socket.IO on the back.

---

## Features

- **Named rooms** — join by handle and room name; no accounts, no database.
- **Live membership** — the member list and online count update as people join and leave.
- **System notices** — join and leave events render as distinct centred pills, not as chat messages.
- **Emoji** — `:smile:` style shortcodes are expanded on render.
- **Dark UI** — a token-driven design system in [`client/src/styles/theme.css`](client/src/styles/theme.css); every colour, radius and font is a CSS custom property, so the whole palette is one file.
- **Responsive** — two-pane layout on desktop, single full-bleed pane below 1100px.

## Stack

| Side | Tools |
| :-- | :-- |
| Client | React 16 · React Router · Socket.IO client · Create React App |
| Server | Node · Express · Socket.IO |
| State | In-memory (`server/users.js`) — rooms reset when the server restarts |

## Running locally

The client and server are separate npm projects and both need to be running.

**1. Start the server** (defaults to port 5000):

```bash
cd server
npm install
node index.js
```

Check it with `curl http://localhost:5000` — it should return
`{"response":"Server is up and running."}`.

`npm start` runs `nodemon index.js` for auto-restart on save, but nodemon is not
declared in `server/package.json`, so it only works if you have it installed globally
or run it through `npx nodemon index.js`.

**2. Point the client at it and start it** (defaults to port 3000):

```bash
cd client
npm install
REACT_APP_SOCKET_URL=http://localhost:5000 npm start
```

On Windows PowerShell:

```powershell
cd client
npm install
$env:REACT_APP_SOCKET_URL = "http://localhost:5000"; npm start
```

Without `REACT_APP_SOCKET_URL` the client falls back to the original hosted backend
URL, which is no longer running — set the variable when developing locally. Create React
App only reads env vars at build time, so restart the dev server after changing it.

Open http://localhost:3000, join a room, then open a second browser window and join the
same room name to see messages moving in both directions.

> **Note on toolchain age:** this project pins `react-scripts@3.1.1`, which predates
> Node 17 and fails to build on current Node versions with an OpenSSL digest error. Use
> Node 14 or 16 (`nvm use 16`), or set `NODE_OPTIONS=--openssl-legacy-provider`.

## How it works

All realtime behaviour is four Socket.IO events:

| Event | Direction | Payload |
| :-- | :-- | :-- |
| `join` | client → server | `{ name, room }` — adds the user, joins the socket room, acks with an error if the handle is taken |
| `message` | server → client | `{ user, text }` — a chat line, or a system notice when `user` is `admin` |
| `sendMessage` | client → server | `text` — broadcast to everyone in the sender's room |
| `roomData` | server → client | `{ room, users }` — the current member list, re-sent on every join and leave |

Users live in a plain array in [`server/users.js`](server/users.js), keyed by socket id.
Nothing is persisted: restart the server and every room is empty.

## Project structure

```
client/
  src/
    styles/theme.css        design tokens + base layer
    components/
      Join/                 landing screen — handle + room entry
      Chat/                 room screen — composes the four components below
      InfoBar/              room header, online count, leave button
      Messages/             scrolling message list + empty state
        Message/            one bubble; own, peer, or system notice
      TextContainer/        sidebar — room info and member list
server/
  index.js                  Socket.IO event handlers
  router.js                 health-check endpoint
  users.js                  in-memory room membership
```

## Configuration

| Variable | Side | Default | Purpose |
| :-- | :-- | :-- | :-- |
| `REACT_APP_SOCKET_URL` | client | the original hosted backend | Socket.IO server to connect to |
| `PORT` | server | `5000` | Port the server listens on |

## Credits

Originally built by following [JavaScript Mastery's realtime chat tutorial](https://www.youtube.com/watch?v=ZwFA3YMfkoc);
the UI has since been rebuilt on a custom design system.
