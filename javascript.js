//Cell
function Cell() {
    let mark = null;

    const getMark = () => mark;
    const addMark = (newMark) => {
        if (mark === null) {
            mark = newMark;
        };
    };

    return {getMark, addMark};
}

// Game board logic
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        const Cell = board[row][col];
        Cell.addMark(marker);
    }

    const resetBoard = () => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                board[i][j].addMark(null);
            };
        };         
    };

    const getBoardState = () => board.map(row => row.map(Cell => Cell.getMark()));

    return {getBoard, placeMarker, resetBoard, getBoardState};
}

// Game controller
function GameController(playerOneName, playerTwoName, playerOneMarker, playerTwoMarker) {
    const createPlayer = (name, marker) => {
        // const getInfo = () => `${name} (${marker})`;
        return { name, marker};
    };

    const board = GameBoard();
    
    // Create players
    const playerOne = createPlayer(playerOneName, playerOneMarker);
    const playerTwo = createPlayer(playerTwoName, playerTwoMarker);
    const getPlayers = () => [playerOne, playerTwo];
    
    const players = getPlayers();

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

        //Check Diagonals
        if (boardState.every((row, index) => row[index] === marker)) return true;
        if (boardState.every((row, index) => row[2 - index] === marker)) return true;

        return false;
    }

    const isTie = () => {
        const boardState = board.getBoardState();
        return boardState.flat().every(cell => cell !== null) && !checkWin(activePlayer.marker);
    };

    const playRound = (row, col) => {
        // Validate Move
        if (board.getBoard()[row][col].getMark() !== null) {
            return;
        }

        board.placeMarker(row, col, activePlayer.marker);

        //Check for win or tie
        if (checkWin(activePlayer.marker)) {
            return `${activePlayer.name} wins!`;
        }

        if (isTie()) {
            return "It's a tie!";
        }

        // Switch Turn and prepare next round
        switchPlayerTurn();
        return `${getActivePlayer().name}'s turn.`;
    };

    return {getActivePlayer, playRound};
};

// Display factory
function DisplayGame() {

}

//TEST