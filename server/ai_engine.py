from __future__ import annotations

import chess

MATE_SCORE = 1_000_000
MAX_DEPTH = 5
QUIESCENCE_LIMIT = 10

PIECE_VALUES = {
    chess.PAWN: 100,
    chess.KNIGHT: 320,
    chess.BISHOP: 335,
    chess.ROOK: 500,
    chess.QUEEN: 900,
    chess.KING: 20_000,
}

PAWN_TABLE = [
    0, 0, 0, 0, 0, 0, 0, 0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5, 5, 10, 25, 25, 10, 5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, -5, -10, 0, 0, -10, -5, 5,
    5, 10, 10, -20, -20, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
]

KNIGHT_TABLE = [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50,
]

BISHOP_TABLE = [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
]

ROOK_TABLE = [
    0, 0, 0, 5, 5, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    5, 10, 10, 10, 10, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
]

QUEEN_TABLE = [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -5, 0, 5, 5, 5, 5, 0, -5,
    0, 0, 5, 5, 5, 5, 0, -5,
    -10, 5, 5, 5, 5, 5, 0, -10,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20,
]

KING_MID_TABLE = [
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    20, 20, 0, 0, 0, 0, 20, 20,
    20, 30, 10, 0, 0, 10, 30, 20,
]

KING_END_TABLE = [
    -50, -40, -30, -20, -20, -30, -40, -50,
    -30, -20, -10, 0, 0, -10, -20, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 30, 40, 40, 30, -10, -30,
    -30, -10, 20, 30, 30, 20, -10, -30,
    -30, -30, 0, 0, 0, 0, -30, -30,
    -50, -30, -30, -30, -30, -30, -30, -50,
]

PIECE_SQUARE_TABLES = {
    chess.PAWN: PAWN_TABLE,
    chess.KNIGHT: KNIGHT_TABLE,
    chess.BISHOP: BISHOP_TABLE,
    chess.ROOK: ROOK_TABLE,
    chess.QUEEN: QUEEN_TABLE,
}


def _is_endgame(board: chess.Board) -> bool:
    queens = len(board.pieces(chess.QUEEN, chess.WHITE)) + len(board.pieces(chess.QUEEN, chess.BLACK))
    minor_major = sum(
        len(board.pieces(piece_type, chess.WHITE)) + len(board.pieces(piece_type, chess.BLACK))
        for piece_type in (chess.ROOK, chess.BISHOP, chess.KNIGHT)
    )
    return queens == 0 or minor_major <= 4


def _piece_square_value(piece: chess.Piece, square: chess.Square, endgame: bool) -> int:
    if piece.piece_type == chess.KING:
        table = KING_END_TABLE if endgame else KING_MID_TABLE
    else:
        table = PIECE_SQUARE_TABLES.get(piece.piece_type)
    if table is None:
        return 0
    index = square if piece.color == chess.WHITE else chess.square_mirror(square)
    return table[index]


def _passed_pawn_bonus(board: chess.Board, square: chess.Square, color: chess.Color) -> int:
    file_idx = chess.square_file(square)
    rank_idx = chess.square_rank(square)
    enemy_pawns = board.pieces(chess.PAWN, not color)
    direction = 1 if color == chess.WHITE else -1

    for enemy_sq in enemy_pawns:
        enemy_file = chess.square_file(enemy_sq)
        if abs(enemy_file - file_idx) > 1:
            continue
        enemy_rank = chess.square_rank(enemy_sq)
        if direction == 1 and enemy_rank > rank_idx:
            return 0
        if direction == -1 and enemy_rank < rank_idx:
            return 0

    advance = rank_idx if color == chess.WHITE else 7 - rank_idx
    return 12 + advance * 8


def evaluate_board(board: chess.Board) -> int:
    if board.is_checkmate():
        return -MATE_SCORE if board.turn == chess.WHITE else MATE_SCORE
    if board.is_stalemate() or board.is_insufficient_material():
        return 0

    endgame = _is_endgame(board)
    score = 0
    white_bishops = 0
    black_bishops = 0

    for square, piece in board.piece_map().items():
        value = PIECE_VALUES[piece.piece_type] + _piece_square_value(piece, square, endgame)
        if piece.piece_type == chess.PAWN:
            value += _passed_pawn_bonus(board, square, piece.color)
        if piece.piece_type == chess.BISHOP:
            if piece.color == chess.WHITE:
                white_bishops += 1
            else:
                black_bishops += 1
        score += value if piece.color == chess.WHITE else -value

    if white_bishops >= 2:
        score += 35
    if black_bishops >= 2:
        score -= 35

    mobility = board.legal_moves.count()
    score += mobility * 4 if board.turn == chess.WHITE else -mobility * 4

    if board.is_check():
        score += -30 if board.turn == chess.WHITE else 30

    return score


