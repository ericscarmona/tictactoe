var prompt = require('readline-sync');

class TicTacToe {
  constructor() {
    this.board = [[1,2,3],[4,5,6],[7,8,9]];
    this.player = 'X';
    this.moves = 0;
  }

  placeMove (row,col) {
    this.board[row][col] = this.player;
    this.moves++
  }

  switchPlayer () {
    this.player = this.player === 'X' ? 'O' : 'X';
  }

  printInvalidMove (message) {
    console.log(`Invalid input: ${message}`);
  }

  isInvalidMove (move) {
    move = Number(move);

    if (move > 9 || move < 1) {
      this.printInvalidMove('number must be between 1 and 9');
      return true;
    } else if (Math.floor(move) !== move) {
      this.printInvalidMove('number must be an integer');
      return true;
    } else if (this.isPositionOccupied(move)) {
      this.printInvalidMove('select another space');
      return true;
    } else {
      return false;
    }
  }

  isPositionOccupied(move) {
    var {row, col} = this.convertToRowCol(move);
    return typeof this.board[row][col] === 'string';
  }

  convertToRowCol (move) {
    var row = Math.floor((move - 1)/3);
    var col = (move - 1) % 3;
    return {row, col};
  }

  areAllEqual (a, b, c) {
    return a === b && b === c
  }

  isRowWinner (row) {
    return this.areAllEqual(this.board[row][0], this.board[row][1], this.board[row][2])
  }

  isColWinner (col) {
    return this.areAllEqual(this.board[0][col], this.board[1][col], this.board[2][col])
  }

  isDiagonalWinner () {
    return this.areAllEqual(this.board[0][0], this.board[1][1], this.board[2][2]) || this.areAllEqual(this.board[0][2], this.board[1][1], this.board[2][0]);
  }

  isWinner () {
    return this.isRowWinner || this.isColWinner || this.isDiagonalWinner
  }

  printBoard () {
    console.log(`${this.board[0][0]} | ${this.board[0][1]} | ${this.board[0][2]}`);
    console.log(`${this.board[1][0]} | ${this.board[1][1]} | ${this.board[1][2]}`);
    console.log(`${this.board[2][0]} | ${this.board[2][1]} | ${this.board[2][2]}`);
  }

  printWinner() {
    if (this.isWinner) {
      console.log(`${this.player} is the winner!`)
    }
  }

  isDraw () {
    return this.moves === 9; 
  } 

  printDraw () {
    if (this.isDraw) {
      console.log('DRAW');
    }
  }

  promptPlayerMove () {
    var move; 
    do {
      move = prompt.question(`Player ${this.player}, it's your turn! Please choose a move (1-9): `);
    } while(this.isInvalidMove(move));
    return this.convertToRowCol(move);
  }
 

  play () {
    this.printBoard();
    var {row, col} = this.promptPlayerMove();
    this.placeMove(row, col);
    if(this.isWinner(row, col)) {
      this.printWinner();
    } else if(this.isDraw()) {
      this.printDraw();
    } else {
      this.switchPlayer();
      this.play();
    }
  }

}

var game = new TicTacToe;

game.play()