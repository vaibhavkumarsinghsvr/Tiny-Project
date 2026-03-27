# Chess Arena

Chess Arena is a polished web-based chess project with local play, AI play, and online multiplayer room support. The app combines a modern interface with subtle `Chaturanga`-inspired details, multilingual UI support, move history, PGN export, FEN loading, and configurable time controls.

## Features

- Local player vs player chess
- Player vs AI with adjustable depth
- Online multiplayer using room codes
- Light and dark mode
- Multilingual interface: English, Hindi, Spanish
- Timer modes: `No Timer`, `Blitz`, `Rapid`
- Move history and PGN export
- FEN loading for custom positions
- Drag-and-drop or typed move input
- Responsive UI for desktop and mobile

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Flask, Flask-SocketIO
- Chess engine and move validation: `python-chess`

## Project Structure

```text
chess-app/
|-- client/
|   |-- index.html
|   |-- style.css
|   |-- board.js
|   |-- multiplayer.js
|   |-- ai.js
|   `-- assets/
|-- server/
|   |-- app.py
|   |-- ai_engine.py
|   |-- game_logic.py
|   |-- rooms.py
|   `-- __init__.py
|-- requirements.txt
`-- README.md
```

## Setup

Run the project from the `chess-app` folder:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python server\app.py
```

Open:

```text
http://127.0.0.1:5000
```

## How To Play

### Local Match

1. Select `Player vs Player (Local)`.
2. Move pieces by clicking or dragging.
3. Use `Restart`, `Undo`, `Redo`, `Offer Draw`, or `Resign` as needed.

### Vs AI

1. Select `Player vs AI`.
2. Choose an AI depth.
3. Play as white and the AI responds as black.

### Online Multiplayer

1. Select `Online Multiplayer`.
2. One player clicks `Create Room`.
3. Share the generated room code.
4. The second player enters the room code and clicks `Join Room`.
5. Both players must use the same server URL.

## UI Highlights

- Modern glassmorphism-inspired interface
- Subtle ancient Indian design details inspired by `Chaturanga`
- Light and dark theme toggle
- Language switcher
- Live turn, move, and room status badges

## Controls

- `Restart`: start a fresh match
- `Undo / Redo`: available in local play
- `Offer Draw`: local mode draw flow
- `Resign`: end the current game
- `Export PGN`: export the game notation
- `Load FEN`: load a custom position
- `Move Input`: apply typed moves like `e2e4` or `e7e8q`

Keyboard shortcuts:

- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Ctrl/Cmd + R`: Restart
- `Esc`: Clear selection

## Notes

- Multiplayer room data is stored in memory.
- Server-side validation ensures only legal moves are accepted.
- If two devices are used for multiplayer, they must be able to reach the same Flask server.

## Future Improvements

- Accounts and saved game history
- Public deployment for internet multiplayer
- More board and piece themes
- Stronger AI levels
- Analysis mode and puzzle mode
