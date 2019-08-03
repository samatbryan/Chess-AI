/**
 * Finds a random move to make
 * @return {string} move to make
 */
var randomMove = function() {
  var possibleMoves = game.moves();
  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[randomIndex];
};

/**
 * Evaluates current chess board relative to player
 * @param {string} color - Players color, either 'b' or 'w'
 * @return {Number} board value relative to player
 */

 var evaluateBoard = function (board) {
     var totalEvaluation = 0;
     for (var i = 0; i < 8; i++) {
         for (var j = 0; j < 8; j++) {
             totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
         }
     }
     return totalEvaluation;
 };

 var reverseArray = function(array) {
     return array.slice().reverse();
 };

 var pawnEvalWhite =
     [
         [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
         [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
         [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
         [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
         [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
         [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
         [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
         [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
     ];

 var pawnEvalBlack = reverseArray(pawnEvalWhite);

 var knightEval =
     [
         [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
         [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
         [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
         [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
         [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
         [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
         [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
         [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
     ];

 var bishopEvalWhite = [
     [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
     [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
     [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
     [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
     [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
     [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
     [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
     [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
 ];

 var bishopEvalBlack = reverseArray(bishopEvalWhite);

 var rookEvalWhite = [
     [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
     [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
     [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
     [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
     [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
     [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
     [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
     [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
 ];

 var rookEvalBlack = reverseArray(rookEvalWhite);

 var evalQueen =
     [
     [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
     [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
     [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
     [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
     [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
     [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
     [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
     [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
 ];

 var kingEvalWhite = [

     [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
     [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
     [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
     [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
     [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
     [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
     [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
     [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
 ];

 var kingEvalBlack = reverseArray(kingEvalWhite);




 var getPieceValue = function (piece, x, y) {
     if (piece === null) {
         return 0;
     }
     var getAbsoluteValue = function (piece, isWhite, x ,y) {
         if (piece.type === 'p') {
             return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
         } else if (piece.type === 'r') {
             return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
         } else if (piece.type === 'n') {
             return 30 + knightEval[y][x];
         } else if (piece.type === 'b') {
             return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
         } else if (piece.type === 'q') {
             return 90 + evalQueen[y][x];
         } else if (piece.type === 'k') {
             return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
         }
         throw "Unknown piece type: " + piece.type;
     };

     var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
     return piece.color === 'w' ? absoluteValue : -absoluteValue;
 };



/**
 * Calculates the best move looking one move ahead
 * @param {string} playerColor - Players color, either 'b' or 'w'
 * @return {string} the best move
 */
var calcBestMoveOne = function(playerColor) {
  // List all possible moves
  var possibleMoves = game.moves();
  // Sort moves randomly, so the same move isn't always picked on ties
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});

  // exit if the game is over
  if (game.game_over() === true || possibleMoves.length === 0) return;

  // Search for move with highest value
  var bestMoveSoFar = null;
  var bestMoveValue = Number.NEGATIVE_INFINITY;
  possibleMoves.forEach(function(move) {
    game.move(move);
    var moveValue = evaluateBoard(game.board(), playerColor);
    if (moveValue > bestMoveValue) {
      bestMoveSoFar = move;
      bestMoveValue = moveValue;
    }
    game.undo();
  });

  return bestMoveSoFar;
}

/**
 * Calculates the best move using Minimax without Alpha Beta Pruning.
 * @param {Number} depth - How many moves ahead to evaluate
 * @param {Object} game - The game to evaluate
 * @param {string} playerColor - Players color, either 'b' or 'w'
 * @param {Boolean} isMaximizingPlayer - If current turn is maximizing or minimizing player
 * @return {Array} The best move value, and the best move
 */
var calcBestMoveNoAB = function(depth, game, playerColor,
                                isMaximizingPlayer=true) {
  // Base case: evaluate board
  if (depth === 0) {
    value = evaluateBoard(game.board(), playerColor);
    return [value, null]
  }

  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set random order for possible moves
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  // Search through all possible moves
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value of this move
    value = calcBestMoveNoAB(depth-1, game, playerColor, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
                bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
    }
    // Undo previous move
    game.undo();
  }
  // Log the best move at the current depth
  console.log('Depth: ' + depth + ' | Best Move: ' + bestMove + ' | ' + bestMoveValue);
  // Return the best move, or the only move
  return [bestMoveValue, bestMove || possibleMoves[0]];
}

/**
 * Calculates the best move using Minimax with Alpha Beta Pruning.
 * @param {Number} depth - How many moves ahead to evaluate
 * @param {Object} game - The game to evaluate
 * @param {string} playerColor - Players color, either 'b' or 'w'
 * @param {Number} alpha
 * @param {Number} beta
 * @param {Boolean} isMaximizingPlayer - If current turn is maximizing or minimizing player
 * @return {Array} The best move value, and the best move
 */
var calcBestMove = function(depth, game, playerColor,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  // Base case: evaluate board
  if (depth === 0) {
    value = evaluateBoard(game.board(), playerColor);
    return [value, null]
  }

  // Recursive case: search possible moves
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  // Set random order for possible moves
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});
  // Set a default best move value
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  // Search through all possible moves
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    // Make the move, but undo before exiting loop
    game.move(move);
    // Recursively get the value from this move
    value = calcBestMove(depth-1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];
    // Log the value of this move
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
                bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
  // Log the best move at the current depth
  console.log('Depth: ' + depth + ' | Best Move: ' + bestMove + ' | ' + bestMoveValue + ' | A: ' + alpha + ' | B: ' + beta);
  // Return the best move, or the only move
  return [bestMoveValue, bestMove || possibleMoves[0]];
}
