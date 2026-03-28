from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any, Dict, Optional

import chess
import chess.pgn


@dataclass
class GameState:
    board: chess.Board = field(default_factory=chess.Board)
    timer_mode: str = "rapid"
    white_time_ms: int = 10 * 60 * 1000
    black_time_ms: int = 10 * 60 * 1000
    last_tick_at: float = field(default_factory=lambda: time.time() * 1000)
    last_move: Optional[Dict[str, Any]] = None


def _initial_timer_ms(mode: str) -> int:
    if mode == "none":
        return 0
    return 5 * 60 * 1000 if mode == "blitz" else 10 * 60 * 1000


def create_game(timer_mode: str = "rapid") -> GameState:
    ms = _initial_timer_ms(timer_mode)
    return GameState(
        timer_mode=timer_mode if timer_mode in {"none", "blitz", "rapid"} else "rapid",
        white_time_ms=ms,
        black_time_ms=ms,
    )


def apply_timer_tick(game: GameState) -> None:
    if game.timer_mode == "none":
        game.last_tick_at = time.time() * 1000
        return

    if game.board.is_game_over(claim_draw=True):
        return

    now = time.time() * 1000
    elapsed = max(0, int(now - game.last_tick_at))
    game.last_tick_at = now

    if game.board.turn == chess.WHITE:
        game.white_time_ms = max(0, game.white_time_ms - elapsed)
    else:
        game.black_time_ms = max(0, game.black_time_ms - elapsed)


def _to_pgn(board: chess.Board) -> str:
    game = chess.pgn.Game.from_board(board)
    exporter = chess.pgn.StringExporter(headers=False, variations=False, comments=False)
    return game.accept(exporter).strip()


def _opening_name(board: chess.Board) -> str:
    moves = [mv.uci() for mv in board.move_stack[:6]]
    key = " ".join(moves)
    openings = {
        "e2e4 e7e5 g1f3 b8c6": "Open Game",
        "e2e4 e7e5 g1f3 b8c6 f1b5": "Ruy Lopez",
        "e2e4 e7e5 g1f3 b8c6 f1c4": "Italian Game",
        "e2e4 c7c5": "Sicilian Defense",
        "e2e4 e7e6": "French Defense",
        "e2e4 c7c6": "Caro-Kann Defense",
        "d2d4 d7d5 c2c4": "Queen's Gambit",
        "d2d4 g8f6 c2c4": "Indian Defense",
        "d2d4 g8f6 c2c4 e7e6": "Indian Game",
        "d2d4 d7d5 g1f3": "Queen's Pawn Game",
        "c2c4": "English Opening",
        "g1f3": "Zukertort Opening",
        "e2e4": "King's Pawn Opening",
        "d2d4": "Queen's Pawn Opening",
    }
    while key:
        if key in openings:
            return openings[key]
        key = " ".join(key.split(" ")[:-1])
    if board.move_stack:
        return "Uncommon Opening"
    return "Starting Position" if board.board_fen() == chess.Board().board_fen() else "Custom Position"


def serialize_state(game: GameState) -> Dict[str, Any]:
    board = game.board
    checked_king_square = None
    if board.is_check():
        king_sq = board.king(board.turn)
        if king_sq is not None:
            checked_king_square = chess.square_name(king_sq)

    return {
        "fen": board.fen(),
        "pgn": _to_pgn(board),
        "openingName": _opening_name(board),
        "turn": "w" if board.turn == chess.WHITE else "b",
        "inCheck": board.is_check(),
        "isCheckmate": board.is_checkmate(),
        "isStalemate": board.is_stalemate(),
        "isThreefoldRepetition": board.can_claim_threefold_repetition() or board.is_fivefold_repetition(),
        "isDrawByFiftyMoves": board.can_claim_fifty_moves() or board.is_seventyfive_moves(),
        "isInsufficientMaterial": board.is_insufficient_material(),
        "isDraw": board.is_stalemate() or board.is_insufficient_material() or board.can_claim_draw(),
        "isGameOver": board.is_game_over(claim_draw=True),
        "checkedKingSquare": checked_king_square,
        "moves": [
            {
                "uci": mv.uci(),
            }
            for mv in board.move_stack
        ],
        "lastMove": game.last_move,
        "whiteTimeMs": game.white_time_ms,
        "blackTimeMs": game.black_time_ms,
        "timerMode": game.timer_mode,
    }


def legal_moves(game: GameState, square_name: str) -> list[dict[str, Any]]:
    try:
        sq = chess.parse_square(square_name)
    except ValueError:
        return []

    out = []
    for mv in game.board.legal_moves:
        if mv.from_square != sq:
            continue
        is_capture = game.board.is_capture(mv)
        out.append(
            {
                "from": chess.square_name(mv.from_square),
                "to": chess.square_name(mv.to_square),
                "promotion": chess.piece_symbol(mv.promotion) if mv.promotion else None,
                "uci": mv.uci(),
                "isCapture": is_capture,
            }
        )
    return out


def validate_and_apply_move(game: GameState, move_payload: Dict[str, Any]) -> Dict[str, Any]:
    apply_timer_tick(game)

    frm = move_payload.get("from")
    to = move_payload.get("to")
    promotion = move_payload.get("promotion")
    if not frm or not to:
        return {"ok": False, "error": "Invalid move payload"}

    try:
        from_sq = chess.parse_square(frm)
        to_sq = chess.parse_square(to)
    except ValueError:
        return {"ok": False, "error": "Invalid square"}

    promo_piece = None
    if promotion:
        mapping = {"q": chess.QUEEN, "r": chess.ROOK, "b": chess.BISHOP, "n": chess.KNIGHT}
        promo_piece = mapping.get(str(promotion).lower())

    mv = chess.Move(from_sq, to_sq, promotion=promo_piece)
    if mv not in game.board.legal_moves:
        return {"ok": False, "error": "Illegal move"}

    san = game.board.san(mv)
    is_capture = game.board.is_capture(mv)
    game.board.push(mv)
    game.last_move = {
        "from": frm,
        "to": to,
        "san": san,
        "promotion": promotion,
        "uci": mv.uci(),
        "isCapture": is_capture,
        "isCheck": game.board.is_check(),
        "isCheckmate": game.board.is_checkmate(),
    }
    game.last_tick_at = time.time() * 1000

    return {"ok": True, "state": serialize_state(game)}


def restart_game(game: GameState, timer_mode: Optional[str]) -> Dict[str, Any]:
    mode = timer_mode if timer_mode in {"none", "blitz", "rapid"} else game.timer_mode
    fresh = create_game(mode)
    game.board = fresh.board
    game.timer_mode = fresh.timer_mode
    game.white_time_ms = fresh.white_time_ms
    game.black_time_ms = fresh.black_time_ms
    game.last_tick_at = fresh.last_tick_at
    game.last_move = None
    return serialize_state(game)


def export_pgn(game: GameState) -> str:
    return _to_pgn(game.board)


def load_fen(game: GameState, fen: str) -> Dict[str, Any]:
    try:
        game.board.set_fen(fen)
    except ValueError:
        return {"ok": False, "error": "Invalid FEN"}

    game.last_move = None
    game.last_tick_at = time.time() * 1000
    return {"ok": True, "state": serialize_state(game)}
