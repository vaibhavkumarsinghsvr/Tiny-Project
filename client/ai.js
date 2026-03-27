(() => {
  const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
  const PST = {
    p: [0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
    n: [-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
    b: [-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],
    r: [0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],
    q: [-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],
    k: [-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20],
  };

  function idx(square) {
    const file = square.charCodeAt(0) - 97;
    const rank = Number(square[1]);
    return (8 - rank) * 8 + file;
  }

  function pst(piece, square) {
    const i = idx(square);
    const t = PST[piece.type];
    if (!t) return 0;
    if (piece.color === 'w') return t[i];
    return t[63 - i];
  }

  function evaluate(chess) {
    if (chess.isCheckmate()) return chess.turn() === 'w' ? -999999 : 999999;
    if (chess.isStalemate() || chess.isDraw()) return 0;

    let score = 0;
    const b = chess.board();
    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const piece = b[r][c];
        if (!piece) continue;
        const sq = String.fromCharCode(97 + c) + (8 - r);
        const s = (PIECE_VALUES[piece.type] || 0) + pst(piece, sq);
        score += piece.color === 'w' ? s : -s;
      }
    }

    const mobility = chess.moves().length;
    score += chess.turn() === 'w' ? mobility * 2 : -mobility * 2;
    if (chess.inCheck()) score += chess.turn() === 'w' ? -25 : 25;
    return score;
  }

  function order(moves) {
    return moves.sort((a, b) => ((b.captured ? 2 : 0) + (b.promotion ? 1 : 0)) - ((a.captured ? 2 : 0) + (a.promotion ? 1 : 0)));
  }

  function minimax(chess, depth, alpha, beta, maximizing) {
    if (depth === 0 || chess.isGameOver()) return evaluate(chess);
    const legal = order(chess.moves({ verbose: true }));

    if (maximizing) {
      let best = -Infinity;
      for (const move of legal) {
        chess.move(move);
        const v = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        best = Math.max(best, v);
        alpha = Math.max(alpha, v);
        if (beta <= alpha) break;
      }
      return best;
    }

    let best = Infinity;
    for (const move of legal) {
      chess.move(move);
      const v = minimax(chess, depth - 1, alpha, beta, true);
      chess.undo();
      best = Math.min(best, v);
      beta = Math.min(beta, v);
      if (beta <= alpha) break;
    }
    return best;
  }

  function bestMove(chess, depth) {
    const legal = order(chess.moves({ verbose: true }));
    const maximize = chess.turn() === 'w';
    let move = null;
    let score = maximize ? -Infinity : Infinity;

    for (const m of legal) {
      chess.move(m);
      const v = minimax(chess, depth - 1, -Infinity, Infinity, !maximize);
      chess.undo();

      if (maximize && v > score) { score = v; move = m; }
      if (!maximize && v < score) { score = v; move = m; }
    }

    return move;
  }

  async function computeAIMove(chess, depth) {
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
    return bestMove(chess, depth);
  }

  window.ChessAI = { computeAIMove };
})();
