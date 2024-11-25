//cell
function cell() {
    let mark = null;

    const getMark = () => mark;
    const setMark = (newMark) => {
        if (mark === null) {
            mark = newMark;
        };
    };

    return {getMark, setMark};
}

// Gameboard logic
function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        };
    };

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        const cell = board[row][col];
        cell.setMark(marker);
    }

    const resetBoard = () => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                board[i][j].setMark(null);
            };
        };         
    };

    const getBoardState = () => board.map(row => row.map(cell => cell.getMark()));

    return {getBoard, placeMarker, resetBoard, getBoardState};
}

//Player creation
function createPlayer(name, marker) {
    const getInfo = () => `${name} (${marker})`;

    return {name, marker, getInfo};
}

function players(playerOneName, playerTwoName, playerOneMarker, playerTwoMarker) {
    const playerOne = createPlayer(playerOneName, playerOneMarker);
    const playerTwo = createPlayer(playerTwoName, playerTwoMarker);
    const getPlayers = () => [playerOne, playerTwo];

    return {playerOne, playerTwo, getPlayers};
}

// Display factory
function displayGame() {

}

// test - debugging
const game = gameboard();
const playerSet = players("Ace", "John", "X", "O");

game.placeMarker(0, 0, "X");
game.placeMarker(1, 1, "O");
console.log(game.getBoard().map(row => row.map(cell => cell.getMark())));

game.resetBoard();
console.log(game.getBoard().map(row => row.map(cell => cell.getMark())));