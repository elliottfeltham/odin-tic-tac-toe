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

	// Check if theres a winner
	function checkWin(board, symbol) {
		// Loop through each row and check for matching symbols
		for (let i = 0; i < rows; i++) {
			if (board[i].every((cell) => cell === symbol)) {
				return true;
			}
		}
		// Loop through each column and check for matching symbols
		for (let j = 0; j < columns; j++) {
			if (board.every((row) => row[j] === symbol)) {
				return true;
			}
		}

		// Check diagonals for matching symbols

		return false;
	}

	// Check if gameboard is full
	function checkDraw(board) {
		const boardArr = board.flat();
		if (boardArr.some((cell) => cell === null)) {
			return false;
		} else {
			return true;
		}
	}

	// Update board with players move
	function updateBoard(row, column, symbol) {
		board[row][column] = symbol;
	}

	// Function to print baord to console, can be deleted
	function printBoard() {
		console.log(board.map((row) => row.join(" | ")).join("\n"));
	}

	// Return methods
	return {
		initBoard,
		getBoard,
		updateBoard,
		printBoard,
		checkDraw,
		checkWin,
	};
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

	const logActivePlayer = () =>
		console.log(`It's ${activePlayer.name}'s turn`);

	const playRound = (row, column) => {
		logActivePlayer();

		if (board[row][column] === null) {
			Gameboard.updateBoard(row, column, activePlayer.symbol);
			Gameboard.printBoard(); // Delete once UI complete
		} else {
			console.log("This space has been taken! Try again!");
			return;
		}

		// Check for win
		if (Gameboard.checkWin(board, activePlayer.symbol)) {
			console.log(`${activePlayer.name} wins!`);
			// Add end game function
			return;
		}
		// Check for draw
		if (Gameboard.checkDraw(board)) {
			console.log("It's a draw!");
			return;
		}

		switchActivePlayer();
	};

	return { playRound, getActivePlayer };
})();

const board = Gameboard.getBoard();
GameController.playRound(1, 1);
GameController.playRound(1, 2);
GameController.playRound(1, 2);
GameController.playRound(2, 2);
GameController.playRound(0, 2);
GameController.playRound(0, 1);
GameController.playRound(0, 0);
GameController.playRound(2, 1);
GameController.playRound(2, 0);
GameController.playRound(1, 0);
