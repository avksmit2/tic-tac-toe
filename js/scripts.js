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
  this.turn = 0;
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
  this.gameNum++;
  this.gameOver = false;
  this.winner = "";
  this.turn = 0;
}
Game.prototype.setSquares = function() {
  this.squares = new Array(3);
  for (var x = 0; x < 3; x++) {
    this.squares[x] = new Array(3);
    for(var y = 0; y < 3; y++) {
      this.squares[x][y] = new Square();
    }
  }
}

function checkWinner(a, b, c, mark) {
  if (!a || !b || !c) {
    return false;
  }
  return (a === mark && b === mark && c === mark);
}
Game.prototype.checkGameOver = function() {
  var haveWinner = false;
  for (var i = 0; i < 3; i++) {
    if (checkWinner(this.squares[i][0].mark,
                       this.squares[i][1].mark,
                       this.squares[i][2].mark,
                       this.activePlayer.mark) ||
        checkWinner(this.squares[0][i].mark,
                       this.squares[1][i].mark,
                       this.squares[2][i].mark,
                       this.activePlayer.mark)) {
      haveWinner = true;
    }
  }
  if (checkWinner(this.squares[0][0].mark,
                   this.squares[1][1].mark,
                   this.squares[2][2].mark,
                   this.activePlayer.mark) ||
    checkWinner(this.squares[2][0].mark,
                   this.squares[1][1].mark,
                   this.squares[0][2].mark,
                   this.activePlayer.mark)) {
    haveWinner = true;
  }
  if (haveWinner) {
    this.gameOver = true;
    this.activePlayer.score++;
    this.winner = this.activePlayer;
  } else if (this.turn === 9) {
    this.gameOver = true;

  }
}

Game.prototype.markSpace = function(x, y) {
  this.squares[x][y].mark = this.activePlayer.mark;
  this.turn++;
  this.checkGameOver();
  if (this.activePlayer === this.players[0]) {
    this.activePlayer = this.players[1];
  } else {
    this.activePlayer = this.players[0];
  }
}

$(document).ready(function() {
  var newGame;
  $("form#playerNames").submit(function(event) {
    event.preventDefault();
    var playerX = $("#playerX").val();
    var playerO = $("#playerO").val();
    if (!newGame) {
      playerX = new Player(playerX, "x");
      playerO = new Player(playerO, "o");
      newGame = new Game(playerX, playerO);
    }
    $("#playerNameDisplay").show();
    $("#playerInput").hide();
    $("#start").hide();
    $("#gameBoard").show();
    newGame.firstTurn();
    newGame.setSquares();
    $("#spaces .space").text("");
    $("#playerNameDisplay .playerXName").text(playerX.name);
    $("#playerNameDisplay .playerOName").text(playerO.name);
    $("#playerNameDisplay .gameNum").text(newGame.gameNum);
    $("#gameBoard .activePlayerName").text(newGame.activePlayer.name);
  });
  $(".space").click(function() {
    if (!$(this).text()) {
      $(this).text(newGame.activePlayer.mark);
      newGame.markSpace($(this).data("x"), $(this).data("y"));
      $(".activePlayerName").text(newGame.activePlayer.name);
      if(newGame.gameOver) {
        if(newGame.winner) {
          alert("congrats " + newGame.winner.name);
        } else {
          alert("tie!!!");
        }
        $("#start").show();
      }
    }
  });
});
