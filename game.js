console.log("Let's play Tic-Tac-Toe!");
console.log("Creating game board for 3x3:");

const GameBoard = (function (dimension) {
  const board = [];
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      row.push(" ");
    }
    board.push(row);
  }

  const checkRows = () => {
    let win = false;
    for (let i = 0; i < dimension; i++) {
      if (checkEquality(board[i])) {
        win = true;
        break;
      }
    }

    return win;
  };

  const checkCols = () => {
    let win = false;
    for (let i = 0; i < dimension; i++) {
      // check row
      const colValues = [];
      for (let j = 0; j < dimension; j++) {
        colValues.push(board[j][i]);
      }

      if (checkEquality(colValues)) {
        win = true;
        break;
      }
    }

    return win;
  };

  const checkDiagonals = () => {
    const upperDiagonal = [];
    const lowerDiagonal = [];

    for (let i = 0; i < dimension; i++) {
      const upperX = i;
      const lowerX = dimension - i - 1;
      upperDiagonal.push(board[upperX][i]);
      lowerDiagonal.push(board[lowerX][i]);
    }

    return checkEquality(upperDiagonal) || checkEquality(lowerDiagonal);
  };

  const checkEquality = (items) => {
    if (items.length < 2) {
      return true;
    }

    const starter = items[0];
    if (starter === " ") {
      return false;
    }

    for (let i = 1; i < items.length; i++) {
      if (items[i] !== starter) {
        return false;
      }
    }

    return true;
  };

  const checkWinConditions = () =>
    checkRows() || checkCols() || checkDiagonals();

  const mark = (symbol, row, col) => {
    console.log(`Marking (${row}, ${col}) as '${symbol}'`);
    board[row][col] = symbol;
  };

  const print = () => {
    let printableBoard = [];
    for (let i = 0; i < dimension; i++) {
      let row = [];
      for (let j = 0; j < dimension; j++) {
        row.push(` ${board[i][j]} `);
      }

      printableBoard.push(row.join("|"));

      if (i + 1 === dimension) {
        continue;
      }

      let separator = [];
      for (let j = 0; j < dimension; j++) {
        separator.push(" - ");
      }

      printableBoard.push(separator.join("+"));
    }

    console.log(printableBoard.join("\n"));
  };

  return {
    checkWinConditions,
    mark,
    print,
  };
})(3);

const Game = (function () {
  const makeMove = (symbol, row, col) => {
    GameBoard.mark(symbol, row, col);
    GameBoard.print();

    if (GameBoard.checkWinConditions()) {
      console.log(`'${symbol}' wins!`);
    }
  };

  return { makeMove };
})();

GameBoard.print();
console.log("Make your move!");
