var prompt = require('prompt');

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
    
  }


}