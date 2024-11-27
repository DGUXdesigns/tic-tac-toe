// Cell function
function Cell() {
    let mark = null;
    const getMark = () => mark;
    const addMark = (newMark) => {
        if (mark === null) {
            mark = newMark;
        };
    };
    return { getMark, addMark };
};

// Game Board logic function
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create the 3x3 board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;
    const placeMarker = (row, col, marker) => {
        const cell = board[row][col];
        cell.addMark(marker);
    };
    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].addMark(null);
            };
        };
    };
    const getBoardState = () => board.map(row => row.map(cell => cell.getMark()));

    return { getBoard, placeMarker, resetBoard, getBoardState };
}

// Game controller
function GameController(playerOneName, playerTwoName, playerOneMarker, playerTwoMarker) {
    const createPlayer = (name, marker, isAi = false) => {
        return { name, marker, isAi, score: 0 };
    };

    const board = GameBoard();

    // Create players
    const playerOne = createPlayer(playerOneName, playerOneMarker);
    const playerTwo = createPlayer(playerTwoName, playerTwoMarker, playerTwoName === 'Computer');
    const players = [playerOne, playerTwo];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const checkWin = (marker) => {
        const boardState = board.getBoardState();

        // Check rows & columns
        for (let i = 0; i < 3; i++) {
            if (boardState[i].every(cell => cell === marker)) return true; // Check row
            if (boardState.every(row => row[i] === marker)) return true; // Check column
        }

        // Check Diagonals
        if (boardState.every((row, index) => row[index] === marker)) return true;
        if (boardState.every((row, index) => row[2 - index] === marker)) return true;

        return false;
    };
    // Check for tie
    const isTie = () => {
        const boardState = board.getBoardState();
        return boardState.flat().every(cell => cell !== null) && !checkWin(activePlayer.marker);
    };

    const playRound = (row, col) => {
        // Validate Move
        if (board.getBoard()[row][col].getMark() !== null || activePlayer.isAi) {
            return; // Prevent invalid moves or multiple clicks
        }

        board.placeMarker(row, col, activePlayer.marker);

        // Check for win or tie
        if (checkWin(activePlayer.marker)) {
             return `${activePlayer.name} wins!`;
        }

        if (isTie()) {
            return "It's a Draw!";
        }

        // Switch turn
        switchPlayerTurn();

    };

    const makeAiMove = () => {
        const boardState = board.getBoardState();

        // AI logic: Choose the first empty cell
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (boardState[row][col] === null) {
                    board.placeMarker(row, col, activePlayer.marker);
                    return;
                };
            };
        };
    };

    const getScores = () => {
        return {
            playerOneScore: playerOne.score,
            playerTwoScore: playerTwo.score
        };
    };

    return { 
        getActivePlayer, 
        playRound, 
        getBoardState: board.getBoardState, 
        makeAiMove, 
        checkWin, 
        isTie, 
        switchPlayerTurn,
        getScores
     };
}

// DOM/Display logic
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.querySelector('.start-screen');
    const gameContainer = document.querySelector('.game-container');
    const playerInputsDiv = document.querySelector('#player-inputs');
    const startGameBtn = document.querySelector('#start-game');

    let gameMode = null;
    let playerOneName = '';
    let playerTwoName = '';

    // Handle game mode selection
    const handleModeSelection = (mode) => {
        gameMode = mode;
        playerInputsDiv.innerHTML = mode === '1-player'
            ? '<label>Player 1 <input type="text" id="player-one"></label>'
            : '<label>Player 1 <input type="text" id="player-one"></label><label>Player 2 <input type="text" id="player-two"></label>';

        startGameBtn.disabled = true;

        const inputs = playerInputsDiv.querySelectorAll('input');
        inputs.forEach(input => input.addEventListener('input', () => {
            playerOneName = document.querySelector('#player-one')?.value.trim() || '';
            playerTwoName = document.querySelector('#player-two')?.value.trim() || '';

            startGameBtn.disabled = (gameMode === '1-player' && !playerOneName) ||
                (gameMode === '2-player' && (!playerOneName || !playerTwoName));
        }));
    };

    // Attach event listeners for game mode buttons
    document.querySelector('#one-player').addEventListener('click', () => {
        handleModeSelection('1-player');
        startGameBtn.style.display = 'block';
    })
    document.querySelector('#two-player').addEventListener('click', () => {
        handleModeSelection('2-player');
        startGameBtn.style.display = 'block';
    });

    // Start game button logic
    startGameBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'flex';

        const isSinglePlayer = gameMode === '1-player';
        const playerTwoNameOrAi = isSinglePlayer ? 'Computer' : playerTwoName;

        // Create game instance and start the display
        const game = GameController(playerOneName, playerTwoNameOrAi, 'X', 'O');
        DisplayGame(game);
    });
});

// Display Logic
function DisplayGame(game) {
    const playerTurn = document.querySelector('.turn');
    const boardDiv = document.querySelector('.gameboard');

    const updateDisplay = () => {
        boardDiv.innerHTML = ''; // Clear The Board

        const boardState = game.getBoardState(); // Get current Board State
        const currentPlayer = game.getActivePlayer();

        // Render Game board
        boardState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.textContent = cell ? cell : '';
                cellDiv.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
                boardDiv.appendChild(cellDiv);
            });
        });

        playerTurn.textContent = `${currentPlayer.name}'s turn.`; // Update Player Turn
    };

    const handleCellClick = (row, col) => {
        const result = game.playRound(row, col);
        updateDisplay();

        if (result) {
            return result;
        };

        const activePlayer = game.getActivePlayer();
        if (activePlayer.isAi) {
            setTimeout(() => {
                game.makeAiMove(); // AI makes its move
                updateDisplay();
    
                const boardState = game.getBoardState();
                if (game.checkWin(activePlayer.marker)) {
                    return `${active.Player.name} wins!`;
                } else if (game.isTie()) {
                    return "It's A Draw!"
                }

                // Switch back to user turn if the game isn't over
                if (!game.checkWin(activePlayer.marker) && !game.isTie()) {
                    game.switchPlayerTurn();
                    updateDisplay();
                }
            }, 500); // Simulate AI thinking for 0.6 seconds
        };
    };

    updateDisplay();
}