(() => {
  const boardEl = document.getElementById('board');
  const statusText = document.getElementById('statusText');
  const historyList = document.getElementById('historyList');
  const pgnOutput = document.getElementById('pgnOutput');
  const modeSelect = document.getElementById('modeSelect');
  const aiDepthEl = document.getElementById('aiDepth');
  const timerModeEl = document.getElementById('timerMode');
  const whiteTimerEl = document.getElementById('whiteTimer');
  const blackTimerEl = document.getElementById('blackTimer');
  const roomInfo = document.getElementById('roomInfo');
  const roomCodeInput = document.getElementById('roomCodeInput');
  const onlineControls = document.getElementById('onlineControls');
  const modeBadge = document.getElementById('modeBadge');
  const turnBadge = document.getElementById('turnBadge');
  const moveCount = document.getElementById('moveCount');
  const whitePanel = document.getElementById('whitePanel');
  const blackPanel = document.getElementById('blackPanel');
  const themeToggle = document.getElementById('themeToggle');
  const themeBadge = document.getElementById('themeBadge');
  const languageSelect = document.getElementById('languageSelect');

  const restartBtn = document.getElementById('restartBtn');
  const exportPgnBtn = document.getElementById('exportPgnBtn');
  const loadFenBtn = document.getElementById('loadFenBtn');
  const createRoomBtn = document.getElementById('createRoomBtn');
  const joinRoomBtn = document.getElementById('joinRoomBtn');
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  const drawBtn = document.getElementById('drawBtn');
  const resignBtn = document.getElementById('resignBtn');
  const applyMoveBtn = document.getElementById('applyMoveBtn');
  const moveInput = document.getElementById('moveInput');
  const timeFormatEl = document.getElementById('timeFormat');
  const soundToggle = document.getElementById('soundToggle');

  const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const PIECE_ASSETS = {
    K: './assets/pieces/wk.svg',
    Q: './assets/pieces/wq.svg',
    R: './assets/pieces/wr.svg',
    B: './assets/pieces/wb.svg',
    N: './assets/pieces/wn.svg',
    P: './assets/pieces/wp.svg',
    k: './assets/pieces/bk.svg',
    q: './assets/pieces/bq.svg',
    r: './assets/pieces/br.svg',
    b: './assets/pieces/bb.svg',
    n: './assets/pieces/bn.svg',
    p: './assets/pieces/bp.svg',
  };

  const state = {
    mode: 'local',
    theme: 'dark',
    language: 'en',
    selected: null,
    legalTargets: [],
    lastInfo: '',
    localRoomCode: null,
    activeRoomCode: null,
    onlineColor: null,
    game: null,
    resignedBy: null,
    aiThinking: false,
    forcedResult: '',
    redoMoves: [],
    localTickAt: Date.now(),
  };

  const THEME_KEY = 'chess-arena-theme';
  const LANG_KEY = 'chess-arena-language';
  const translations = {
    en: {
      heroEyebrow: 'Strategic Match Room',
      heroText: 'A polished chess workspace for local play, AI practice, and online rooms with a cleaner tournament-style presentation.',
      heritageLabel: 'Inspired By',
      heritageValue: 'Chaturanga, the ancient Indian root of chess',
      heritageChip: 'Heritage',
      heritageChipValue: 'Ancient strategy, modern board',
      darkMode: 'Dark Mode',
      language: 'Language',
      heroNote: 'Responsive layout, sharper spacing, and easier match controls.',
      mode: 'Mode',
      turn: 'Turn',
      moves: 'Moves',
      theme: 'Theme',
      matchSetup: 'Match Setup',
      modeLocal: 'Player vs Player (Local)',
      modeAi: 'Player vs AI',
      modeOnline: 'Online Multiplayer',
      aiDepth: 'AI Depth',
      timer: 'Timer',
      timerNone: 'No Timer',
      timerBlitz: 'Blitz (5+0)',
      timerRapid: 'Rapid (10+0)',
      timerFormat: 'Timer Format',
      restart: 'Restart',
      undo: 'Undo',
      redo: 'Redo',
      offerDraw: 'Offer Draw',
      resign: 'Resign',
      exportPgn: 'Export PGN',
      moveSound: 'Move Sound',
      controlHint: 'Use Ctrl/Cmd + Z, Y, and R for quick actions.',
      onlineRoom: 'Online Room',
      createRoom: 'Create Room',
      joinRoom: 'Join Room',
      roomCodePlaceholder: 'Room code',
      offline: 'Offline',
      black: 'Black',
      upperBoard: 'Upper Board',
      liveBoard: 'Live Board',
      boardSubtitle: 'Focused play area with live status, clocks, and move tracking',
      boardCaptionMain: 'Chaturanga Legacy',
      boardCaptionSub: 'Subtle Indian motifs around a modern competitive board',
      ready: 'Ready',
      interaction: 'Interaction',
      interactionValue: 'Click or drag pieces',
      formats: 'Formats',
      formatsValue: 'FEN import and PGN export ready',
      heritageFootnoteLabel: 'Historical Note',
      heritageFootnoteValue: 'The visual tone nods to Indian court geometry, carved borders, and the early spirit of Chaturanga.',
      white: 'White',
      lowerBoard: 'Lower Board',
      positionTools: 'Position Tools',
      positionToolsNote: 'Load custom setups or test manual input',
      loadFen: 'Load FEN',
      fenPlaceholder: 'Paste FEN string',
      moveInput: 'Move Input',
      movePlaceholder: 'e2e4 or e7e8q',
      applyMove: 'Apply Move',
      moveHistory: 'Move History',
      moveHistoryNote: 'PGN-ready notation',
      pgnNote: 'Export or review the full line',
      languageEnglish: 'English',
      languageHindi: 'Hindi',
      languageSpanish: 'Spanish',
      themeDark: 'Dark',
      themeLight: 'Light',
      initializing: 'Initializing...',
      localMatch: 'Local Match',
      vsAi: 'Vs AI',
      onlineRoomShort: 'Online Room',
      whiteToMove: 'White to move',
      blackToMove: 'Black to move',
      youAre: 'You are {color}.',
      checkSuffix: ' (Check)',
      unableCreateLocalRoom: 'Unable to create local room',
      unableInitializeLocalBoard: 'Unable to initialize local board',
      invalidMove: 'Invalid move',
      aiThinking: 'AI thinking...',
      aiRequestFailed: 'AI request failed',
      restartFailed: 'Restart failed',
      invalidFen: 'Invalid FEN',
      fenLoaded: 'FEN loaded',
      exportPgnFailed: 'Failed to export PGN',
      exportPgnSuccess: 'PGN exported (copied/downloaded where permitted).',
      undoDisabledOnline: 'Undo disabled in online mode.',
      gameOver: 'Game is over.',
      noMovesUndo: 'No moves to undo.',
      noMovesRedo: 'No moves to redo.',
      drawOfferLocalOnly: 'Draw offer is local-only in this build.',
      drawOfferPrompt: 'Offer draw to opponent? Click OK to accept draw.',
      drawAgreed: 'Draw agreed by players.',
      replaying: 'Replaying...',
      typedMoveFormat: 'Use move format like e2e4 or e7e8q',
      createRoomFailed: 'Create room failed',
      joinFailed: 'Join failed',
      unableInitializeGame: 'Unable to initialize game.',
      promotePrompt: 'Promote to (q, r, b, n):',
      roomYouAre: 'Room {room} | You: {color}',
      roomPresence: 'Room {room} | You: {color} | W:{white} B:{black}',
      connectedOn: 'on',
      connectedOff: 'off',
      whiteColor: 'white',
      blackColor: 'black',
      spectator: 'spectator',
      resigned: '{color} resigned. {winner} wins.',
      checkmate: 'Checkmate. {winner} wins.',
      stalemate: 'Stalemate.',
      threefold: 'Draw by threefold repetition.',
      fiftyMove: 'Draw by 50-move rule.',
      insufficient: 'Draw by insufficient material.',
      whiteFlagged: 'White flagged on time. Black wins.',
      blackFlagged: 'Black flagged on time. White wins.',
    },
    hi: {
      heroEyebrow: 'रणनीतिक मैच कक्ष',
      heroText: 'लोकल गेम, AI अभ्यास और ऑनलाइन रूम के लिए एक साफ-सुथरा और बेहतर शतरंज इंटरफेस।',
      heritageLabel: 'प्रेरणा',
      heritageValue: 'चतुरंग, शतरंज की प्राचीन भारतीय जड़',
      heritageChip: 'विरासत',
      heritageChipValue: 'प्राचीन रणनीति, आधुनिक बोर्ड',
      darkMode: 'डार्क मोड',
      language: 'भाषा',
      heroNote: 'बेहतर लेआउट, साफ स्पेसिंग और आसान मैच कंट्रोल।',
      mode: 'मोड',
      turn: 'चाल',
      moves: 'चालें',
      theme: 'थीम',
      matchSetup: 'मैच सेटअप',
      modeLocal: 'प्लेयर बनाम प्लेयर (लोकल)',
      modeAi: 'प्लेयर बनाम AI',
      modeOnline: 'ऑनलाइन मल्टीप्लेयर',
      aiDepth: 'AI गहराई',
      timer: 'टाइमर',
      timerNone: 'कोई टाइमर नहीं',
      timerBlitz: 'ब्लिट्ज (5+0)',
      timerRapid: 'रैपिड (10+0)',
      timerFormat: 'टाइमर प्रारूप',
      restart: 'रीस्टार्ट',
      undo: 'अनडू',
      redo: 'रीडू',
      offerDraw: 'ड्रॉ ऑफर',
      resign: 'रिजाइन',
      exportPgn: 'PGN एक्सपोर्ट',
      moveSound: 'मूव साउंड',
      controlHint: 'तेज़ एक्शन के लिए Ctrl/Cmd + Z, Y, और R का उपयोग करें।',
      onlineRoom: 'ऑनलाइन रूम',
      createRoom: 'रूम बनाएँ',
      joinRoom: 'रूम जॉइन करें',
      roomCodePlaceholder: 'रूम कोड',
      offline: 'ऑफलाइन',
      black: 'काला',
      upperBoard: 'ऊपरी बोर्ड',
      liveBoard: 'लाइव बोर्ड',
      boardSubtitle: 'लाइव स्टेटस, घड़ी और चाल ट्रैकिंग के साथ केंद्रित खेल क्षेत्र',
      boardCaptionMain: 'चतुरंग की विरासत',
      boardCaptionSub: 'आधुनिक प्रतिस्पर्धी बोर्ड के चारों ओर भारतीय रूपांकनों का हल्का स्पर्श',
      ready: 'तैयार',
      interaction: 'इंटरैक्शन',
      interactionValue: 'पीस को क्लिक करें या ड्रैग करें',
      formats: 'फ़ॉर्मेट',
      formatsValue: 'FEN इम्पोर्ट और PGN एक्सपोर्ट तैयार',
      heritageFootnoteLabel: 'ऐतिहासिक संकेत',
      heritageFootnoteValue: 'इस दृश्य शैली में भारतीय दरबारी ज्यामिति, नक्काशीदार किनारे और चतुरंग की शुरुआती भावना की हल्की झलक है।',
      white: 'सफेद',
      lowerBoard: 'निचला बोर्ड',
      positionTools: 'पोजीशन टूल्स',
      positionToolsNote: 'कस्टम सेटअप लोड करें या मैनुअल इनपुट जाँचें',
      loadFen: 'FEN लोड करें',
      fenPlaceholder: 'FEN स्ट्रिंग पेस्ट करें',
      moveInput: 'मूव इनपुट',
      movePlaceholder: 'e2e4 या e7e8q',
      applyMove: 'मूव लागू करें',
      moveHistory: 'मूव हिस्ट्री',
      moveHistoryNote: 'PGN के लिए तैयार नोटेशन',
      pgnNote: 'पूरी लाइन देखें या एक्सपोर्ट करें',
      languageEnglish: 'अंग्रेज़ी',
      languageHindi: 'हिंदी',
      languageSpanish: 'स्पैनिश',
      themeDark: 'डार्क',
      themeLight: 'लाइट',
      initializing: 'शुरू हो रहा है...',
      localMatch: 'लोकल मैच',
      vsAi: 'AI के खिलाफ',
      onlineRoomShort: 'ऑनलाइन रूम',
      whiteToMove: 'सफेद की चाल',
      blackToMove: 'काले की चाल',
      youAre: 'आप {color} हैं।',
      checkSuffix: ' (शाह)',
      unableCreateLocalRoom: 'लोकल रूम नहीं बन पाया',
      unableInitializeLocalBoard: 'लोकल बोर्ड शुरू नहीं हो पाया',
      invalidMove: 'अमान्य चाल',
      aiThinking: 'AI सोच रहा है...',
      aiRequestFailed: 'AI अनुरोध असफल रहा',
      restartFailed: 'रीस्टार्ट असफल रहा',
      invalidFen: 'अमान्य FEN',
      fenLoaded: 'FEN लोड हो गया',
      exportPgnFailed: 'PGN एक्सपोर्ट नहीं हो पाया',
      exportPgnSuccess: 'PGN एक्सपोर्ट हो गया है।',
      undoDisabledOnline: 'ऑनलाइन मोड में अनडू उपलब्ध नहीं है।',
      gameOver: 'गेम समाप्त हो चुका है।',
      noMovesUndo: 'अनडू के लिए कोई चाल नहीं है।',
      noMovesRedo: 'रीडू के लिए कोई चाल नहीं है।',
      drawOfferLocalOnly: 'इस बिल्ड में ड्रॉ ऑफर केवल लोकल मोड में है।',
      drawOfferPrompt: 'प्रतिद्वंदी को ड्रॉ ऑफर करें? स्वीकार करने के लिए OK दबाएँ।',
      drawAgreed: 'दोनों खिलाड़ियों ने ड्रॉ स्वीकार किया।',
      replaying: 'फिर से चलाया जा रहा है...',
      typedMoveFormat: 'e2e4 या e7e8q जैसे फ़ॉर्मेट का उपयोग करें',
      createRoomFailed: 'रूम बनाना असफल रहा',
      joinFailed: 'जॉइन असफल रहा',
      unableInitializeGame: 'गेम शुरू नहीं हो पाया।',
      promotePrompt: 'किसमें प्रमोट करें (q, r, b, n):',
      roomYouAre: 'रूम {room} | आप: {color}',
      roomPresence: 'रूम {room} | आप: {color} | W:{white} B:{black}',
      connectedOn: 'ऑन',
      connectedOff: 'ऑफ',
      whiteColor: 'सफेद',
      blackColor: 'काला',
      spectator: 'दर्शक',
      resigned: '{color} ने रिजाइन किया। {winner} जीता।',
      checkmate: 'चेकमेट। {winner} जीता।',
      stalemate: 'स्टेलमेट।',
      threefold: 'तीन बार स्थिति दोहरने से ड्रॉ।',
      fiftyMove: '50-मूव नियम से ड्रॉ।',
      insufficient: 'अपर्याप्त सामग्री से ड्रॉ।',
      whiteFlagged: 'सफेद का समय समाप्त। काला जीता।',
      blackFlagged: 'काले का समय समाप्त। सफेद जीता।',
    },
    es: {
      heroEyebrow: 'Sala de partida estratégica',
      heroText: 'Un espacio de ajedrez más pulido para partidas locales, práctica con IA y salas en línea.',
      heritageLabel: 'Inspirado en',
      heritageValue: 'Chaturanga, la antigua raíz india del ajedrez',
      heritageChip: 'Legado',
      heritageChipValue: 'Estrategia antigua, tablero moderno',
      darkMode: 'Modo oscuro',
      language: 'Idioma',
      heroNote: 'Diseño adaptable, mejor espaciado y controles más claros.',
      mode: 'Modo',
      turn: 'Turno',
      moves: 'Movimientos',
      theme: 'Tema',
      matchSetup: 'Configuración de partida',
      modeLocal: 'Jugador vs Jugador (Local)',
      modeAi: 'Jugador vs IA',
      modeOnline: 'Multijugador en línea',
      aiDepth: 'Profundidad IA',
      timer: 'Temporizador',
      timerNone: 'Sin temporizador',
      timerBlitz: 'Blitz (5+0)',
      timerRapid: 'Rapid (10+0)',
      timerFormat: 'Formato de tiempo',
      restart: 'Reiniciar',
      undo: 'Deshacer',
      redo: 'Rehacer',
      offerDraw: 'Ofrecer tablas',
      resign: 'Rendirse',
      exportPgn: 'Exportar PGN',
      moveSound: 'Sonido de movimiento',
      controlHint: 'Usa Ctrl/Cmd + Z, Y y R para acciones rápidas.',
      onlineRoom: 'Sala en línea',
      createRoom: 'Crear sala',
      joinRoom: 'Unirse a sala',
      roomCodePlaceholder: 'Código de sala',
      offline: 'Sin conexión',
      black: 'Negras',
      upperBoard: 'Tablero superior',
      liveBoard: 'Tablero en vivo',
      boardSubtitle: 'Área de juego enfocada con estado en vivo, relojes y seguimiento de movimientos',
      boardCaptionMain: 'Legado de Chaturanga',
      boardCaptionSub: 'Sutiles motivos indios alrededor de un tablero competitivo moderno',
      ready: 'Listo',
      interaction: 'Interacción',
      interactionValue: 'Haz clic o arrastra las piezas',
      formats: 'Formatos',
      formatsValue: 'Importación FEN y exportación PGN listas',
      heritageFootnoteLabel: 'Nota histórica',
      heritageFootnoteValue: 'El tono visual evoca geometría cortesana india, bordes tallados y el espíritu temprano del Chaturanga.',
      white: 'Blancas',
      lowerBoard: 'Tablero inferior',
      positionTools: 'Herramientas de posición',
      positionToolsNote: 'Carga posiciones personalizadas o prueba entradas manuales',
      loadFen: 'Cargar FEN',
      fenPlaceholder: 'Pega la cadena FEN',
      moveInput: 'Entrada de movimiento',
      movePlaceholder: 'e2e4 o e7e8q',
      applyMove: 'Aplicar movimiento',
      moveHistory: 'Historial de movimientos',
      moveHistoryNote: 'Notación lista para PGN',
      pgnNote: 'Exporta o revisa la línea completa',
      languageEnglish: 'Inglés',
      languageHindi: 'Hindi',
      languageSpanish: 'Español',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      initializing: 'Iniciando...',
      localMatch: 'Partida local',
      vsAi: 'Vs IA',
      onlineRoomShort: 'Sala en línea',
      whiteToMove: 'Juegan blancas',
      blackToMove: 'Juegan negras',
      youAre: 'Tú eres {color}.',
      checkSuffix: ' (Jaque)',
      unableCreateLocalRoom: 'No se pudo crear la sala local',
      unableInitializeLocalBoard: 'No se pudo iniciar el tablero local',
      invalidMove: 'Movimiento no válido',
      aiThinking: 'La IA está pensando...',
      aiRequestFailed: 'La solicitud de IA falló',
      restartFailed: 'No se pudo reiniciar',
      invalidFen: 'FEN no válido',
      fenLoaded: 'FEN cargado',
      exportPgnFailed: 'No se pudo exportar el PGN',
      exportPgnSuccess: 'PGN exportado.',
      undoDisabledOnline: 'Deshacer no está disponible en modo en línea.',
      gameOver: 'La partida ha terminado.',
      noMovesUndo: 'No hay movimientos para deshacer.',
      noMovesRedo: 'No hay movimientos para rehacer.',
      drawOfferLocalOnly: 'La oferta de tablas solo está disponible en modo local.',
      drawOfferPrompt: '¿Ofrecer tablas al oponente? Pulsa OK para aceptar.',
      drawAgreed: 'Tablas acordadas por los jugadores.',
      replaying: 'Reproduciendo...',
      typedMoveFormat: 'Usa un formato como e2e4 o e7e8q',
      createRoomFailed: 'No se pudo crear la sala',
      joinFailed: 'No se pudo unir',
      unableInitializeGame: 'No se pudo iniciar la partida.',
      promotePrompt: 'Promocionar a (q, r, b, n):',
      roomYouAre: 'Sala {room} | Tú: {color}',
      roomPresence: 'Sala {room} | Tú: {color} | B:{white} N:{black}',
      connectedOn: 'on',
      connectedOff: 'off',
      whiteColor: 'blancas',
      blackColor: 'negras',
      spectator: 'espectador',
      resigned: '{color} se rindió. {winner} gana.',
      checkmate: 'Jaque mate. {winner} gana.',
      stalemate: 'Ahogado.',
      threefold: 'Tablas por triple repetición.',
      fiftyMove: 'Tablas por la regla de 50 movimientos.',
      insufficient: 'Tablas por material insuficiente.',
      whiteFlagged: 'Se acabó el tiempo de blancas. Ganan negras.',
      blackFlagged: 'Se acabó el tiempo de negras. Ganan blancas.',
    },
  };

  function t(key, vars = {}) {
    const table = translations[state.language] || translations.en;
    let text = table[key] || translations.en[key] || key;
    Object.entries(vars).forEach(([name, value]) => {
      text = text.replaceAll(`{${name}}`, String(value));
    });
    return text;
  }

  function localizedColor(color) {
    if (color === 'white') return t('whiteColor');
    if (color === 'black') return t('blackColor');
    return t('spectator');
  }

  function applyTranslations() {
    document.documentElement.lang = state.language;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    const languageOptions = {
      en: t('languageEnglish'),
      hi: t('languageHindi'),
      es: t('languageSpanish'),
    };
    Array.from(languageSelect?.options || []).forEach((option) => {
      option.textContent = languageOptions[option.value] || option.textContent;
    });
  }

  function getPreferredLanguage() {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored && translations[stored]) return stored;
    const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return translations[browserLang] ? browserLang : 'en';
  }

  function applyLanguage(language) {
    state.language = translations[language] ? language : 'en';
    if (languageSelect) languageSelect.value = state.language;
    window.localStorage.setItem(LANG_KEY, state.language);
    applyTranslations();
    updateRoomInfo();
    render();
  }

  function updateRoomInfo(meta = null) {
    if (!roomInfo) return;
    if (state.mode !== 'online' || !state.activeRoomCode || !state.onlineColor) {
      roomInfo.textContent = t('offline');
      return;
    }

    if (meta) {
      roomInfo.textContent = t('roomPresence', {
        room: state.activeRoomCode,
        color: localizedColor(state.onlineColor),
        white: meta.whiteConnected ? t('connectedOn') : t('connectedOff'),
        black: meta.blackConnected ? t('connectedOn') : t('connectedOff'),
      });
      return;
    }

    roomInfo.textContent = t('roomYouAre', {
      room: state.activeRoomCode,
      color: localizedColor(state.onlineColor),
    });
  }

  function toSquare(row, col) {
    return `${FILES[col]}${8 - row}`;
  }

  function formatMs(ms) {
    const s = Math.max(0, Math.floor((ms || 0) / 1000));
    const tenths = Math.max(0, Math.floor(((ms || 0) % 1000) / 100));
    const min = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    if (timeFormatEl?.value === 'mmss_ms') return `${min}:${sec}.${tenths}`;
    return `${min}:${sec}`;
  }

  function playTone(freq, ms) {
    if (!soundToggle?.checked) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, ms);
    } catch (_) {
      // no-op
    }
  }

  function parseFenBoard(fen) {
    const board = Array.from({ length: 8 }, () => Array(8).fill(null));
    if (!fen) return board;
    const rows = fen.split(' ')[0].split('/');
    for (let r = 0; r < 8; r += 1) {
      let c = 0;
      for (const ch of rows[r]) {
        if (/\d/.test(ch)) {
          c += Number(ch);
        } else {
          board[r][c] = ch;
          c += 1;
        }
      }
    }
    return board;
  }

  function pieceAtSquare(square) {
    const boardData = parseFenBoard(state.game?.fen || '');
    const row = 8 - Number(square[1]);
    const col = FILES.indexOf(square[0]);
    if (row < 0 || row > 7 || col < 0 || col > 7) return null;
    return boardData[row][col];
  }

  function updateHistory() {
    historyList.innerHTML = '';
    const pgn = state.game?.pgn || '';
    pgnOutput.value = pgn;
    moveCount.textContent = String(state.game?.moves?.length || 0);

    if (!pgn.trim()) return;
    const tokens = pgn.replace(/\{[^}]*\}/g, '').trim().split(/\s+/);
    const moves = tokens.filter((t) => !/^\d+\.?$/.test(t) && !/^(1-0|0-1|1\/2-1\/2|\*)$/.test(t));

    for (let i = 0; i < moves.length; i += 2) {
      const li = document.createElement('li');
      const moveNo = Math.floor(i / 2) + 1;
      li.textContent = `${moveNo}. ${moves[i] || ''}${moves[i + 1] ? ` ${moves[i + 1]}` : ''}`;
      historyList.appendChild(li);
    }
  }

  function getResultStatus() {
    if (!state.game) return '';
    if (state.forcedResult) return state.forcedResult;
    if (state.resignedBy) {
      const winner = state.resignedBy === 'white' ? t('black') : t('white');
      return t('resigned', { color: localizedColor(state.resignedBy), winner });
    }
    if (state.game.isCheckmate) return t('checkmate', { winner: state.game.turn === 'w' ? t('black') : t('white') });
    if (state.game.isStalemate) return t('stalemate');
    if (state.game.isThreefoldRepetition) return t('threefold');
    if (state.game.isDrawByFiftyMoves) return t('fiftyMove');
    if (state.game.isInsufficientMaterial) return t('insufficient');
    if (state.game.timerMode !== 'none' && (state.game.whiteTimeMs || 1) <= 0) return t('whiteFlagged');
    if (state.game.timerMode !== 'none' && (state.game.blackTimeMs || 1) <= 0) return t('blackFlagged');
    return '';
  }

  function buildStatus() {
    if (!state.game) return t('initializing');
    const result = getResultStatus();
    if (result) return result;

    const turnSide = state.game.turn === 'w' ? t('white') : t('black');
    const check = state.game.inCheck ? t('checkSuffix') : '';
    const base = state.mode === 'online' && state.onlineColor
      ? `${state.game.turn === 'w' ? t('whiteToMove') : t('blackToMove')}${check}. ${t('youAre', { color: localizedColor(state.onlineColor) })}`
      : `${state.game.turn === 'w' ? t('whiteToMove') : t('blackToMove')}${check}.`;
    return state.lastInfo ? `${base} ${state.lastInfo}` : base;
  }

  function modeLabel() {
    if (state.mode === 'ai') return t('vsAi');
    if (state.mode === 'online') return t('onlineRoomShort');
    return t('localMatch');
  }

  function getPreferredTheme() {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    document.body.dataset.theme = state.theme;
    if (themeToggle) themeToggle.checked = state.theme === 'dark';
    if (themeBadge) themeBadge.textContent = state.theme === 'dark' ? t('themeDark') : t('themeLight');
    window.localStorage.setItem(THEME_KEY, state.theme);
  }

  function refreshBadges() {
    if (modeBadge) modeBadge.textContent = modeLabel();
    if (moveCount) moveCount.textContent = String(state.game?.moves?.length || 0);
    if (themeBadge) themeBadge.textContent = state.theme === 'dark' ? t('themeDark') : t('themeLight');

    const result = getResultStatus();
    if (turnBadge) {
      if (!state.game) turnBadge.textContent = t('initializing');
      else if (result) turnBadge.textContent = result;
      else turnBadge.textContent = state.game.turn === 'w' ? t('whiteToMove') : t('blackToMove');
    }

    if (whitePanel && blackPanel) {
      whitePanel.classList.toggle('active', Boolean(state.game) && state.game.turn === 'w' && !result);
      blackPanel.classList.toggle('active', Boolean(state.game) && state.game.turn === 'b' && !result);
    }
  }

  function updateTimerUI() {
    if (state.game?.timerMode === 'none') {
      whiteTimerEl.textContent = '--:--';
      blackTimerEl.textContent = '--:--';
      whiteTimerEl.classList.remove('time-warn', 'time-critical');
      blackTimerEl.classList.remove('time-warn', 'time-critical');
      refreshBadges();
      return;
    }

    const w = state.game?.whiteTimeMs || 0;
    const b = state.game?.blackTimeMs || 0;
    whiteTimerEl.textContent = formatMs(w);
    blackTimerEl.textContent = formatMs(b);

    whiteTimerEl.classList.remove('time-warn', 'time-critical');
    blackTimerEl.classList.remove('time-warn', 'time-critical');
    if (w <= 10000) whiteTimerEl.classList.add('time-critical');
    else if (w <= 60000) whiteTimerEl.classList.add('time-warn');
    if (b <= 10000) blackTimerEl.classList.add('time-critical');
    else if (b <= 60000) blackTimerEl.classList.add('time-warn');
    refreshBadges();
  }

  function isHumanTurn() {
    if (!state.game) return false;
    if (state.mode === 'ai') return state.game.turn === 'w';
    return true;
  }

  function isMyTurnOnline() {
    if (!state.game || state.mode !== 'online') return true;
    if (!state.onlineColor || state.onlineColor === 'spectator') return false;
    return (state.game.turn === 'w' && state.onlineColor === 'white') || (state.game.turn === 'b' && state.onlineColor === 'black');
  }

  function isGameLocked() {
    return Boolean(getResultStatus()) || state.aiThinking;
  }

  function applyServerState(serverState) {
    if (!serverState) return;
    state.game = serverState;
    state.localTickAt = Date.now();
    state.activeRoomCode = serverState.roomCode || state.activeRoomCode;
    state.selected = null;
    state.legalTargets = [];
    updateHistory();
    updateTimerUI();
    refreshBadges();
    statusText.textContent = buildStatus();
    render();
  }

  async function ensureLocalRoom() {
    if (state.localRoomCode) {
      state.activeRoomCode = state.localRoomCode;
      return true;
    }

      const created = await window.Multiplayer.createRoom(timerModeEl.value);
    if (!created?.ok) {
      state.lastInfo = created?.error || t('unableCreateLocalRoom');
      render();
      return false;
    }

    const joined = await window.Multiplayer.joinRoom(created.roomCode);
    if (!joined?.ok) {
      state.lastInfo = joined?.error || t('unableInitializeLocalBoard');
      render();
      return false;
    }

    state.localRoomCode = created.roomCode;
    state.activeRoomCode = created.roomCode;
    applyServerState(created.state);
    return true;
  }

  async function requestLegalMoves(square) {
    const out = await window.Multiplayer.requestLegalMoves(square);
    if (!out?.ok) return [];
    return (out.moves || []).map((m) => ({ to: m.to, isCapture: Boolean(m.isCapture) }));
  }

  function legalTargetSquares() {
    return state.legalTargets.map((m) => m.to);
  }

  async function attemptMove(from, to, forcedPromotion = null) {
    if (!state.game || !from || !to) return;
    if (!isMyTurnOnline() || !isHumanTurn() || isGameLocked()) return;

    const move = { from, to };
    if (forcedPromotion) {
      move.promotion = forcedPromotion;
    } else {
      const piece = pieceAtSquare(from);
      const isPawn = piece && (piece === 'P' || piece === 'p');
      const promotionRank = to.endsWith('8') || to.endsWith('1');
      if (isPawn && promotionRank) {
        const ans = prompt(t('promotePrompt'), 'q');
        const promoted = ['q', 'r', 'b', 'n'].includes((ans || '').toLowerCase()) ? ans.toLowerCase() : 'q';
        move.promotion = promoted;
      }
    }

    const movingColor = state.game.turn === 'w' ? 'white' : 'black';
    const res = state.mode === 'online'
      ? await window.Multiplayer.sendMove(move)
      : await window.Multiplayer.sendMoveAs(move, movingColor);

    if (!res?.ok) {
      state.lastInfo = res?.error || t('invalidMove');
      render();
      return;
    }

    state.lastInfo = '';
    state.redoMoves = [];
    applyServerState(res.state);
    const lm = state.game?.lastMove || {};
    if (lm.isCheckmate) playTone(260, 280);
    else if (lm.isCapture) playTone(420, 130);
    else if (lm.isCheck) playTone(770, 160);
    else playTone(520, 90);

    if (state.mode === 'ai' && state.game && state.game.turn === 'b' && !state.game.isGameOver) {
      await runAiTurn();
    }
  }

  async function handleSquareClick(square) {
    if (!state.game || !isMyTurnOnline() || !isHumanTurn() || isGameLocked()) return;

    const boardData = parseFenBoard(state.game.fen);
    const row = 8 - Number(square[1]);
    const col = FILES.indexOf(square[0]);
    const piece = row >= 0 && col >= 0 ? boardData[row][col] : null;
    const turnIsWhite = state.game.turn === 'w';

    if (!state.selected) {
      if (piece && ((turnIsWhite && /[A-Z]/.test(piece)) || (!turnIsWhite && /[a-z]/.test(piece)))) {
        state.selected = square;
        state.legalTargets = await requestLegalMoves(square);
        render();
      }
      return;
    }

    if (state.selected === square) {
      state.selected = null;
      state.legalTargets = [];
      render();
      return;
    }

    if (legalTargetSquares().includes(square)) {
      const from = state.selected;
      state.selected = null;
      state.legalTargets = [];
      await attemptMove(from, square);
      return;
    }

    state.selected = null;
    state.legalTargets = [];
    render();
  }

  async function runAiTurn() {
    if (!state.game) return;
    state.aiThinking = true;
    state.lastInfo = t('aiThinking');
    render();

    try {
      const res = await fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: state.game.fen, depth: Number(aiDepthEl.value) }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.move) {
        const out = await window.Multiplayer.sendMoveAs(
          { from: data.move.from, to: data.move.to, promotion: data.move.promotion || undefined },
          'black',
        );
        if (out?.ok) applyServerState(out.state);
      }
    } catch (err) {
      state.lastInfo = t('aiRequestFailed');
    }

    state.aiThinking = false;
    render();
  }

  async function restartGame() {
    if (state.mode !== 'online') {
      const ok = await ensureLocalRoom();
      if (!ok) return;
    }

    const res = await window.Multiplayer.requestRestart(timerModeEl.value);
    if (!res?.ok) {
      state.lastInfo = res?.error || t('restartFailed');
      render();
      return;
    }

    state.resignedBy = null;
    state.forcedResult = '';
    state.redoMoves = [];
    state.lastInfo = '';
    applyServerState(res.state);
  }

  async function loadFen() {
    const fen = document.getElementById('fenInput').value.trim();
    if (!fen) return;

    const res = await window.Multiplayer.requestFenLoad(fen);
    if (!res?.ok) {
      state.lastInfo = res?.error || t('invalidFen');
      render();
      return;
    }

    state.lastInfo = t('fenLoaded');
    applyServerState(res.state);
  }

  async function exportPgn() {
    const res = await window.Multiplayer.requestPgn();
    if (!res?.ok) {
      state.lastInfo = res?.error || t('exportPgnFailed');
      render();
      return;
    }
    const pgn = res.pgn || '';
    pgnOutput.value = pgn;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pgn);
      }
    } catch (_) {
      // Clipboard can fail on insecure origins; ignore.
    }

    try {
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      const blob = new Blob([pgn], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chess-game-${stamp}.pgn`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_) {
      // Download can be blocked by browser policy.
    }

    state.lastInfo = t('exportPgnSuccess');
    render();
  }

  function undoMove() {
    if (state.mode === 'online' || !state.game) {
      state.lastInfo = t('undoDisabledOnline');
      render();
      return;
    }
    if (state.game.isGameOver) {
      state.lastInfo = t('gameOver');
      render();
      return;
    }
    const moveList = (state.game.moves || []).map((m) => m.uci).filter(Boolean);
    if (!moveList.length) {
      state.lastInfo = t('noMovesUndo');
      render();
      return;
    }
    const undone = moveList.pop();
    state.redoMoves.push(undone);
    replayMoves(moveList);
  }

  function redoMove() {
    if (state.mode === 'online' || !state.game) {
      state.lastInfo = t('undoDisabledOnline');
      render();
      return;
    }
    const next = state.redoMoves.pop();
    if (!next) {
      state.lastInfo = t('noMovesRedo');
      render();
      return;
    }
    const moveList = (state.game.moves || []).map((m) => m.uci).filter(Boolean);
    moveList.push(next);
    replayMoves(moveList);
  }

  function resignGame() {
    if (!state.game) return;
    state.resignedBy = state.game.turn === 'w' ? 'white' : 'black';
    state.forcedResult = '';
    render();
  }

  function offerDraw() {
    if (state.mode === 'online') {
      state.lastInfo = t('drawOfferLocalOnly');
      render();
      return;
    }
    if (!state.game || state.game.isGameOver) return;
    const accepted = window.confirm(t('drawOfferPrompt'));
    if (accepted) {
      state.forcedResult = t('drawAgreed');
      state.lastInfo = '';
      playTone(420, 130);
      render();
    }
  }

  function parseUci(uci) {
    if (!uci || uci.length < 4) return null;
    return {
      from: uci.slice(0, 2),
      to: uci.slice(2, 4),
      promotion: uci.length > 4 ? uci[4] : undefined,
    };
  }

  async function replayMoves(uciMoves) {
    state.lastInfo = t('replaying');
    render();
    await restartGame();
    for (const uci of uciMoves) {
      const mv = parseUci(uci);
      if (!mv || !state.game) continue;
      const color = state.game.turn === 'w' ? 'white' : 'black';
      const out = await window.Multiplayer.sendMoveAs(mv, color);
      if (out?.ok) applyServerState(out.state);
      else break;
    }
    state.lastInfo = '';
    render();
  }

  async function applyTypedMove() {
    const text = (moveInput.value || '').trim().toLowerCase();
    const m = text.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?$/);
    if (!m) {
      state.lastInfo = t('typedMoveFormat');
      render();
      return;
    }

    moveInput.value = '';
    await attemptMove(m[1], m[2], m[3] || null);
  }

  async function handleCreateRoom() {
    const res = await window.Multiplayer.createRoom(timerModeEl.value);
    if (!res?.ok) {
      state.lastInfo = res?.error || t('createRoomFailed');
      render();
      return;
    }

    state.mode = 'online';
    modeSelect.value = 'online';
    state.onlineColor = res.color;
    state.activeRoomCode = res.roomCode;
    roomCodeInput.value = res.roomCode;
    updateRoomInfo();
    applyServerState(res.state);
  }

  async function handleJoinRoom() {
    const roomCode = roomCodeInput.value.trim().toUpperCase();
    if (!roomCode) return;

    const res = await window.Multiplayer.joinRoom(roomCode);
    if (!res?.ok) {
      state.lastInfo = res?.error || t('joinFailed');
      render();
      return;
    }

    state.mode = 'online';
    modeSelect.value = 'online';
    state.onlineColor = res.color;
    state.activeRoomCode = res.roomCode;
    updateRoomInfo();
    applyServerState(res.state);
  }

  function render() {
    boardEl.innerHTML = '';

    const boardData = parseFenBoard(state.game?.fen || '8/8/8/8/8/8/8/8 w - - 0 1');

    for (let r = 0; r < 8; r += 1) {
      for (let c = 0; c < 8; c += 1) {
        const square = toSquare(r, c);
        const sq = document.createElement('div');
        sq.className = `square ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
        sq.dataset.square = square;

        if (state.selected === square) sq.classList.add('selected');
        if (state.game?.lastMove?.from === square) sq.classList.add('last-from');
        if (state.game?.lastMove?.to === square) sq.classList.add('last-to');
        const legal = state.legalTargets.find((m) => m.to === square);
        if (legal) sq.classList.add(legal.isCapture ? 'legal-capture' : 'legal');
        if (state.game?.checkedKingSquare === square) sq.classList.add('king-check');

        if (c === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord-rank';
          rankLabel.textContent = String(8 - r);
          sq.appendChild(rankLabel);
        }
        if (r === 7) {
          const fileLabel = document.createElement('span');
          fileLabel.className = 'coord-file';
          fileLabel.textContent = FILES[c];
          sq.appendChild(fileLabel);
        }

        sq.addEventListener('click', () => handleSquareClick(square));
        sq.addEventListener('dragover', (e) => e.preventDefault());
        sq.addEventListener('drop', async (e) => {
          e.preventDefault();
          const from = e.dataTransfer.getData('text/plain');
          await attemptMove(from, square);
        });

        const pieceChar = boardData[r][c];
        if (pieceChar) {
          const p = document.createElement('img');
          p.className = 'piece';
          p.draggable = !isGameLocked();
          p.src = PIECE_ASSETS[pieceChar] || '';
          p.alt = `${/[A-Z]/.test(pieceChar) ? t('white') : t('black')} piece`;
          p.addEventListener('dragstart', async (e) => {
            if (isGameLocked()) return;
            e.dataTransfer.setData('text/plain', square);
            state.selected = square;
            state.legalTargets = await requestLegalMoves(square);
            render();
          });
          p.addEventListener('dragend', () => {
            state.selected = null;
            state.legalTargets = [];
            render();
          });
          sq.appendChild(p);
        }

        boardEl.appendChild(sq);
      }
    }

    statusText.textContent = buildStatus();
    updateTimerUI();
    refreshBadges();
  }

  function tickLocalClock() {
    if (!state.game) return;
    if (state.game.timerMode === 'none') return;
    if (state.game.isGameOver) return;
    if (state.forcedResult || state.resignedBy) return;

    const now = Date.now();
    const elapsed = Math.max(0, now - (state.localTickAt || now));
    state.localTickAt = now;
    if (elapsed === 0) return;

    if (state.game.turn === 'w') state.game.whiteTimeMs = Math.max(0, (state.game.whiteTimeMs || 0) - elapsed);
    else state.game.blackTimeMs = Math.max(0, (state.game.blackTimeMs || 0) - elapsed);

    updateTimerUI();
    statusText.textContent = buildStatus();
    refreshBadges();
  }

  modeSelect.addEventListener('change', async () => {
    state.mode = modeSelect.value;
    onlineControls.style.display = state.mode === 'online' ? 'flex' : 'none';
    refreshBadges();

    if (state.mode !== 'online') {
      state.onlineColor = null;
      updateRoomInfo();
      await ensureLocalRoom();
    }

    await restartGame();
  });

  restartBtn.addEventListener('click', restartGame);
  exportPgnBtn.addEventListener('click', exportPgn);
  loadFenBtn.addEventListener('click', loadFen);
  createRoomBtn.addEventListener('click', handleCreateRoom);
  joinRoomBtn.addEventListener('click', handleJoinRoom);
  undoBtn.addEventListener('click', undoMove);
  redoBtn.addEventListener('click', redoMove);
  drawBtn.addEventListener('click', offerDraw);
  resignBtn.addEventListener('click', resignGame);
  applyMoveBtn.addEventListener('click', applyTypedMove);
  moveInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') await applyTypedMove();
  });

  document.addEventListener('keydown', async (e) => {
    const active = document.activeElement;
    const inTextField = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      undoMove();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      redoMove();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
      e.preventDefault();
      await restartGame();
      return;
    }
    if (!inTextField && e.key === 'Escape') {
      state.selected = null;
      state.legalTargets = [];
      render();
    }
  });

  timerModeEl.addEventListener('change', async () => {
    if (state.mode !== 'online') await restartGame();
  });
  timeFormatEl?.addEventListener('change', () => render());
  themeToggle?.addEventListener('change', () => applyTheme(themeToggle.checked ? 'dark' : 'light'));
  languageSelect?.addEventListener('change', () => applyLanguage(languageSelect.value));

  window.Multiplayer.onState((serverState) => {
    if (!serverState) return;
    if (state.activeRoomCode && serverState.roomCode && state.activeRoomCode !== serverState.roomCode) return;
    applyServerState(serverState);
  });

  window.Multiplayer.onRoomUpdate((meta) => {
    if (state.mode === 'online') {
      state.activeRoomCode = window.Multiplayer.getCurrentRoom() || state.activeRoomCode;
      updateRoomInfo(meta);
    }
  });

  setInterval(tickLocalClock, 200);

  (async function init() {
    applyLanguage(getPreferredLanguage());
    applyTheme(getPreferredTheme());
    onlineControls.style.display = 'none';
    updateRoomInfo();
    refreshBadges();
    const ok = await ensureLocalRoom();
    if (ok) {
      await restartGame();
    } else {
      statusText.textContent = state.lastInfo || t('unableInitializeGame');
    }
  })();
})();
