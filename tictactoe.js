/**
 * tictactoe.js
 *
 * Aleksandra Koneska
 * koneska.aleksandra@gmail.com
 *
 * Command Line tic tac toe game with random computer moves
 * reference: http://codereview.stackexchange.com/questions/95249/tic-tac-toe-command-line
 * Requires node.js and prompt to run
 **/

 var prompt = require('prompt');
 var human = 'X';
 var computer = 'O';
 var randomPlayer = Math.floor((Math.random()*2)+1);

// Define board
 var board = {
 	1: ' ',
 	2: ' ',
 	3: ' ',
 	4: ' ',
 	5: ' ',
 	6: ' ',
 	7: ' ',
 	8: ' ',
 	9: ' '
 }

// Store win cases
var winCases = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9], 
	[1, 4, 7], [2, 5, 8], [3, 6, 9],
	[1, 5, 9], [3, 5, 7]
];

function printBoard(){
	console.log('\n'+
		'   ' + board[1] + ' | ' + board[2] + ' | ' +  board[3] + '\n' +
		'   --------- \n' +
		'   ' + board[4] + ' | ' + board[5] + ' | ' +  board[6] + '\n' +
		'   --------- \n' +
		'   ' + board[7] + ' | ' + board[8] + ' | ' +  board[9] + '\n' 
	);
}

function selectPosition(position, mark){
	board[position] = mark;
}

function switchPlayers(player){
	if(player === human){
		startGame(computer);
	}else{
		startGame(human);
	}
}
function checkWinner(player){
	var i, j, markCount
	for(i = 0; i < winCases.length; i++){
		markCount = 0;
		for(j = 0; j < winCases[i].length; j++){
			if(board[winCases[i][j]] === player){
				markCount++;
			}
			if(markCount === 3){
				return true;
			}
		}
	}
	return false;
};

function checkTie(){
	for(var i = 0; i < Object.keys(board).length; i++){
		if(board[i] === ' '){
			return false;
		}
	}
	return true;
}
function computerMove(player){
	var random = Math.floor(Math.random()* 9) + 1;
	if(board[random] === ' '){
		console.log(' Computer\s turn: ' + random);
		selectPosition(random, computer);
		printBoard();
		startGame(human);
	}else{
		computerMove();
	}

	if(checkWinner(player) === true && player === computer){
		console.log(' Sorry, Computer Won\n');
		//return; 
		prompt.stop()//exit prompt/game
	}
}
// Main function - runs the game
function startGame(player){
	if(player === human){
		console.log(' Your turn: ');
		prompt.start();
		prompt.get(['position'], function(err, result){

			//Validate input
			if(isNaN(result.position) === false && board[result.position] === ' '){
				selectPosition(result.position, human);
				printBoard();

				//Check for a winner
				if(checkWinner(player) === true && player === human){
					console.log(' Congrats, You Won!\n');
					return; //exit prompt/game
				}
				
				//Check if tie
				if(checkTie() === true){
					console.log(' It\'s A tie\n');
					return; //exit prompt/game
				}

				switchPlayers(player);
				
			}else{
				console.log('Invalid or taken input. Try again with numbers 1-9');
				startGame(player);
			}
		});
	}
	if(player === computer){
		computerMove(player);
	}
	
}

 // Console log instructions
 console.log(
 	'        Game Started!\n' +
 	'    Human = X | Computer = O\n' +
	'Select a position by using numbers 1-9 \n' + '\n' +
	'          1 | 2 | 3 \n' +
	'          --------- \n' +
	'          4 | 5 | 6 \n' +
	'          --------- \n' +
	'          7 | 8 | 9 \n'
 	);

 // Start game
 if(randomPlayer === 1){
 	console.log('     You go first!\n');
 	startGame(human);
 }else{
 	console.log('     Computer goes first!\n');
 	startGame(computer);
 }
