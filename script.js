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
		if (
			board[0][0] === symbol &&
			board[1][1] === symbol &&
			board[2][2] === symbol
		) {
			return true;
		}

		if (
			board[0][2] === symbol &&
			board[1][1] === symbol &&
			board[2][0] === symbol
		) {
			return true;
		}

		return false;
	}

	// Check if gameboard is full
	function checkDraw(board) {
		if (board.flat().some((cell) => cell === null)) {
			return false;
		} else {
			return true;
		}
	}

	// Update board with players move
	function updateBoard(row, column, symbol) {
		board[row][column] = symbol;
	}

	// Return methods
	return {
		initBoard,
		getBoard,
		updateBoard,
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
		} else {
			console.log("This space has been taken! Try again!");
			console.log(row, column);
			return;
		}

		// Check for win
		if (Gameboard.checkWin(board, activePlayer.symbol)) {
			console.log(`${activePlayer.name} wins!`);
			Gameboard.initBoard();
			return;
		}
		// Check for draw
		if (Gameboard.checkDraw(board)) {
			console.log("It's a draw!");
			Gameboard.initBoard();
			return;
		}

		switchActivePlayer();
	};

	return { playRound, getActivePlayer };
})();

const DisplayController = (function () {
	const game = GameController;
	const board = Gameboard.getBoard();

	//Cache DOM
	const boardDisplay = document.querySelector(".board");
	const playerTurnDiv = document.querySelector(".turn");

	const updateScreen = () => {
		const activePlayer = game.getActivePlayer();
		playerTurnDiv.textContent = `It's ${activePlayer.name}'s Turn!`;

		boardDisplay.innerHTML = null;

		// Create buttons for each position on grid
		board.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				const boardButton = document.createElement("button");
				boardButton.classList.add("cell");
				boardButton.dataset.row = rowIndex;
				boardButton.dataset.col = colIndex;
				boardButton.textContent = cell ?? "";
				boardDisplay.append(boardButton);
			});
		});
	};

	function symbolClickHandler(event) {
		const row = event.target.dataset.row;
		const column = event.target.dataset.col;

		game.playRound(row, column);
		updateScreen();
	}

	// add click event listeners
	boardDisplay.addEventListener("click", symbolClickHandler);

	// call playRound(rowIndex, colIndex)
	updateScreen();

	// Testing Purposes
	return { updateScreen };
})();

// Gameboard.getBoard();

// GameController.playRound(0, 0);
// GameController.playRound(0, 2);
// GameController.playRound(1, 0);
// GameController.playRound(1, 1);
// GameController.playRound(2, 2);
// GameController.playRound(2, 0);
// GameController.playRound(0, 0);
// GameController.playRound(2, 1);
// GameController.playRound(2, 0);
// GameController.playRound(1, 0);
