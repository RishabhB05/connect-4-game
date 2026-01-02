// Game state and logic for Connect Four
export class GameState {
  constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.initializeBoard();
    this.currentPlayer = 'red'; // 'red' or 'yellow'
    this.gameOver = false;
    this.winner = null;
  }

  initializeBoard() {
    return Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
  }

  makeMove(col) {
    if (this.gameOver) {
      return { success: false, message: 'Game is over' };
    }

    if (col < 0 || col >= this.cols) {
      return { success: false, message: 'Invalid column' };
    }

    // Find the lowest empty row in the column
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][col] === null) {
        this.board[row][col] = this.currentPlayer;
        
        // Check for winner
        if (this.checkWinner(row, col)) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
          return { 
            success: true, 
            message: `${this.currentPlayer} wins!`,
            gameOver: true,
            winner: this.winner,
            board: this.board 
          };
        }

        // Check for draw
        if (this.isBoardFull()) {
          this.gameOver = true;
          return { 
            success: true, 
            message: 'Game is a draw!',
            gameOver: true,
            winner: null,
            board: this.board 
          };
        }

        // Switch player
        this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';

        return { 
          success: true, 
          message: `Move placed at column ${col}`,
          currentPlayer: this.currentPlayer,
          board: this.board 
        };
      }
    }

    return { success: false, message: 'Column is full' };
  }

  checkWinner(row, col) {
    const player = this.board[row][col];
    
    // Check horizontal
    if (this.countConsecutive(row, col, 0, 1, player) + 
        this.countConsecutive(row, col, 0, -1, player) + 1 >= 4) {
      return true;
    }
    
    // Check vertical
    if (this.countConsecutive(row, col, 1, 0, player) + 
        this.countConsecutive(row, col, -1, 0, player) + 1 >= 4) {
      return true;
    }
    
    // Check diagonal (top-left to bottom-right)
    if (this.countConsecutive(row, col, 1, 1, player) + 
        this.countConsecutive(row, col, -1, -1, player) + 1 >= 4) {
      return true;
    }
    
    // Check diagonal (top-right to bottom-left)
    if (this.countConsecutive(row, col, 1, -1, player) + 
        this.countConsecutive(row, col, -1, 1, player) + 1 >= 4) {
      return true;
    }
    
    return false;
  }

  countConsecutive(row, col, rowDelta, colDelta, player) {
    let count = 0;
    let r = row + rowDelta;
    let c = col + colDelta;

    while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === player) {
      count++;
      r += rowDelta;
      c += colDelta;
    }

    return count;
  }

  isBoardFull() {
    return this.board.every(row => row.every(cell => cell !== null));
  }

  resetGame() {
    this.board = this.initializeBoard();
    this.currentPlayer = 'red';
    this.gameOver = false;
    this.winner = null;
  }

  getState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner
    };
  }
}
