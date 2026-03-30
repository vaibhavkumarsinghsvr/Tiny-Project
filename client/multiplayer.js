(() => {
  const socket = io(window.location.origin, {
    transports: ['websocket', 'polling'],
    timeout: 5000,
  });

  let currentRoomCode = null;
  let myColor = null;
  let lastConnectError = null;
  const PLAYER_ID_KEY = 'chess-arena-player-id';

  function ensurePlayerId() {
    try {
      const existing = window.localStorage.getItem(PLAYER_ID_KEY);
      if (existing) return existing;

      const generated = (window.crypto?.randomUUID?.() || `player-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
      window.localStorage.setItem(PLAYER_ID_KEY, generated);
      return generated;
    } catch (_) {
      return `player-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
  }

  socket.on('connect_error', (err) => {
    lastConnectError = err?.message || 'Socket connection error';
  });

  function withTimeout(register, timeoutMs = 5000) {
    return new Promise((resolve) => {
      let done = false;
      const timer = setTimeout(() => {
        if (done) return;
        done = true;
        resolve({ ok: false, error: 'Server timeout. Check Flask server is running.' });
      }, timeoutMs);

      register((payload) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(payload);
      });
    });
  }

  function ensureConnected() {
    if (socket.connected) return { ok: true };
    return { ok: false, error: lastConnectError || 'Not connected to server' };
  }

  function createRoom(timerMode) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);
    const playerId = ensurePlayerId();

    return withTimeout((done) => {
      socket.emit('room:create', { timerMode, playerId }, (res) => {
        if (!res?.ok) return done({ ok: false, error: res?.error || 'Failed to create room' });
        currentRoomCode = res.roomCode;
        myColor = res.color;
        return done(res);
      });
    });
  }

  function joinRoom(roomCode) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);
    const playerId = ensurePlayerId();

    return withTimeout((done) => {
      socket.emit('room:join', { roomCode, playerId }, (res) => {
        if (!res?.ok) return done({ ok: false, error: res?.error || 'Join failed' });
        currentRoomCode = res.roomCode;
        myColor = res.color;
        return done(res);
      });
    });
  }

  function sendMove(move) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => {
      socket.emit('game:move', { roomCode: currentRoomCode, move, color: myColor }, (res) => done(res || { ok: false, error: 'Move rejected' }));
    });
  }

  function sendMoveAs(move, color) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => {
      socket.emit('game:move', { roomCode: currentRoomCode, move, color }, (res) => done(res || { ok: false, error: 'Move rejected' }));
    });
  }

  function requestRestart(timerMode) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => socket.emit('game:restart', { roomCode: currentRoomCode, timerMode }, (res) => done(res)));
  }

  function requestPgn() {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => socket.emit('game:exportPgn', { roomCode: currentRoomCode }, (res) => done(res)));
  }

  function requestFenLoad(fen) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => socket.emit('game:loadFen', { roomCode: currentRoomCode, fen }, (res) => done(res)));
  }

  function requestLegalMoves(square) {
    const conn = ensureConnected();
    if (!conn.ok) return Promise.resolve(conn);

    return withTimeout((done) => socket.emit('game:legalMoves', { roomCode: currentRoomCode, square }, (res) => done(res)));
  }

  function onState(handler) { socket.on('game:state', handler); }
  function onRoomUpdate(handler) { socket.on('room:update', handler); }

  window.Multiplayer = {
    createRoom,
    joinRoom,
    sendMove,
    sendMoveAs,
    requestRestart,
    requestPgn,
    requestFenLoad,
    requestLegalMoves,
    onState,
    onRoomUpdate,
    getCurrentRoom: () => currentRoomCode,
    getMyColor: () => myColor,
  };
})();
