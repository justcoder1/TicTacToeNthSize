console.log('Hello')
// Let's create  afunction to generate an N x N board for us
const createBoard = (n) => {
  return [...Array(n)].map((row) => Array(n).fill(null))
}

// Get the board  3 x 3 as an example
const board  = createBoard(3)


//Check if the user is Row winner
const isHorizontalWinner = (currentPlayer, board) => {
 return board.some((moves) => moves.every((move) => move === currentPlayer))
}

// Check if the user is Column winner
const transposeBoard = (board) => {
  return board.map((_,index) => board.map((row) => row[index]))
}
const isVerticalWinner = (currentPlayer, board) => {
  return transposeBoard(board).some((moves) => moves.every((move) => move === currentPlayer))
}

// Get diagonal moves from the board  This will be used to check if a particular user has won //diagonally
const getDiagonalMoves = (board) => {

  const diagonalMoves = [];
  const equalBasedDiagonal = []; // i === j
  const sumBasedDiagonal = [] // i + j == n -1 

  // Check for left to right diagonal moves
  for(let row = 0; row < board.length; row++){
    for (col = 0; col < board.length; col++) {
      if (row === col) {
        equalBasedDiagonal.push(board[row][col])
      }
    }
  }

  // Check for right to left diagonal moves
  for(let row = 0; row < board.length; row++){
    for (col = 0; col < board.length; col++) {
      if (row + col === board.length -1 ) {
        sumBasedDiagonal.push(board[row][col])
      }
    }
  }

  diagonalMoves.push(equalBasedDiagonal,sumBasedDiagonal);
  return diagonalMoves;
}

// Use the diagonal moves to check if the user is a winner
const isDiagonalWinner = (currentPlayer,board) => {
  return getDiagonalMoves(board).some((moves) => moves.every((move) => move === currentPlayer))

}

// is Winner
const isWinner = (player,board) => isHorizontalWinner(player,board) || isVerticalWinner(player,board) || isDiagonalWinner(player,board)


// Check if all the moves have been filled 

const isGameOver = (board) => board.every((row) => row.every((move) => !!move))


// the main function to check for game winner 
// row & col indicates user moves 

const play = (board, [row,col], player) => {

  if(isGameOver(board)) {
    console.log('Game over')
    return;
  }

  if(board[row][col]) {
    return
  } else {
    board[row][col] = player
  }

  if (isWinner(player,board)) {
    console.log(`${player} WON!`)
  } else{
    console.log('Go on')
  }
}