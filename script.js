// Gameboard IIFE
const Gameboard = (function () {
	const board = [];
	const rows = 3;
	const columns = 3;

	// Create a grid for the gameboard
	function initBoard() {
		for (let i = 0; i < rows; i++) {
			board[i] = [];
			for (let j = 0; j < columns; j++) {
				board[i].push(null);
			}
		}
	}

	// Get current state of board
	function getBoard() {
		return board;
	}

	// Create starting board
	initBoard();

	// Check if gameboard is full
	// Check if theres a winner

	// Update board with players move
	function updateBoard(move, symbol) {}

	// Return methods
	return { initBoard, getBoard };
})();

// Player object
const createPlayer = function (name, symbol) {
	return { name, symbol };
};

// Game flow object
const GameController = function () {
	const board = Gameboard.getBoard();

	const playerOne = createPlayer("Elliott", "X");
	const playerTwo = createPlayer("Lucy", "O");

	const players = [playerOne, playerTwo];

	let activePlayer = players[0];

	const switchActivePlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	// Play round function
	// get the players move via row and column
	// Gameboard.updateBoard(move, activePlayer.symbol) update board with players move
	// Check if move results in win and announce
	// Check if move results in draw and announce
	// Switch player

	return { players };
};

const players = GameController();
console.log(players);
