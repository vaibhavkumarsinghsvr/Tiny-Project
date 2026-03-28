from __future__ import annotations

import chess

PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT: 320,
    chess.BISHOP: 330,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 20000,
}


def _piece_square_bonus(piece: chess.Piece, square: chess.Square) -> int:
    # Basic center preference + advancement bonus for pawns.
    file_idx = chess.square_file(square)
    rank_idx = chess.square_rank(square)
    center_bonus = 4 - abs(3.5 - file_idx) - abs(3.5 - rank_idx)
    center_bonus = int(center_bonus * 6)

    pawn_bonus = 0
    if piece.piece_type == chess.PAWN:
        pawn_bonus = rank_idx * 4 if piece.color == chess.WHITE else (7 - rank_idx) * 4

    king_safety = 0
    if piece.piece_type == chess.KING:
        if file_idx in (2, 6):
            king_safety = 18

    return center_bonus + pawn_bonus + king_safety


def evaluate_board(board: chess.Board) -> int:
    if board.is_checkmate():
        return -999999 if board.turn == chess.WHITE else 999999
    if board.is_stalemate() or board.is_insufficient_material():
        return 0

    score = 0
    for square, piece in board.piece_map().items():
        base = PIECE_VALUES[piece.piece_type]
        pst = _piece_square_bonus(piece, square)
        value = base + pst
        score += value if piece.color == chess.WHITE else -value

    mobility = board.legal_moves.count()
    score += mobility * 2 if board.turn == chess.WHITE else -mobility * 2

    if board.is_check():
        score += -25 if board.turn == chess.WHITE else 25

    return score


def _ordered_moves(board: chess.Board) -> list[chess.Move]:
    def weight(m: chess.Move) -> int:
        bonus = 0
        if board.is_capture(m):
            bonus += 2
        if m.promotion:
            bonus += 1
        return bonus

    return sorted(list(board.legal_moves), key=weight, reverse=True)


def minimax(board: chess.Board, depth: int, alpha: int, beta: int, maximizing: bool) -> int:
    if depth == 0 or board.is_game_over(claim_draw=True):
        return evaluate_board(board)

    moves = _ordered_moves(board)

    if maximizing:
        best = -10**9
        for mv in moves:
            board.push(mv)
            val = minimax(board, depth - 1, alpha, beta, False)
            board.pop()
            best = max(best, val)
            alpha = max(alpha, val)
            if beta <= alpha:
                break
        return best

    best = 10**9
    for mv in moves:
        board.push(mv)
        val = minimax(board, depth - 1, alpha, beta, True)
        board.pop()
        best = min(best, val)
        beta = min(beta, val)
        if beta <= alpha:
            break
    return best


def best_move_from_fen(fen: str, depth: int) -> dict:
    board = chess.Board(fen)
    if board.is_game_over(claim_draw=True):
        return {"ok": False, "error": "Game is already over"}

    depth = max(1, min(4, int(depth)))
    maximizing = board.turn == chess.WHITE

    best_move = None
    best_score = -10**9 if maximizing else 10**9

    for mv in _ordered_moves(board):
        board.push(mv)
        score = minimax(board, depth - 1, -10**9, 10**9, not maximizing)
        board.pop()

        if maximizing and score > best_score:
            best_score = score
            best_move = mv
        if not maximizing and score < best_score:
            best_score = score
            best_move = mv

    if best_move is None:
        return {"ok": False, "error": "No legal moves"}

    san = board.san(best_move)
    return {
        "ok": True,
        "move": {
            "uci": best_move.uci(),
            "from": chess.square_name(best_move.from_square),
            "to": chess.square_name(best_move.to_square),
            "promotion": chess.piece_symbol(best_move.promotion) if best_move.promotion else None,
            "san": san,
        },
    }


def evaluation_from_fen(fen: str) -> dict:
    try:
        board = chess.Board(fen)
    except ValueError:
        return {"ok": False, "error": "Invalid FEN"}
    score = evaluate_board(board)
    return {
        "ok": True,
        "score": score,
    }
