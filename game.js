$(document).ready(function () {
    $(document).keydown(function (event) {
      if (event.key === "A" || (event.key === "a" && level === 0)) {
        setTimeout(nextSequence, 500);
        $("h1").text("Level " + level);
      }
    });
    var gamePattern = [];
    var level = 0;
    var userInputCounter = 0;
    var buttonColors = ["red", "blue", "green", "yellow"];
  
    function nextSequence() {
      level++;
      // get random number and get the color from array at that random number as index
      let randomNumber = getRandomIntBetween(0, 3);
      let randomChoosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChoosenColor);
      console.log(gamePattern);
  
      // flash the button to user
      $("#" + randomChoosenColor).animate({ opacity: 0 }, 200, function () {
        $("#" + randomChoosenColor).animate({ opacity: 1 }, 200);
      });
  
      function getRandomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      playAudio(randomChoosenColor);
      $("h1").text("Level " + level);
    }
  
    $(".btn").click(function () {
      let currentButtonClicked = $(this).attr("id");
      // play audio
      playAudio(currentButtonClicked);
      // set visuals
      animatePress(currentButtonClicked);
      setTimeout(function () {
        $("#" + currentButtonClicked).removeClass("pressed");
      }, 100);
  
      validateInput(currentButtonClicked);
    });
  
    function validateInput(currentButtonClicked) {
      if (currentButtonClicked === gamePattern[userInputCounter]) {
        userInputCounter++;
        if (level === userInputCounter) {
          userInputCounter = 0;
          setTimeout(nextSequence, 1000);
        }
      } else {
        //reset the game
        setTimeout(function () {
          $("h1").text("Game Over, Press key 'A' to Restart");
          playAudio("wrong");
          $("body").addClass("game-over");
          gamePattern = [];
          level = 0;
          userInputCounter = 0;
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        }, 300);
      }
    }
  
    function animatePress(color) {
      $("#" + color).addClass("pressed");
    }
  
    function playAudio(color) {
      let sound = new Audio("./sounds/" + color + ".mp3");
      sound.currentTime = 0;
      sound.play();
    }
  });
  