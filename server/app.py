from __future__ import annotations

import os
import threading
import time
from typing import Any, Dict

from flask import Flask, jsonify, request, send_from_directory
from flask_socketio import SocketIO, emit, join_room

try:
    from .ai_engine import best_move_from_fen
    from .game_logic import apply_timer_tick, export_pgn, legal_moves, load_fen, restart_game, serialize_state, validate_and_apply_move
    from .rooms import RoomManager
except ImportError:
    from ai_engine import best_move_from_fen
    from game_logic import apply_timer_tick, export_pgn, legal_moves, load_fen, restart_game, serialize_state, validate_and_apply_move
    from rooms import RoomManager

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
CLIENT_DIR = os.path.join(BASE_DIR, "client")

app = Flask(__name__, static_folder=CLIENT_DIR, static_url_path="")
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")
rooms = RoomManager()


@app.get("/api/health")
def health() -> Any:
    return jsonify({"status": "ok", "rooms": rooms.size})


@app.post("/api/ai-move")
def ai_move() -> Any:
    payload: Dict[str, Any] = request.get_json(silent=True) or {}
    fen = str(payload.get("fen", "")).strip()
    depth = int(payload.get("depth", 2))

    if not fen:
        return jsonify({"ok": False, "error": "fen is required"}), 400

    out = best_move_from_fen(fen, depth)
    code = 200 if out.get("ok") else 400
    return jsonify(out), code


@app.get("/")
def index() -> Any:
    return send_from_directory(CLIENT_DIR, "index.html")


@socketio.on("connect")
def on_connect() -> None:
    emit("connected", {"ok": True})


@socketio.on("room:create")
def room_create(data: Dict[str, Any]) -> Dict[str, Any]:
    timer_mode = (data or {}).get("timerMode", "rapid")
    room = rooms.create_room(request.sid, timer_mode)
    join_room(room.code)
    state = serialize_state(room.game)
    state["roomCode"] = room.code
    return {"ok": True, "roomCode": room.code, "color": "white", "state": state}


@socketio.on("room:join")
def room_join(data: Dict[str, Any]) -> Dict[str, Any]:
    room_code = str((data or {}).get("roomCode", "")).upper()
    room, color = rooms.join_room(room_code, request.sid)
    if not room:
        return {"ok": False, "error": "Room not found"}

    join_room(room.code)
    socketio.emit(
        "room:update",
        {
            "whiteConnected": bool(room.white_sid),
            "blackConnected": bool(room.black_sid),
        },
        room=room.code,
    )
    state = serialize_state(room.game)
    state["roomCode"] = room.code
    return {"ok": True, "roomCode": room.code, "color": color, "state": state}


@socketio.on("game:legalMoves")
def game_legal_moves(data: Dict[str, Any]) -> Dict[str, Any]:
    room_code = str((data or {}).get("roomCode", "")).upper()
    square = str((data or {}).get("square", "")).lower()
    room = rooms.get_room(room_code)
    if not room:
        return {"ok": False, "error": "Room not found"}

    return {"ok": True, "moves": legal_moves(room.game, square)}


@socketio.on("game:move")
def game_move(data: Dict[str, Any]) -> Dict[str, Any]:
    payload = data or {}
    room_code = str(payload.get("roomCode", "")).upper()
    requested_color = str(payload.get("color", ""))
    move = payload.get("move", {})

    room = rooms.get_room(room_code)
    if not room:
        return {"ok": False, "error": "Room not found"}

    is_white = room.white_sid == request.sid
    is_black = room.black_sid == request.sid
    if (requested_color == "white" and not is_white) or (requested_color == "black" and not is_black):
        return {"ok": False, "error": "Not your side"}

    current_turn = "white" if room.game.board.turn else "black"
    if current_turn != requested_color:
        return {"ok": False, "error": "Not your turn"}

    out = validate_and_apply_move(room.game, move)
    if not out.get("ok"):
        return out

    payload = dict(out["state"])
    payload["roomCode"] = room.code
    socketio.emit("game:state", payload, room=room.code)
    return {"ok": True, "state": payload}


@socketio.on("game:restart")
def game_restart(data: Dict[str, Any]) -> Dict[str, Any]:
    room_code = str((data or {}).get("roomCode", "")).upper()
    timer_mode = (data or {}).get("timerMode")
    room = rooms.get_room(room_code)
    if not room:
        return {"ok": False, "error": "Room not found"}

    state = restart_game(room.game, timer_mode)
    payload = dict(state)
    payload["roomCode"] = room.code
    socketio.emit("game:state", payload, room=room.code)
    return {"ok": True, "state": payload}


@socketio.on("game:loadFen")
def game_load_fen(data: Dict[str, Any]) -> Dict[str, Any]:
    room_code = str((data or {}).get("roomCode", "")).upper()
    fen = str((data or {}).get("fen", ""))
    room = rooms.get_room(room_code)
    if not room:
        return {"ok": False, "error": "Room not found"}

    out = load_fen(room.game, fen)
    if not out.get("ok"):
        return out

    payload = dict(out["state"])
    payload["roomCode"] = room.code
    socketio.emit("game:state", payload, room=room.code)
    return {"ok": True, "state": payload}


@socketio.on("game:exportPgn")
def game_export_pgn(data: Dict[str, Any]) -> Dict[str, Any]:
    room_code = str((data or {}).get("roomCode", "")).upper()
    room = rooms.get_room(room_code)
    if not room:
        return {"ok": False, "error": "Room not found"}

    return {"ok": True, "pgn": export_pgn(room.game)}


@socketio.on("disconnect")
def on_disconnect() -> None:
    rooms.remove_sid(request.sid)


def _timer_loop() -> None:
    while True:
        time.sleep(0.25)
        for code, room in list(rooms.all_rooms().items()):
            prev_w = room.game.white_time_ms
            prev_b = room.game.black_time_ms
            apply_timer_tick(room.game)
            if prev_w != room.game.white_time_ms or prev_b != room.game.black_time_ms:
                payload = serialize_state(room.game)
                payload["roomCode"] = code
                socketio.emit("game:state", payload, room=code)


threading.Thread(target=_timer_loop, daemon=True).start()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    socketio.run(app, host="0.0.0.0", port=port, debug=True, allow_unsafe_werkzeug=True)
