function Player(name, mark) {
  this.name = name;
  this.mark = mark;
  this.score = 0;
}
function Square() {
  this.mark = "";
}
function Game(playerX, playerO) {
  this.players = [playerX, playerO];
  this.gameNum = 0;
  this.activePlayer = playerX;
  this.squares = [];
  this.gameOver = false;
  this.winner = "";
}
Game.prototype.firstTurn = function() {
  var roll = Math.round(Math.random());
  if (roll === 1) {
    this.activePlayer = this.players[0];
  } else {
    this.activePlayer = this.players[1];
  }
}
Game.prototype.clearBoard = function() {
  this.squares = new Array(3);
  for (var x = 0; x < 3; x++) {
    this.squares[x] = new Array(3);
    for(var y = 0; y < 3; y++) {
      this.squares[x][y] = new Square();
    }
  }
}

function checkWinner(a, b, c, player) {
  if (!a || !b || !c) {
    return false;
  }
  if (a === player.mark && b === player.mark && c === player.mark) {
    return true;
  } else {
    return false;
  }
}

Game.prototype.checkForWinner = function() {
  for (var x = 0; x < 3; x++) {
    if (checkForWinner(this.squares[x][0].mark,
                       this.squares[x][1].mark,
                       this.squares[x][2].mark,
                       this.activePlayer.mark) ||
        checkForWinner(this.squares[0][x].mark,
                       this.squares[1][x].mark,
                       this.squares[2][x].mark,
                       this.activePlayer.mark) ||
        checkForWinner(this.squares[0][0].mark,
                       this.squares[1][1].mark,
                       this.squares[2][2].mark,
                       this.activePlayer.mark) ||
        checkForWinner(this.squares[2][0].mark,
                       this.squares[1][1].mark,
                       this.squares[0][2].mark,
                       this.activePlayer.mark)) {
      this.gameOver = true;
      this.activePlayer.score++;
      this.winner = this.activePlayer;
    }
  }
}

$(document).ready(function() {
  var newGame;
  $("form#playerNames").submit(function(event) {
    event.preventDefault();
    var playerX = $("#playerX").val();
    var playerO = $("#playerO").val();
    if (!newGame) {
      playerX = new Player(playerX);
      playerO = new Player(playerO);
      newGame = new Game(playerX, playerO);
    }
    $("#playerNameDisplay").show();
    $("#playerNames").hide();
    $("#gameBoard").show();
    newGame.gameNum++
    newGame.firstTurn();
    newGame.clearBoard();
    $("#playerNameDisplay .playerXName").text(playerX.name);
    $("#playerNameDisplay .playerOName").text(playerO.name);
    $("#playerNameDisplay .gameNum").text(newGame.gameNum);
    $("#gameBoard .activePlayerName").text(newGame.activePlayer.name);
  });
  $(".space").click(function() {
    console.log($(this).data("x"));
  })
});