def _move_score(board: chess.Board, move: chess.Move, tt_move: chess.Move | None) -> int:
    if tt_move == move:
        return 1_000_000

    score = 0
    if board.is_capture(move):
        victim = board.piece_at(move.to_square)
        attacker = board.piece_at(move.from_square)
        if victim and attacker:
            score += 10 * PIECE_VALUES[victim.piece_type] - PIECE_VALUES[attacker.piece_type]
        else:
            score += 500
    if move.promotion:
        score += PIECE_VALUES.get(move.promotion, 0) + 800
    if board.gives_check(move):
        score += 300
    if board.is_castling(move):
        score += 120
    return score


def _ordered_moves(board: chess.Board, tt_move: chess.Move | None = None, captures_only: bool = False) -> list[chess.Move]:
    moves = list(board.legal_moves)
    if captures_only:
        moves = [move for move in moves if board.is_capture(move) or move.promotion]
    return sorted(moves, key=lambda move: _move_score(board, move, tt_move), reverse=True)


def _quiescence(
    board: chess.Board,
    alpha: int,
    beta: int,
    color_sign: int,
    cache: dict[tuple[str, int], int],
    depth_left: int = QUIESCENCE_LIMIT,
) -> int:
    stand_pat = color_sign * evaluate_board(board)
    if stand_pat >= beta:
        return beta
    if alpha < stand_pat:
        alpha = stand_pat
    if depth_left <= 0:
        return stand_pat

    key = (f"{board.fen(en_passant='fen')}|q", depth_left)
    cached = cache.get(key)
    if cached is not None:
        return cached

    best = stand_pat
    for move in _ordered_moves(board, captures_only=True):
        board.push(move)
        score = -_quiescence(board, -beta, -alpha, -color_sign, cache, depth_left - 1)
        board.pop()
        if score >= beta:
            cache[key] = beta
            return beta
        if score > best:
            best = score
        if score > alpha:
            alpha = score

    cache[key] = best
    return best


def _negamax(
    board: chess.Board,
    depth: int,
    alpha: int,
    beta: int,
    color_sign: int,
    cache: dict[tuple[str, int], int],
    tt_best: dict[str, chess.Move],
) -> int:
    position_key = board.fen(en_passant="fen")
    cache_key = (position_key, depth)
    cached = cache.get(cache_key)
    if cached is not None:
        return cached

    if board.is_game_over(claim_draw=True):
        score = color_sign * evaluate_board(board)
        cache[cache_key] = score
        return score

    if depth <= 0:
        score = _quiescence(board, alpha, beta, color_sign, cache)
        cache[cache_key] = score
        return score

    best_score = -MATE_SCORE
    best_move = None
    tt_move = tt_best.get(position_key)

    for move in _ordered_moves(board, tt_move=tt_move):
        board.push(move)
        extension = 1 if board.is_check() and depth <= 2 else 0
        score = -_negamax(board, depth - 1 + extension, -beta, -alpha, -color_sign, cache, tt_best)
        board.pop()

        if score > best_score:
            best_score = score
            best_move = move
        if score > alpha:
            alpha = score
        if alpha >= beta:
            break

    if best_move is not None:
        tt_best[position_key] = best_move
    cache[cache_key] = best_score
    return best_score


def best_move_from_fen(fen: str, depth: int) -> dict:
    board = chess.Board(fen)
    if board.is_game_over(claim_draw=True):
        return {"ok": False, "error": "Game is already over"}

    requested_depth = max(1, min(MAX_DEPTH, int(depth)))
    color_sign = 1 if board.turn == chess.WHITE else -1
    cache: dict[tuple[str, int], int] = {}
    tt_best: dict[str, chess.Move] = {}

    best_move = None
    best_score = -MATE_SCORE

    for current_depth in range(1, requested_depth + 1):
        current_best_move = None
        current_best_score = -MATE_SCORE
        tt_move = tt_best.get(board.fen(en_passant="fen"))

        for move in _ordered_moves(board, tt_move=tt_move):
            board.push(move)
            score = -_negamax(board, current_depth - 1, -MATE_SCORE, MATE_SCORE, -color_sign, cache, tt_best)
            board.pop()

            if score > current_best_score:
                current_best_score = score
                current_best_move = move

        if current_best_move is not None:
            best_move = current_best_move
            best_score = current_best_score
            tt_best[board.fen(en_passant="fen")] = current_best_move

    if best_move is None:
        return {"ok": False, "error": "No legal moves"}

    san = board.san(best_move)
    return {
        "ok": True,
        "score": best_score,
        "searchedDepth": requested_depth,
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
