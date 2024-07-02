document.addEventListener("DOMContentLoaded", () => {
  const hoverBox = document.querySelector(".hoverBox");
  const timerDisplay = document.querySelector(".Timer");
  const scoreDisplay = document.querySelector(".score");
  const durationButtons = document.querySelectorAll(".duration button");
  const playButton = document.getElementById("Play");
  const tryAgainButton = document.getElementById("tryAgainButton");
  const showScore = document.getElementById("ShowScore");

  let hoverCount = 0;
  let timeRemaining = 0;
  let countdownInterval = null;
  let gameStarted = false;

  function startGame() {
    hoverCount = 0;
    gameStarted = false;
    scoreDisplay.textContent = `Score : ${hoverCount}`;
    timerDisplay.textContent = formatTime(timeRemaining);
    hoverBox.addEventListener("mouseover", startTimerOnFirstHover);
  }

  function startTimerOnFirstHover() {
    if (!gameStarted) {
      gameStarted = true;
      startTimer();
    }
    incrementScore();
  }

  function startTimer() {
    countdownInterval = setInterval(() => {
      timeRemaining--;
      timerDisplay.textContent = formatTime(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    hoverBox.removeEventListener("mouseover", startTimerOnFirstHover);
    localStorage.setItem("hoverGameScore", hoverCount); // Store score in localStorage
    window.location.href = "gameOver.html";
  }

  function incrementScore() {
    hoverCount++;
    scoreDisplay.textContent = `Score : ${hoverCount}`;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes} : ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  }

  function resetGame() {
    clearInterval(countdownInterval);
    hoverBox?.removeEventListener("mouseover", startTimerOnFirstHover);
    hoverCount = 0;
    timeRemaining = 0;
    gameStarted = false;
    if (scoreDisplay && timerDisplay) {
      scoreDisplay.textContent = `Score : ${hoverCount}`;
      timerDisplay.textContent = "00 : 00";
    }
  }

  if (durationButtons.length > 0) {
    durationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        timeRemaining = parseInt(button.textContent);
        timerDisplay.textContent = formatTime(timeRemaining);
        startGame();
      });
    });
  }

  if (playButton) {
    playButton.addEventListener("click", () => {
      window.location.href = "play.html";
    });
  }

  if (tryAgainButton) {
    tryAgainButton.addEventListener("click", (event) => {
      event.preventDefault();
      resetGame();
      window.location.href = "index.html";
    });
  }

  // Display score on gameOver.html
  if (showScore) {
    const score = localStorage.getItem("hoverGameScore");
    showScore.textContent = score !== null ? score : 0;
  }
});
