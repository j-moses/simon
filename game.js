var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;
var highscore = 0;

startGame();

function startGame() {
  $(document).keypress(function() {
    if (!started) {
      $("#level-title2").text("")
      gamePattern = [];
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length-1);
});

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSequence();
}

function randomInt(max) {
  max += 1;
  var randomNumber = Math.floor(Math.random()*max);
  return randomNumber;
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSequence() {
  for (let i = 0; i < gamePattern.length ; i++) {
    setTimeout(function () {
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }, (i+1)*500);

  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length){
      if (level > highscore) {
        highscore = level;
        $("#highscore").text("High Score: " + highscore);
      }
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("#level-title").text("Game Over");
    $("#level-title2").text("Press Any Key To Start")
    level = 0;
    started = false;
    startGame();
  }
}
