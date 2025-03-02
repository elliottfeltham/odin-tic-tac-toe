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
	function updateBoard(row, column, symbol) {
		board[row][column] = symbol;
	}

	// Function to print baord to console, can be deleted
	function printBoard() {
		console.log(board.map((row) => row.join(" | ")).join("\n"));
	}

	// Return methods
	return { initBoard, getBoard, updateBoard, printBoard };
})();

// Player object
const createPlayer = function (name, symbol) {
	return { name, symbol };
};

// Game flow object
const GameController = (function () {
	const board = Gameboard.getBoard();

	const playerOne = createPlayer("Elliott", "X");
	const playerTwo = createPlayer("Lucy", "O");

	const players = [playerOne, playerTwo];

	let activePlayer = players[0];

	const switchActivePlayer = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;

	const playRound = (row, column) => {
		console.log(`It's ${activePlayer.name}'s turn`);

		if (board[row][column] === null) {
			Gameboard.updateBoard(row, column, activePlayer.symbol);
			Gameboard.printBoard();
		} else {
			console.log("This space has been taken! Try again!");
			return;
		}

		// Check for win

		// Check for draw

		switchActivePlayer();
	};

	return { playRound, getActivePlayer };
})();

const board = Gameboard.getBoard();
GameController.playRound(1, 1);
GameController.playRound(1, 2);
GameController.playRound(1, 2);
GameController.playRound(2, 2);
