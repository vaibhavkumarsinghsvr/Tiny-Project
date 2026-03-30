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
  const playerColorEl = document.getElementById('playerColor');
  const visualModeSelect = document.getElementById('visualModeSelect');
  const visualModeBadge = document.getElementById('visualModeBadge');
  const evalFill = document.getElementById('evalFill');
  const evalLabel = document.getElementById('evalLabel');
  const trainerPrevBtn = document.getElementById('trainerPrevBtn');
  const trainerNextBtn = document.getElementById('trainerNextBtn');
  const trainerLessonCount = document.getElementById('trainerLessonCount');
  const trainerLessonTitle = document.getElementById('trainerLessonTitle');
  const trainerLessonFocus = document.getElementById('trainerLessonFocus');
  const trainerLessonPoints = document.getElementById('trainerLessonPoints');
  const trainerCoachText = document.getElementById('trainerCoachText');
  const summaryModal = document.getElementById('summaryModal');
  const summaryCloseBtn = document.getElementById('summaryCloseBtn');
  const summaryRematchBtn = document.getElementById('summaryRematchBtn');
  const summaryTitle = document.getElementById('summaryTitle');
  const summaryResult = document.getElementById('summaryResult');
  const summaryMoves = document.getElementById('summaryMoves');
  const summaryOpening = document.getElementById('summaryOpening');
  const summaryWhiteTime = document.getElementById('summaryWhiteTime');
  const summaryBlackTime = document.getElementById('summaryBlackTime');
  const summaryEval = document.getElementById('summaryEval');
  const setupToggleBtn = document.getElementById('setupToggleBtn');
  const controlPanelContent = document.getElementById('controlPanelContent');
  const hintBtn = document.getElementById('hintBtn');
  const flipBoardBtn = document.getElementById('flipBoardBtn');
  const whiteCaptured = document.getElementById('whiteCaptured');
  const blackCaptured = document.getElementById('blackCaptured');
  const recentGamesList = document.getElementById('recentGamesList');
  const puzzlePanel = document.getElementById('puzzlePanel');
  const puzzleProgress = document.getElementById('puzzleProgress');
  const puzzlePrompt = document.getElementById('puzzlePrompt');
  const puzzleDescription = document.getElementById('puzzleDescription');
  const puzzleFeedback = document.getElementById('puzzleFeedback');
  const puzzleRetryBtn = document.getElementById('puzzleRetryBtn');
  const puzzleNextBtn = document.getElementById('puzzleNextBtn');

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
  const PIECE_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  const PUZZLES = [
    {
      fen: '3Q4/8/8/8/8/7K/8/7k w - - 0 1',
      solution: 'd8d1',
      promptKey: 'puzzleMateInOne',
      description: 'White to move and finish the game immediately.',
    },
    {
      fen: '8/3Q4/8/8/8/K7/8/1k6 w - - 0 1',
      solution: 'd7d1',
      promptKey: 'puzzleMateInOne',
      description: 'A clean queen finish from long range.',
    },
    {
      fen: '8/5Q2/7k/5K2/8/8/8/8 w - - 0 1',
      solution: 'f7g6',
      promptKey: 'puzzleMateInOne',
      description: 'Use the queen and king together to trap the black king.',
    },
    {
      fen: '8/8/1Q6/8/8/1K6/8/1k6 w - - 0 1',
      solution: 'b6g1',
      promptKey: 'puzzleMateInOne',
      description: 'Spot the diagonal mate from the corner.',
    },
    {
      fen: '6k1/8/6K1/8/8/3Q4/8/8 w - - 0 1',
      solution: 'd3d8',
      promptKey: 'puzzleMateInOne',
      description: 'The queen cuts off every escape square.',
    },
    {
      fen: '8/8/8/k1K5/3Q4/8/8/8 w - - 0 1',
      solution: 'd4a1',
      promptKey: 'puzzleMateInOne',
      description: 'A quiet-looking move that is actually mate.',
    },
    {
      fen: '2k5/8/3K4/8/8/8/Q7/8 w - - 0 1',
      solution: 'a2a8',
      promptKey: 'puzzleMateInOne',
      description: 'Line up the queen on the back rank for mate.',
    },
    {
      fen: '1k6/8/1K6/8/8/8/4Q3/8 w - - 0 1',
      solution: 'e2e8',
      promptKey: 'puzzleMateInOne',
      description: 'A direct queen lift seals the king in.',
    },
    {
      fen: '2k5/8/3K4/8/8/8/6Q1/8 w - - 0 1',
      solution: 'g2a8',
      promptKey: 'puzzleMateInOne',
      description: 'Find the long diagonal to the mating square.',
    },
    {
      fen: '8/2K5/k7/8/8/8/5Q2/8 w - - 0 1',
      solution: 'f2b6',
      promptKey: 'puzzleMateInOne',
      description: 'The final puzzle rewards precise diagonal vision.',
    },
  ];

  const state = {
    mode: 'local',
    theme: 'dark',
    language: 'en',
    aiColor: 'white',
    visualMode: 'indian',
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
    trainerLesson: 0,
    evalScore: 0,
    summaryOpen: false,
    lastSummaryResult: '',
    setupCollapsed: false,
    compactViewport: false,
    boardFlipped: false,
    hintMove: null,
    puzzleIndex: 0,
    puzzleSolved: false,
  };

  const THEME_KEY = 'chess-arena-theme';
  const LANG_KEY = 'chess-arena-language';
  const VISUAL_MODE_KEY = 'chess-arena-visual-mode';
  const RECENT_GAMES_KEY = 'chess-arena-recent-games';
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
      visualMode: 'Visual Mode',
      matchSetup: 'Match Setup',
      setupShow: 'Show Setup',
      setupHide: 'Hide Setup',
      modeLocal: 'Player vs Player (Local)',
      modeTraining: 'Training Mode',
      modePuzzle: 'Puzzle Mode',
      modeAi: 'Player vs AI',
      modeAiVsAi: 'AI vs AI',
      modeOnline: 'Online Multiplayer',
      aiDepth: 'AI Depth',
      yourColor: 'Your Color',
      visualModern: 'Modern',
      visualIndian: 'Indian',
      visualPersian: 'Persian',
      timer: 'Timer',
      timerNone: 'No Timer',
      timerBullet: 'Bullet (1+0)',
      timerBlitz: 'Blitz (5+0)',
      timerRapid: 'Rapid (10+0)',
      timerFormat: 'Timer Format',
      restart: 'Restart',
      hint: 'Hint',
      flipBoard: 'Flip Board',
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
      recentGames: 'Recent Games',
      recentGamesNote: 'Saved in this browser for quick review',
      recentGamesEmpty: 'Your last finished games will appear here.',
      recentGameMoves: '{count} moves',
      recentGameOpening: 'Opening: {name}',
      puzzleTitle: 'Puzzle Mode',
      puzzleMateInOne: 'Mate in 1',
      puzzleDescriptionDefault: 'Find the winning move for the side to move.',
      puzzleRetry: 'Retry',
      puzzleNext: 'Next Puzzle',
      puzzleProgressLabel: 'Puzzle {current} / {total}',
      puzzleSolvedStatus: 'Puzzle solved. Great finish.',
      puzzleCorrect: 'Correct. You found the winning move.',
      puzzleWrong: 'Not the puzzle move. Try again.',
      pgnNote: 'Export or review the full line',
      rulesGuideTitle: 'Rules & Notation',
      rulesGuideNote: 'Quick reference for piece names, legal moves, and standard notation',
      rulesBasicsTitle: 'Game Objective',
      rulesBasics1: "Checkmate the opponent's king: attack it so no legal escape remains.",
      rulesBasics2: 'You may not leave your own king in check after a move.',
      rulesBasics3: 'If no legal move exists and the king is not in check, the result is stalemate.',
      rulesSpecialTitle: 'Special Rules',
      rulesSpecial1: 'Castling: king moves two squares toward a rook, then the rook crosses over. It is illegal if king or rook has moved, the king is in check, or the king crosses an attacked square.',
      rulesSpecial2: 'En passant: a pawn may capture a pawn that just advanced two squares as if it moved only one.',
      rulesSpecial3: 'Promotion: when a pawn reaches the last rank, it becomes a queen, rook, bishop, or knight.',
      rulesSpecial4: 'Draws can occur by stalemate, threefold repetition, the fifty-move rule, agreement, or insufficient material.',
      notationTitle: 'Notation & Piece Names',
      notationKingKey: 'K',
      notationKingValue: 'King',
      notationQueenKey: 'Q',
      notationQueenValue: 'Queen',
      notationRookKey: 'R',
      notationRookValue: 'Rook',
      notationBishopKey: 'B',
      notationBishopValue: 'Bishop',
      notationKnightKey: 'N',
      notationKnightValue: 'Knight',
      notationPawnKey: 'Pawn',
      notationPawnValue: 'Pawns usually have no starting letter in notation.',
      notationRule1: 'Squares are named by file and rank, such as e4, a1, or h8.',
      notationRule2: 'A simple move is written like Nf3 or e4. The x symbol means capture, as in Bxe6.',
      notationRule3: 'Check uses +, checkmate uses #, kingside castling is O-O, and queenside castling is O-O-O.',
      notationRule4: 'Promotion is written with =, for example e8=Q. In this app, typed move input uses coordinate notation such as e2e4 or e7e8q.',
      trainerTitle: 'Chess Trainer',
      trainerNote: 'Learn the basics step by step while you play',
      trainerPrev: 'Previous',
      trainerNext: 'Next',
      trainerCoachTitle: 'Live Coach',
      trainerWaiting: 'The trainer will start giving advice as soon as the board is ready.',
      trainerLessonCount: 'Lesson {current} / {total}',
      trainerLesson1Title: 'Opening Principles',
      trainerLesson1Focus: 'Control the center and develop your pieces before chasing quick attacks.',
      trainerLesson1Point1: 'Try to influence central squares like e4, d4, e5, and d5.',
      trainerLesson1Point2: 'Bring knights and bishops out early so your pieces can work together.',
      trainerLesson1Point3: 'Avoid moving the same piece repeatedly in the opening without a reason.',
      trainerLesson2Title: 'King Safety',
      trainerLesson2Focus: 'Castle early and keep pawns near your king from falling apart for no reason.',
      trainerLesson2Point1: 'Castling usually connects your rooks and moves the king away from the center.',
      trainerLesson2Point2: 'Before opening files near your own king, check whether the opponent can attack.',
      trainerLesson2Point3: 'A safe king lets the rest of your army play more confidently.',
      trainerLesson3Title: 'Tactics First',
      trainerLesson3Focus: 'Before every move, look for checks, captures, and threats for both sides.',
      trainerLesson3Point1: 'Checks are forcing, so always see whether one side has a check available.',
      trainerLesson3Point2: 'Loose pieces are often tactical targets because they are undefended.',
      trainerLesson3Point3: 'If you attack something, ask whether your opponent has an even stronger reply.',
      trainerLesson4Title: 'Piece Coordination',
      trainerLesson4Focus: 'Strong moves make multiple pieces support each other instead of acting alone.',
      trainerLesson4Point1: 'Rooks love open files, bishops love long diagonals, and knights love stable outposts.',
      trainerLesson4Point2: 'Try to improve your worst-placed piece instead of moving a good one again.',
      trainerLesson4Point3: 'When pieces protect each other, tactics become safer and stronger.',
      trainerLesson5Title: 'Endgame Habits',
      trainerLesson5Focus: 'In simpler positions, activate your king and push passed pawns with care.',
      trainerLesson5Point1: 'The king becomes a fighting piece in the endgame and should move toward the action.',
      trainerLesson5Point2: 'Passed pawns are powerful because they force the opponent to respond.',
      trainerLesson5Point3: 'In races, calculate carefully and do not give checks that waste tempi.',
      trainerPieceKing: 'king',
      trainerPieceQueen: 'queen',
      trainerPieceRook: 'rook',
      trainerPieceBishop: 'bishop',
      trainerPieceKnight: 'knight',
      trainerPiecePawn: 'pawn',
      trainerCoachSelected: 'You selected the {piece} on {square}. It currently has {count} legal move(s), so compare the safest square with the most active one.',
      trainerCoachTurn: 'It is {color} to move. Start by checking forcing ideas: checks, captures, and direct threats.',
      trainerCoachOpening: 'The opening is still young. Focus on center control, development, and king safety over early queen adventures.',
      trainerCoachLastMove: 'The last move was {from} to {to}. Ask what changed: new attacks, new weaknesses, or a newly opened line.',
      trainerCoachCheck: 'A king is in check. When that happens, the priority is escape: move the king, block the line, or capture the attacker.',
      trainerCoachEnd: 'The game result is {result}. Review the final sequence and look for the move where the balance changed.',
      trainerCoachAiBattle: 'In AI vs AI mode, watch how each side develops and compare whose king becomes safer first.',
      trainerCoachVsAi: 'Against the AI, try to explain your move in words before you play it. A plan is better than a random legal move.',
      trainerCoachCapture: 'A capture just happened. Make sure the capturing piece is not walking into a stronger reply.',
      trainerCoachTraining: 'Training mode is active. Play both sides if you want, test ideas, and use each move as a lesson in development, king safety, and tactics.',
      trainerMoveCheck: 'Training tip: a checking move is forcing. Ask whether it improved your position or only looked active.',
      trainerMoveCapture: 'Training tip: after every capture, count attackers and defenders before assuming the trade is good.',
      trainerMoveCenter: 'Training tip: central moves often increase space and piece activity. Check whether they also weaken something.',
      trainerMoveCastle: 'Training tip: castling usually improves king safety and brings a rook toward the center.',
      trainerMoveQuiet: 'Training tip: explain this move in one sentence. If you can name its purpose, your plan is getting clearer.',
      summaryGame: 'Game Summary',
      summaryClose: 'Close',
      summaryRematch: 'Rematch',
      summaryResultLabel: 'Result',
      summaryMovesLabel: 'Moves',
      summaryOpeningLabel: 'Opening',
      summaryWhiteTimeLabel: 'White Time Used',
      summaryBlackTimeLabel: 'Black Time Used',
      summaryEvalLabel: 'Final Eval',
      summaryUnknownOpening: 'Unclassified Opening',
      languageEnglish: 'English',
      languageHindi: 'Hindi',
      languageSpanish: 'Spanish',
      themeDark: 'Dark',
      themeLight: 'Light',
      visualBadgeModern: 'Modern',
      visualBadgeIndian: 'Indian',
      visualBadgePersian: 'Persian',
      initializing: 'Initializing...',
      localMatch: 'Local Match',
      trainingModeShort: 'Training',
      puzzleModeShort: 'Puzzle',
      vsAi: 'Vs AI',
      aiBattle: 'AI Battle',
      onlineRoomShort: 'Online Room',
      whiteToMove: 'White to move',
      blackToMove: 'Black to move',
      youAre: 'You are {color}.',
      checkSuffix: ' (Check)',
      unableCreateLocalRoom: 'Unable to create local room',
      unableInitializeLocalBoard: 'Unable to initialize local board',
      invalidMove: 'Invalid move',
      aiThinking: 'AI thinking...',
      hintReady: 'Hint ready: best move highlighted on the board.',
      hintUnavailable: 'No hint available for this position.',
      aiRequestFailed: 'AI request failed',
      restartFailed: 'Restart failed',
      invalidFen: 'Invalid FEN',
      fenLoaded: 'FEN loaded',
      boardFlippedState: 'Board flipped.',
      boardResetState: 'Board returned to default view.',
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
      visualMode: 'दृश्य मोड',
      matchSetup: 'मैच सेटअप',
      modeLocal: 'प्लेयर बनाम प्लेयर (लोकल)',
      modeTraining: 'ट्रेनिंग मोड',
      modePuzzle: 'पज़ल मोड',
      modeAi: 'प्लेयर बनाम AI',
      modeAiVsAi: 'AI बनाम AI',
      modeOnline: 'ऑनलाइन मल्टीप्लेयर',
      aiDepth: 'AI गहराई',
      yourColor: 'आपका रंग',
      visualModern: 'मॉडर्न',
      visualIndian: 'भारतीय',
      visualPersian: 'फ़ारसी',
      timer: 'टाइमर',
      timerNone: 'कोई टाइमर नहीं',
      timerBullet: 'बुलेट (1+0)',
      timerBlitz: 'ब्लिट्ज (5+0)',
      timerRapid: 'रैपिड (10+0)',
      timerFormat: 'टाइमर प्रारूप',
      restart: 'रीस्टार्ट',
      hint: 'संकेत',
      flipBoard: 'बोर्ड पलटें',
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
      recentGames: 'हाल की गेम्स',
      recentGamesNote: 'इस ब्राउज़र में तेज़ रिव्यू के लिए सेव',
      recentGamesEmpty: 'आपकी हाल की समाप्त गेम्स यहाँ दिखेंगी।',
      recentGameMoves: '{count} चालें',
      recentGameOpening: 'ओपनिंग: {name}',
      puzzleTitle: 'पज़ल मोड',
      puzzleMateInOne: 'एक चाल में मात',
      puzzleDescriptionDefault: 'जिस पक्ष की चाल है उसके लिए जीतने वाली चाल खोजें।',
      puzzleRetry: 'फिर से',
      puzzleNext: 'अगला पज़ल',
      puzzleProgressLabel: 'पज़ल {current} / {total}',
      puzzleSolvedStatus: 'पज़ल हल हो गया। शानदार।',
      puzzleCorrect: 'सही। आपने जीतने वाली चाल ढूँढ ली।',
      puzzleWrong: 'यह पज़ल चाल नहीं है। फिर कोशिश करें।',
      pgnNote: 'पूरी लाइन देखें या एक्सपोर्ट करें',
      setupShow: 'सेटअप दिखाएं',
      setupHide: 'सेटअप छुपाएं',
      rulesGuideTitle: 'नियम और नोटेशन',
      rulesGuideNote: 'पीस के नाम, चाल के नियम और मानक नोटेशन के लिए त्वरित संदर्भ',
      rulesBasicsTitle: 'खेल का उद्देश्य',
      rulesBasics1: 'प्रतिद्वंदी के राजा को चेकमेट करें, यानी उस पर ऐसा हमला करें कि कोई वैध बचाव न बचे।',
      rulesBasics2: 'आप अपनी चाल के बाद अपने राजा को चेक में नहीं छोड़ सकते।',
      rulesBasics3: 'यदि कोई वैध चाल न बचे और राजा चेक में न हो, तो परिणाम स्टेलमेट होता है।',
      rulesSpecialTitle: 'विशेष नियम',
      rulesSpecial1: 'कास्टलिंग: राजा हाथी की ओर दो घर चलता है और हाथी राजा के पार आ जाता है। यह तब अवैध है जब राजा या हाथी पहले चल चुके हों, राजा चेक में हो, या राजा किसी आक्रमित घर से गुजरे।',
      rulesSpecial2: 'एन पसां: यदि प्रतिद्वंदी का प्यादा दो घर आगे बढ़े, तो पास वाला प्यादा उसे ऐसे मार सकता है जैसे वह एक ही घर चला हो।',
      rulesSpecial3: 'प्रमोशन: प्यादा अंतिम रैंक पर पहुँचते ही क्वीन, रूख, बिशप या नाइट बन सकता है।',
      rulesSpecial4: 'ड्रॉ स्टेलमेट, तीन बार दोहराव, पचास-चाल नियम, आपसी सहमति, या अपर्याप्त सामग्री से हो सकता है।',
      notationTitle: 'नोटेशन और पीस के नाम',
      notationKingKey: 'K',
      notationKingValue: 'King',
      notationQueenKey: 'Q',
      notationQueenValue: 'Queen',
      notationRookKey: 'R',
      notationRookValue: 'Rook',
      notationBishopKey: 'B',
      notationBishopValue: 'Bishop',
      notationKnightKey: 'N',
      notationKnightValue: 'Knight',
      notationPawnKey: 'Pawn',
      notationPawnValue: 'प्यादों के लिए आम तौर पर शुरुआती अक्षर नहीं लिखा जाता।',
      notationRule1: 'खानों के नाम file और rank से बनते हैं, जैसे e4, a1, या h8।',
      notationRule2: 'साधारण चाल Nf3 या e4 जैसी लिखी जाती है। x का अर्थ capture है, जैसे Bxe6।',
      notationRule3: 'चेक के लिए +, चेकमेट के लिए #, kingside castling के लिए O-O, और queenside castling के लिए O-O-O लिखा जाता है।',
      notationRule4: 'प्रमोशन = से लिखा जाता है, जैसे e8=Q। इस ऐप में typed move input coordinate notation जैसे e2e4 या e7e8q का उपयोग करता है।',
      languageEnglish: 'अंग्रेज़ी',
      languageHindi: 'हिंदी',
      languageSpanish: 'स्पैनिश',
      themeDark: 'डार्क',
      themeLight: 'लाइट',
      visualBadgeModern: 'मॉडर्न',
      visualBadgeIndian: 'भारतीय',
      visualBadgePersian: 'फ़ारसी',
      initializing: 'शुरू हो रहा है...',
      localMatch: 'लोकल मैच',
      trainingModeShort: 'ट्रेनिंग',
      puzzleModeShort: 'पज़ल',
      vsAi: 'AI के खिलाफ',
      aiBattle: 'AI मुकाबला',
      onlineRoomShort: 'ऑनलाइन रूम',
      whiteToMove: 'सफेद की चाल',
      blackToMove: 'काले की चाल',
      youAre: 'आप {color} हैं।',
      checkSuffix: ' (शाह)',
      unableCreateLocalRoom: 'लोकल रूम नहीं बन पाया',
      unableInitializeLocalBoard: 'लोकल बोर्ड शुरू नहीं हो पाया',
      invalidMove: 'अमान्य चाल',
      aiThinking: 'AI सोच रहा है...',
      hintReady: 'संकेत तैयार है: सबसे अच्छी चाल बोर्ड पर दिखाई गई है।',
      hintUnavailable: 'इस स्थिति के लिए संकेत उपलब्ध नहीं है।',
      aiRequestFailed: 'AI अनुरोध असफल रहा',
      restartFailed: 'रीस्टार्ट असफल रहा',
      invalidFen: 'अमान्य FEN',
      fenLoaded: 'FEN लोड हो गया',
      boardFlippedState: 'बोर्ड पलट दिया गया है।',
      boardResetState: 'बोर्ड सामान्य दृश्य में लौट आया है।',
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
      visualMode: 'Modo visual',
      matchSetup: 'Configuración de partida',
      modeLocal: 'Jugador vs Jugador (Local)',
      modeTraining: 'Modo entrenamiento',
      modePuzzle: 'Modo rompecabezas',
      modeAi: 'Jugador vs IA',
      modeAiVsAi: 'IA vs IA',
      modeOnline: 'Multijugador en línea',
      aiDepth: 'Profundidad IA',
      yourColor: 'Tu color',
      visualModern: 'Moderno',
      visualIndian: 'Indio',
      visualPersian: 'Persa',
      timer: 'Temporizador',
      timerNone: 'Sin temporizador',
      timerBullet: 'Bala (1+0)',
      timerBlitz: 'Blitz (5+0)',
      timerRapid: 'Rapid (10+0)',
      timerFormat: 'Formato de tiempo',
      restart: 'Reiniciar',
      hint: 'Pista',
      flipBoard: 'Girar tablero',
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
      recentGames: 'Partidas recientes',
      recentGamesNote: 'Guardadas en este navegador para revisión rápida',
      recentGamesEmpty: 'Tus últimas partidas terminadas aparecerán aquí.',
      recentGameMoves: '{count} movimientos',
      recentGameOpening: 'Apertura: {name}',
      puzzleTitle: 'Modo rompecabezas',
      puzzleMateInOne: 'Mate en 1',
      puzzleDescriptionDefault: 'Encuentra la jugada ganadora para el bando al mover.',
      puzzleRetry: 'Reintentar',
      puzzleNext: 'Siguiente',
      puzzleProgressLabel: 'Rompecabezas {current} / {total}',
      puzzleSolvedStatus: 'Rompecabezas resuelto. Muy bien.',
      puzzleCorrect: 'Correcto. Encontraste la jugada ganadora.',
      puzzleWrong: 'No es la jugada del rompecabezas. Intenta otra vez.',
      pgnNote: 'Exporta o revisa la línea completa',
      rulesGuideTitle: 'Reglas y notación',
      setupShow: 'Mostrar ajustes',
      setupHide: 'Ocultar ajustes',
      rulesGuideNote: 'Referencia rápida sobre nombres de piezas, movimientos legales y notación estándar',
      rulesBasicsTitle: 'Objetivo del juego',
      rulesBasics1: 'Haz jaque mate al rey rival: atácalo de forma que no quede ninguna salida legal.',
      rulesBasics2: 'No puedes terminar una jugada dejando a tu propio rey en jaque.',
      rulesBasics3: 'Si no existe ningún movimiento legal y el rey no está en jaque, el resultado es tablas por ahogado.',
      rulesSpecialTitle: 'Reglas especiales',
      rulesSpecial1: 'Enroque: el rey se mueve dos casillas hacia una torre y luego la torre cruza al otro lado. Es ilegal si el rey o la torre ya se movieron, si el rey está en jaque o si cruza una casilla atacada.',
      rulesSpecial2: 'Captura al paso: un peón puede capturar a un peón que acaba de avanzar dos casillas como si solo hubiera avanzado una.',
      rulesSpecial3: 'Promoción: cuando un peón llega a la última fila, se convierte en dama, torre, alfil o caballo.',
      rulesSpecial4: 'Las tablas pueden ocurrir por ahogado, triple repetición, regla de cincuenta movimientos, acuerdo o material insuficiente.',
      notationTitle: 'Notación y nombres de piezas',
      notationKingKey: 'K',
      notationKingValue: 'Rey',
      notationQueenKey: 'Q',
      notationQueenValue: 'Dama',
      notationRookKey: 'R',
      notationRookValue: 'Torre',
      notationBishopKey: 'B',
      notationBishopValue: 'Alfil',
      notationKnightKey: 'N',
      notationKnightValue: 'Caballo',
      notationPawnKey: 'Peón',
      notationPawnValue: 'Los peones normalmente no llevan letra inicial en la notación.',
      notationRule1: 'Las casillas se nombran por columna y fila, como e4, a1 o h8.',
      notationRule2: 'Un movimiento simple se escribe como Nf3 o e4. El símbolo x indica captura, como en Bxe6.',
      notationRule3: 'El jaque usa +, el jaque mate usa #, el enroque corto es O-O y el enroque largo es O-O-O.',
      notationRule4: 'La promoción se escribe con =, por ejemplo e8=Q. En esta app, la entrada manual usa notación por coordenadas como e2e4 o e7e8q.',
      languageEnglish: 'Inglés',
      languageHindi: 'Hindi',
      languageSpanish: 'Español',
      themeDark: 'Oscuro',
      themeLight: 'Claro',
      visualBadgeModern: 'Moderno',
      visualBadgeIndian: 'Indio',
      visualBadgePersian: 'Persa',
      initializing: 'Iniciando...',
      localMatch: 'Partida local',
      trainingModeShort: 'Entrenamiento',
      puzzleModeShort: 'Rompecabezas',
      vsAi: 'Vs IA',
      aiBattle: 'Duelo IA',
      onlineRoomShort: 'Sala en línea',
      whiteToMove: 'Juegan blancas',
      blackToMove: 'Juegan negras',
      youAre: 'Tú eres {color}.',
      checkSuffix: ' (Jaque)',
      unableCreateLocalRoom: 'No se pudo crear la sala local',
      unableInitializeLocalBoard: 'No se pudo iniciar el tablero local',
      invalidMove: 'Movimiento no válido',
      aiThinking: 'La IA está pensando...',
      hintReady: 'Pista lista: la mejor jugada está resaltada en el tablero.',
      hintUnavailable: 'No hay pista disponible para esta posición.',
      aiRequestFailed: 'La solicitud de IA falló',
      restartFailed: 'No se pudo reiniciar',
      invalidFen: 'FEN no válido',
      fenLoaded: 'FEN cargado',
      boardFlippedState: 'Tablero girado.',
      boardResetState: 'Tablero restaurado a la vista normal.',
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

  function trainerLessons() {
    return [
      {
        title: t('trainerLesson1Title'),
        focus: t('trainerLesson1Focus'),
        points: [t('trainerLesson1Point1'), t('trainerLesson1Point2'), t('trainerLesson1Point3')],
      },
      {
        title: t('trainerLesson2Title'),
        focus: t('trainerLesson2Focus'),
        points: [t('trainerLesson2Point1'), t('trainerLesson2Point2'), t('trainerLesson2Point3')],
      },
      {
        title: t('trainerLesson3Title'),
        focus: t('trainerLesson3Focus'),
        points: [t('trainerLesson3Point1'), t('trainerLesson3Point2'), t('trainerLesson3Point3')],
      },
      {
        title: t('trainerLesson4Title'),
        focus: t('trainerLesson4Focus'),
        points: [t('trainerLesson4Point1'), t('trainerLesson4Point2'), t('trainerLesson4Point3')],
      },
      {
        title: t('trainerLesson5Title'),
        focus: t('trainerLesson5Focus'),
        points: [t('trainerLesson5Point1'), t('trainerLesson5Point2'), t('trainerLesson5Point3')],
      },
    ];
  }

  function trainerPieceName(pieceChar) {
    const piece = String(pieceChar || '').toLowerCase();
    if (piece === 'k') return t('trainerPieceKing');
    if (piece === 'q') return t('trainerPieceQueen');
    if (piece === 'r') return t('trainerPieceRook');
    if (piece === 'b') return t('trainerPieceBishop');
    if (piece === 'n') return t('trainerPieceKnight');
    return t('trainerPiecePawn');
  }

  function currentPuzzle() {
    return PUZZLES[state.puzzleIndex] || PUZZLES[0];
  }

  function currentTrainerLessonIndex() {
    if (state.mode !== 'training') return state.trainerLesson;
    const moveCountNow = state.game?.moves?.length || 0;
    if (moveCountNow < 8) return 0;
    if (moveCountNow < 16) return 1;
    if (moveCountNow < 28) return 2;
    if (moveCountNow < 40) return 3;
    return 4;
  }

  function trainingMoveFeedback(lastMove) {
    if (!lastMove) return t('trainerMoveQuiet');
    if (lastMove.isCheck) return t('trainerMoveCheck');
    if (lastMove.isCapture) return t('trainerMoveCapture');
    const to = String(lastMove.to || '');
    if (to === 'd4' || to === 'e4' || to === 'd5' || to === 'e5') return t('trainerMoveCenter');
    const from = String(lastMove.from || '');
    if ((from === 'e1' && (to === 'g1' || to === 'c1')) || (from === 'e8' && (to === 'g8' || to === 'c8'))) {
      return t('trainerMoveCastle');
    }
    return t('trainerMoveQuiet');
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

    renderSetupToggle();
  }

  function isCompactViewport() {
    return Boolean(window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
  }

  function renderSetupToggle() {
    if (!setupToggleBtn || !controlPanelContent) return;
    const collapsed = Boolean(state.setupCollapsed && isCompactViewport());
    controlPanelContent.classList.toggle('is-collapsed', collapsed);
    const key = collapsed ? 'setupShow' : 'setupHide';
    setupToggleBtn.dataset.i18n = key;
    setupToggleBtn.textContent = t(key);
    setupToggleBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  }

  function syncMobileLayout(force = false) {
    const compact = isCompactViewport();
    if (!compact) {
      state.setupCollapsed = false;
    } else if (force || !state.compactViewport) {
      state.setupCollapsed = true;
    }
    state.compactViewport = compact;
    renderSetupToggle();
  }

  function getPreferredLanguage() {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored && translations[stored]) return stored;
    const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return translations[browserLang] ? browserLang : 'en';
  }

  function getPreferredVisualMode() {
    const stored = window.localStorage.getItem(VISUAL_MODE_KEY);
    if (stored === 'modern' || stored === 'indian' || stored === 'persian') return stored;
    return 'indian';
  }

  function visualModeLabel(mode = state.visualMode) {
    if (mode === 'modern') return t('visualBadgeModern');
    if (mode === 'persian') return t('visualBadgePersian');
    return t('visualBadgeIndian');
  }

  function applyLanguage(language) {
    state.language = translations[language] ? language : 'en';
    if (languageSelect) languageSelect.value = state.language;
    window.localStorage.setItem(LANG_KEY, state.language);
    applyTranslations();
    if (visualModeBadge) visualModeBadge.textContent = visualModeLabel();
    updateRoomInfo();
    render();
  }

  function applyVisualMode(mode) {
    state.visualMode = mode === 'modern' || mode === 'persian' ? mode : 'indian';
    document.body.dataset.visualMode = state.visualMode;
    if (visualModeSelect) visualModeSelect.value = state.visualMode;
    if (visualModeBadge) visualModeBadge.textContent = visualModeLabel();
    window.localStorage.setItem(VISUAL_MODE_KEY, state.visualMode);
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

  function initialTimerMs(mode) {
    if (mode === 'bullet') return 1 * 60 * 1000;
    if (mode === 'blitz') return 5 * 60 * 1000;
    if (mode === 'rapid') return 10 * 60 * 1000;
    return 0;
  }

  function pieceCountsFromFen(fen) {
    const counts = {
      white: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      black: { p: 0, n: 0, b: 0, r: 0, q: 0 },
    };
    const boardPart = String(fen || '').split(' ')[0] || '';
    for (const ch of boardPart) {
      const lower = ch.toLowerCase();
      if (!(lower in counts.white)) continue;
      if (ch === lower) counts.black[lower] += 1;
      else counts.white[lower] += 1;
    }
    return counts;
  }

  function capturedPiecesFromFen(fen) {
    const counts = pieceCountsFromFen(fen);
    const starting = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const whiteCapturedPieces = [];
    const blackCapturedPieces = [];
    let whiteMaterial = 0;
    let blackMaterial = 0;

    Object.keys(starting).forEach((piece) => {
      const whiteMissing = starting[piece] - counts.white[piece];
      const blackMissing = starting[piece] - counts.black[piece];
      for (let i = 0; i < whiteMissing; i += 1) {
        whiteCapturedPieces.push(piece);
        whiteMaterial += PIECE_VALUES[piece] || 0;
      }
      for (let i = 0; i < blackMissing; i += 1) {
        blackCapturedPieces.push(piece);
        blackMaterial += PIECE_VALUES[piece] || 0;
      }
    });

    return {
      whiteCapturedPieces,
      blackCapturedPieces,
      whiteMaterial,
      blackMaterial,
    };
  }

  function renderCapturedPieces() {
    if (!whiteCaptured || !blackCaptured || !state.game?.fen) return;
    const { whiteCapturedPieces, blackCapturedPieces, whiteMaterial, blackMaterial } = capturedPiecesFromFen(state.game.fen);

    const renderStrip = (target, pieces, color, diff) => {
      target.innerHTML = '';
      pieces.forEach((piece) => {
        const img = document.createElement('img');
        img.className = 'captured-piece';
        img.src = PIECE_ASSETS[`${color === 'white' ? piece.toUpperCase() : piece}`];
        img.alt = `${color} captured ${piece}`;
        target.appendChild(img);
      });
      if (diff > 0) {
        const badge = document.createElement('span');
        badge.className = 'material-badge';
        badge.textContent = `+${diff}`;
        target.appendChild(badge);
      }
    };

    renderStrip(whiteCaptured, blackCapturedPieces, 'black', blackMaterial - whiteMaterial);
    renderStrip(blackCaptured, whiteCapturedPieces, 'white', whiteMaterial - blackMaterial);
  }

  function getRecentGames() {
    try {
      const stored = JSON.parse(window.localStorage.getItem(RECENT_GAMES_KEY) || '[]');
      return Array.isArray(stored) ? stored : [];
    } catch (_) {
      return [];
    }
  }

  function saveRecentGames(games) {
    try {
      window.localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(games.slice(0, 10)));
    } catch (_) {
      // ignore storage issues
    }
  }

  function renderRecentGames() {
    if (!recentGamesList) return;
    const games = getRecentGames();
    recentGamesList.innerHTML = '';
    if (!games.length) {
      const empty = document.createElement('div');
      empty.className = 'recent-game-empty';
      empty.textContent = t('recentGamesEmpty');
      recentGamesList.appendChild(empty);
      return;
    }

    games.forEach((game) => {
      const item = document.createElement('div');
      item.className = 'recent-game-item';
      const top = document.createElement('div');
      top.className = 'recent-game-top';
      const result = document.createElement('div');
      result.className = 'recent-game-result';
      result.textContent = game.result || '-';
      const when = document.createElement('div');
      when.className = 'recent-game-meta';
      when.textContent = game.when || '';
      top.append(result, when);

      const meta = document.createElement('div');
      meta.className = 'recent-game-meta';
      meta.textContent = `${t('recentGameMoves', { count: game.moves || 0 })} | ${t('recentGameOpening', { name: game.opening || t('summaryUnknownOpening') })}`;
      item.append(top, meta);
      recentGamesList.appendChild(item);
    });
  }

  function saveFinishedGame(result) {
    if (!state.game || !result || state.mode === 'online' || state.mode === 'puzzle') return;
    const games = getRecentGames();
    const entry = {
      result,
      moves: state.game.moves?.length || 0,
      opening: state.game.openingName || t('summaryUnknownOpening'),
      when: new Date().toLocaleString(),
      fen: state.game.fen,
    };
    const duplicate = games[0] && games[0].result === entry.result && games[0].moves === entry.moves && games[0].fen === entry.fen;
    if (duplicate) return;
    games.unshift(entry);
    saveRecentGames(games);
    renderRecentGames();
  }

  function formatEval(score) {
    const clamped = Math.max(-999999, Math.min(999999, Number(score) || 0));
    if (Math.abs(clamped) >= 999000) return clamped > 0 ? 'M#' : 'M#';
    const pawns = clamped / 100;
    return `${pawns > 0 ? '+' : ''}${pawns.toFixed(1)}`;
  }

  async function updateEvaluation() {
    if (!state.game?.fen) return;
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: state.game.fen }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        state.evalScore = Number(data.score) || 0;
        renderEvalBar();
        if (state.summaryOpen) renderSummary();
      }
    } catch (_) {
      // no-op
    }
  }

  function renderEvalBar() {
    const score = Math.max(-1200, Math.min(1200, Number(state.evalScore) || 0));
    const whiteShare = 50 + (score / 1200) * 35;
    const blackHeight = Math.max(0, Math.min(100, 100 - whiteShare));
    if (evalFill) evalFill.style.height = `${blackHeight}%`;
    if (evalLabel) evalLabel.textContent = formatEval(state.evalScore);
  }

  function openSummary() {
    state.summaryOpen = true;
    if (summaryModal) {
      summaryModal.classList.remove('hidden');
      summaryModal.setAttribute('aria-hidden', 'false');
    }
    renderSummary();
  }

  function closeSummary() {
    state.summaryOpen = false;
    if (summaryModal) {
      summaryModal.classList.add('hidden');
      summaryModal.setAttribute('aria-hidden', 'true');
    }
  }

  function renderSummary() {
    const result = getResultStatus();
    if (!state.game || !result) return;
    const mode = state.game.timerMode || 'rapid';
    const initial = initialTimerMs(mode);
    const whiteUsed = initial ? initial - (state.game.whiteTimeMs || 0) : 0;
    const blackUsed = initial ? initial - (state.game.blackTimeMs || 0) : 0;

    if (summaryTitle) summaryTitle.textContent = t('summaryGame');
    if (summaryResult) summaryResult.textContent = result;
    if (summaryMoves) summaryMoves.textContent = String(state.game.moves?.length || 0);
    if (summaryOpening) summaryOpening.textContent = state.game.openingName || t('summaryUnknownOpening');
    if (summaryWhiteTime) summaryWhiteTime.textContent = mode === 'none' ? '--:--' : formatMs(whiteUsed);
    if (summaryBlackTime) summaryBlackTime.textContent = mode === 'none' ? '--:--' : formatMs(blackUsed);
    if (summaryEval) summaryEval.textContent = formatEval(state.evalScore);
    if (summaryCloseBtn) summaryCloseBtn.textContent = t('summaryClose');
    if (summaryRematchBtn) summaryRematchBtn.textContent = t('summaryRematch');
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

  function trainerCoachMessage() {
    if (!state.game) return t('trainerWaiting');

    const result = getResultStatus();
    if (result) return t('trainerCoachEnd', { result });
    if (state.game.inCheck) return t('trainerCoachCheck');

    if (state.selected) {
      const piece = pieceAtSquare(state.selected);
      if (piece) {
        return t('trainerCoachSelected', {
          piece: trainerPieceName(piece),
          square: state.selected,
          count: state.legalTargets.length,
        });
      }
    }

    const lastMove = state.game.lastMove;
    if (lastMove?.isCapture) return t('trainerCoachCapture');
    if (lastMove?.from && lastMove?.to) return t('trainerCoachLastMove', { from: lastMove.from, to: lastMove.to });
    if ((state.game.moves || []).length < 8) return t('trainerCoachOpening');
    if (state.mode === 'training') return t('trainerCoachTraining');
    if (state.mode === 'ai-vs-ai') return t('trainerCoachAiBattle');
    if (state.mode === 'ai') return t('trainerCoachVsAi');

    return t('trainerCoachTurn', {
      color: state.game.turn === 'w' ? localizedColor('white') : localizedColor('black'),
    });
  }

  function renderTrainer() {
    const lessons = trainerLessons();
    const total = lessons.length;
    const index = Math.max(0, Math.min(currentTrainerLessonIndex(), total - 1));
    state.trainerLesson = index;
    const lesson = lessons[index];

    if (trainerLessonCount) {
      trainerLessonCount.textContent = t('trainerLessonCount', { current: index + 1, total });
    }
    if (trainerLessonTitle) trainerLessonTitle.textContent = lesson.title;
    if (trainerLessonFocus) trainerLessonFocus.textContent = lesson.focus;
    if (trainerLessonPoints) {
      trainerLessonPoints.innerHTML = '';
      lesson.points.forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        trainerLessonPoints.appendChild(li);
      });
    }
    if (trainerCoachText) trainerCoachText.textContent = trainerCoachMessage();
    if (trainerPrevBtn) trainerPrevBtn.disabled = index === 0;
    if (trainerNextBtn) trainerNextBtn.disabled = index === total - 1;
  }

  function renderPuzzlePanel() {
    if (!puzzlePanel) return;
    const active = state.mode === 'puzzle';
    puzzlePanel.style.display = active ? 'grid' : 'none';
    if (!active) return;

    const puzzle = currentPuzzle();
    if (puzzleProgress) {
      puzzleProgress.textContent = t('puzzleProgressLabel', { current: state.puzzleIndex + 1, total: PUZZLES.length });
    }
    if (puzzlePrompt) puzzlePrompt.textContent = t(puzzle.promptKey || 'puzzleMateInOne');
    if (puzzleDescription) puzzleDescription.textContent = puzzle.description || t('puzzleDescriptionDefault');
    if (puzzleFeedback) puzzleFeedback.textContent = state.lastInfo || t('puzzleDescriptionDefault');
    if (puzzleRetryBtn) puzzleRetryBtn.disabled = !state.game;
    if (puzzleNextBtn) puzzleNextBtn.disabled = !state.puzzleSolved;
  }

  function buildStatus() {
    if (!state.game) return t('initializing');
    if (state.mode === 'puzzle') {
      if (state.puzzleSolved) return t('puzzleSolvedStatus');
      if (state.lastInfo) return state.lastInfo;
    }
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
    if (state.mode === 'training') return t('trainingModeShort');
    if (state.mode === 'puzzle') return t('puzzleModeShort');
    if (state.mode === 'ai') return t('vsAi');
    if (state.mode === 'ai-vs-ai') return t('aiBattle');
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
    if (visualModeBadge) visualModeBadge.textContent = visualModeLabel();

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
    if (state.mode === 'ai-vs-ai') return false;
    if (state.mode === 'ai') return state.game.turn === (state.aiColor === 'white' ? 'w' : 'b');
    return true;
  }

  function aiSide() {
    if (state.mode === 'ai-vs-ai') return state.game?.turn === 'w' ? 'white' : 'black';
    return state.aiColor === 'white' ? 'black' : 'white';
  }

  function shouldAiMove() {
    if (!state.game || state.game.isGameOver) return false;
    if (state.mode === 'ai-vs-ai') return true;
    if (state.mode !== 'ai') return false;
    return state.game.turn === (state.aiColor === 'white' ? 'b' : 'w');
  }

  function boardPerspective() {
    let perspective = 'white';
    if (state.mode === 'ai' && state.aiColor === 'black') perspective = 'black';
    if (state.mode === 'puzzle' && state.game?.turn === 'b') perspective = 'black';
    if (state.boardFlipped) perspective = perspective === 'white' ? 'black' : 'white';
    return perspective;
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
    state.hintMove = null;
    updateHistory();
    updateTimerUI();
    refreshBadges();
    statusText.textContent = buildStatus();
    render();
    updateEvaluation();
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

  async function requestHint() {
    if (!state.game || state.aiThinking || getResultStatus()) return;
    state.lastInfo = t('aiThinking');
    render();
    try {
      const res = await fetch('/api/ai-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: state.game.fen, depth: Math.max(2, Number(aiDepthEl.value) || 2) }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.move) {
        state.hintMove = { from: data.move.from, to: data.move.to };
        state.lastInfo = t('hintReady');
      } else {
        state.hintMove = null;
        state.lastInfo = t('hintUnavailable');
      }
    } catch (_) {
      state.hintMove = null;
      state.lastInfo = t('hintUnavailable');
    }
    render();
  }

  async function loadPuzzle(index = state.puzzleIndex) {
    state.puzzleIndex = ((index % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
    state.puzzleSolved = false;
    state.hintMove = null;
    const puzzle = currentPuzzle();

    const restarted = await window.Multiplayer.requestRestart('none');
    if (!restarted?.ok) {
      state.lastInfo = restarted?.error || t('restartFailed');
      render();
      return false;
    }
    applyServerState(restarted.state);

    const loaded = await window.Multiplayer.requestFenLoad(puzzle.fen);
    if (!loaded?.ok) {
      state.lastInfo = loaded?.error || t('invalidFen');
      render();
      return false;
    }
    state.lastSummaryResult = '';
    closeSummary();
    state.lastInfo = '';
    applyServerState(loaded.state);
    renderPuzzlePanel();
    return true;
  }

  function legalTargetSquares() {
    return state.legalTargets.map((m) => m.to);
  }

  async function attemptMove(from, to, forcedPromotion = null) {
    if (!state.game || !from || !to) return;
    if (!isMyTurnOnline() || !isHumanTurn() || isGameLocked()) return;
    state.hintMove = null;

    const proposedUci = `${from}${to}${forcedPromotion || ''}`;
    if (state.mode === 'puzzle') {
      const solution = currentPuzzle().solution;
      if (proposedUci !== solution) {
        playTone(240, 180);
        await loadPuzzle(state.puzzleIndex);
        state.lastInfo = t('puzzleWrong');
        render();
        return;
      }
    }

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
    if (state.mode === 'puzzle') {
      state.puzzleSolved = true;
      state.lastInfo = t('puzzleCorrect');
      render();
      playTone(720, 180);
      return;
    }
    if (state.mode === 'training') {
      state.lastInfo = trainingMoveFeedback(lm);
      render();
    }
    if (lm.isCheckmate) playTone(260, 280);
    else if (lm.isCapture) playTone(420, 130);
    else if (lm.isCheck) playTone(770, 160);
    else playTone(520, 90);

    if (shouldAiMove()) {
      await runAiTurn();
    }
  }

  async function handleSquareClick(square) {
    if (!state.game || !isMyTurnOnline() || !isHumanTurn() || isGameLocked()) return;
    state.hintMove = null;

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
      while (shouldAiMove()) {
        const res = await fetch('/api/ai-move', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fen: state.game.fen, depth: Number(aiDepthEl.value) }),
        });
        const data = await res.json();
        if (!(res.ok && data.ok && data.move)) break;

        const out = await window.Multiplayer.sendMoveAs(
          { from: data.move.from, to: data.move.to, promotion: data.move.promotion || undefined },
          aiSide(),
        );
        if (!out?.ok) break;

        applyServerState(out.state);
        if (state.mode !== 'ai-vs-ai') break;
        await new Promise((resolve) => window.setTimeout(resolve, 250));
      }
    } catch (err) {
      state.lastInfo = t('aiRequestFailed');
    }

    state.aiThinking = false;
    if (!getResultStatus() && state.lastInfo === t('aiThinking')) {
      state.lastInfo = '';
    }
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
    state.lastSummaryResult = '';
    closeSummary();
    applyServerState(res.state);
    if (state.mode === 'puzzle') {
      await loadPuzzle(state.puzzleIndex);
      return;
    }
    if (shouldAiMove()) {
      await runAiTurn();
    }
  }

  async function loadFen() {
    if (state.mode === 'puzzle') {
      state.mode = 'local';
      modeSelect.value = 'local';
    }
    const fen = document.getElementById('fenInput').value.trim();
    if (!fen) return;

    const res = await window.Multiplayer.requestFenLoad(fen);
    if (!res?.ok) {
      state.lastInfo = res?.error || t('invalidFen');
      render();
      return;
    }

    state.lastInfo = t('fenLoaded');
    state.lastSummaryResult = '';
    closeSummary();
    applyServerState(res.state);
    if (shouldAiMove()) {
      await runAiTurn();
    }
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
    const perspective = boardPerspective();
    const rowOrder = perspective === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const colOrder = perspective === 'white' ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];

    for (let displayRow = 0; displayRow < 8; displayRow += 1) {
      const r = rowOrder[displayRow];
      for (let displayCol = 0; displayCol < 8; displayCol += 1) {
        const c = colOrder[displayCol];
        const square = toSquare(r, c);
        const sq = document.createElement('div');
        sq.className = `square ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
        sq.dataset.square = square;

        if (state.selected === square) sq.classList.add('selected');
        if (state.game?.lastMove?.from === square) sq.classList.add('last-from');
        if (state.game?.lastMove?.to === square) sq.classList.add('last-to');
        if (state.hintMove?.from === square) sq.classList.add('hint-from');
        if (state.hintMove?.to === square) sq.classList.add('hint-to');
        const legal = state.legalTargets.find((m) => m.to === square);
        if (legal) sq.classList.add(legal.isCapture ? 'legal-capture' : 'legal');
        if (state.game?.checkedKingSquare === square) sq.classList.add('king-check');

        if (displayCol === 0) {
          const rankLabel = document.createElement('span');
          rankLabel.className = 'coord-rank';
          rankLabel.textContent = String(8 - r);
          sq.appendChild(rankLabel);
        }
        if (displayRow === 7) {
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
          p.className = `piece ${/[A-Z]/.test(pieceChar) ? 'piece-white' : 'piece-black'}`;
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
    renderTrainer();
    renderEvalBar();
    renderCapturedPieces();
    renderRecentGames();
    renderPuzzlePanel();

    const result = getResultStatus();
    if (state.mode !== 'puzzle' && result && state.lastSummaryResult !== result) {
      state.lastSummaryResult = result;
      saveFinishedGame(result);
      openSummary();
    }
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
    state.puzzleSolved = false;
    onlineControls.style.display = state.mode === 'online' ? 'flex' : 'none';
    if (state.mode === 'puzzle') timerModeEl.value = 'none';
    refreshBadges();

    if (state.mode !== 'online') {
      state.onlineColor = null;
      updateRoomInfo();
      await ensureLocalRoom();
    }

    await restartGame();
  });
  playerColorEl?.addEventListener('change', async () => {
    state.aiColor = playerColorEl.value === 'black' ? 'black' : 'white';
    if (state.mode === 'ai') {
      await restartGame();
    } else {
      render();
    }
  });
  visualModeSelect?.addEventListener('change', () => applyVisualMode(visualModeSelect.value));

  restartBtn.addEventListener('click', restartGame);
  hintBtn?.addEventListener('click', requestHint);
  flipBoardBtn?.addEventListener('click', () => {
    state.boardFlipped = !state.boardFlipped;
    state.lastInfo = state.boardFlipped ? t('boardFlippedState') : t('boardResetState');
    render();
  });
  puzzleRetryBtn?.addEventListener('click', async () => {
    await loadPuzzle(state.puzzleIndex);
  });
  puzzleNextBtn?.addEventListener('click', async () => {
    await loadPuzzle(state.puzzleIndex + 1);
  });
  exportPgnBtn.addEventListener('click', exportPgn);
  loadFenBtn.addEventListener('click', loadFen);
  createRoomBtn.addEventListener('click', handleCreateRoom);
  joinRoomBtn.addEventListener('click', handleJoinRoom);
  undoBtn.addEventListener('click', undoMove);
  redoBtn.addEventListener('click', redoMove);
  drawBtn.addEventListener('click', offerDraw);
  resignBtn.addEventListener('click', resignGame);
  applyMoveBtn.addEventListener('click', applyTypedMove);
  summaryCloseBtn?.addEventListener('click', closeSummary);
  summaryRematchBtn?.addEventListener('click', async () => {
    closeSummary();
    await restartGame();
  });
  summaryModal?.addEventListener('click', (e) => {
    if (e.target === summaryModal || e.target.classList.contains('summary-backdrop')) {
      closeSummary();
    }
  });
  trainerPrevBtn?.addEventListener('click', () => {
    state.trainerLesson = Math.max(0, state.trainerLesson - 1);
    renderTrainer();
  });
  trainerNextBtn?.addEventListener('click', () => {
    state.trainerLesson = Math.min(trainerLessons().length - 1, state.trainerLesson + 1);
    renderTrainer();
  });
  setupToggleBtn?.addEventListener('click', () => {
    state.setupCollapsed = !state.setupCollapsed;
    renderSetupToggle();
  });
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
  window.addEventListener('resize', () => syncMobileLayout());

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
    applyVisualMode(getPreferredVisualMode());
    applyTheme(getPreferredTheme());
    syncMobileLayout(true);
    renderRecentGames();
    if (playerColorEl) playerColorEl.value = state.aiColor;
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
