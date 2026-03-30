from __future__ import annotations

import random
import threading
from dataclasses import dataclass, field
from typing import Dict, Optional, Set

try:
    from .game_logic import GameState, create_game
except ImportError:
    from game_logic import GameState, create_game


@dataclass
class Room:
    code: str
    game: GameState
    white_sid: Optional[str] = None
    black_sid: Optional[str] = None
    white_player_id: Optional[str] = None
    black_player_id: Optional[str] = None
    spectators: Set[str] = field(default_factory=set)


class RoomManager:
    def __init__(self) -> None:
        self._rooms: Dict[str, Room] = {}
        self._lock = threading.Lock()

    def _generate_code(self) -> str:
        chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        return "".join(random.choice(chars) for _ in range(6))

    def create_room(self, host_sid: str, host_player_id: str, timer_mode: str = "rapid") -> Room:
        with self._lock:
            code = self._generate_code()
            while code in self._rooms:
                code = self._generate_code()
            room = Room(
                code=code,
                game=create_game(timer_mode),
                white_sid=host_sid,
                white_player_id=host_player_id,
            )
            self._rooms[code] = room
            return room

    def get_room(self, code: str) -> Optional[Room]:
        return self._rooms.get((code or "").upper())

    def join_room(self, code: str, sid: str, player_id: str) -> tuple[Optional[Room], str]:
        with self._lock:
            room = self.get_room(code)
            if not room:
                return None, ""

            if room.white_player_id == player_id:
                room.white_sid = sid
                room.spectators.discard(sid)
                return room, "white"
            if room.black_player_id == player_id:
                room.black_sid = sid
                room.spectators.discard(sid)
                return room, "black"

            if room.white_sid is None:
                room.white_sid = sid
                room.white_player_id = player_id
                return room, "white"
            if room.black_sid is None:
                room.black_sid = sid
                room.black_player_id = player_id
                return room, "black"

            room.spectators.add(sid)
            return room, "spectator"

    def remove_sid(self, sid: str) -> None:
        with self._lock:
            dead_codes = []
            for code, room in self._rooms.items():
                if room.white_sid == sid:
                    room.white_sid = None
                if room.black_sid == sid:
                    room.black_sid = None
                room.spectators.discard(sid)

                if not room.white_sid and not room.black_sid and not room.spectators:
                    dead_codes.append(code)

            for code in dead_codes:
                self._rooms.pop(code, None)

    @property
    def size(self) -> int:
        return len(self._rooms)

    def all_rooms(self) -> Dict[str, Room]:
        return self._rooms
