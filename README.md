# Chess Arena

Chess Arena is a polished web-based chess project with local play, AI play, training tools, and online multiplayer room support. The app combines a modern interface with subtle `Chaturanga`-inspired details, multilingual UI support, move history, PGN export, FEN loading, configurable time controls, and a more analysis-friendly match experience.

## Features

- Local player vs player chess
- Guided `Training Mode` with lesson-based coaching
- Player vs AI with adjustable depth
- `AI vs AI` autoplay mode
- Online multiplayer using room codes
- Live evaluation bar
- Game-end summary modal with rematch flow
- Built-in rules, notation, and trainer sidebar
- Light and dark mode
- Multilingual interface: English, Hindi, Spanish
- Timer modes: `No Timer`, `Blitz`, `Rapid`
- Move history and PGN export
- FEN loading for custom positions
- Opening name summary for completed games
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

### Training Mode

1. Select `Training Mode`.
2. Play either side on a local practice board.
3. Read the live trainer tips in the sidebar after each move.
4. Use the lesson navigation to move through opening, tactics, king safety, coordination, and endgame guidance.

### Vs AI

1. Select `Player vs AI`.
2. Choose an AI depth.
3. Play as white and the AI responds as black.

### AI vs AI

1. Select `AI vs AI`.
2. Choose an AI depth.
3. Restart the game and watch both sides autoplay.
4. Use the evaluation bar and move list to follow the balance of the game.

### Online Multiplayer

1. Select `Online Multiplayer`.
2. One player clicks `Create Room`.
3. Share the generated room code.
4. The second player enters the room code and clicks `Join Room`.
5. Both players must use the same server URL.

## UI Highlights

- Modern glassmorphism-inspired interface
- Subtle ancient Indian design details inspired by `Chaturanga`
- Custom SVG chess pieces for a more realistic board
- Light and dark theme toggle
- Language switcher
- Live turn, move, and room status badges
- Live evaluation bar beside the board
- Game-end summary modal with result, move count, opening name, time used, and rematch
- Built-in training, rules, and notation panels in the sidebar

## Demo Flow

If you are presenting the app, a strong 2-minute walkthrough is:

1. Start in `Training Mode` and make a few opening moves to show live coaching.
2. Switch to `Player vs AI` and point out the evaluation bar changing after each move.
3. Load `AI vs AI` and let the game autoplay for a few moves.
4. End a game by checkmate, resignation, or draw to show the summary modal and rematch action.
5. Open the rules and notation panel to show the project is useful for beginners as well as demos.

## Controls

- `Restart`: start a fresh match
- `Undo / Redo`: available in local play
- `Offer Draw`: local mode draw flow
- `Resign`: end the current game
- `Export PGN`: export the game notation
- `Load FEN`: load a custom position
- `Move Input`: apply typed moves like `e2e4` or `e7e8q`
- `Evaluation Bar`: shows the current balance of the position
- `Trainer Panel`: explains lessons and gives live coaching
- `Summary Modal`: appears automatically when a game ends

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
