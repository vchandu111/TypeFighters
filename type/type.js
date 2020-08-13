import words from "./words.js";
const word = document.getElementById("word");
const text = document.getElementById("text");
const score = document.getElementById("score-count");
const time = document.getElementById("time-count");
const end = document.getElementById("end");
const difficultySelect = document.getElementById("difficulty");
const settingsForm = document.getElementById("settings-form");
const settings = document.getElementById("settings");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let tick = document.getElementById("tick");
let correct = 0;
let wrong = 0;
let audio = document.getElementById("myAudio");

console.log(words);

let timeLeft;
let randomWord;
let initialScore = 0;
let initialTime = 7;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//   console.log(getRandomWord());

//Add word to DOM
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
  if (difficulty === "hard") {
    initialTime = 4;
    initialTime--;
    console.log("hard");
  } else if (difficulty === "medium") {
    initialTime = 7;
    initialTime--;
  } else {
    initialTime = 10;
    initialTime--;
    console.log("easy");
  }
  updateTime();
}

//event listener
text.addEventListener("input", (e) => {
  const enteredInput = e.target.value;
  // console.log(enteredInput);

  if (enteredInput === randomWord) {
    correct++;
    correct = Number(correct);
    tick.innerHTML = `<i class="fas fa-check fa-right-color fa-2x"></i>`;
    addWordToDom();

    //clear
    e.target.value = "";

    //*****************do this at the last ,,jump to initialscore++

    // if ( difficulty === "hard" ) {
    //   initialTime += 2;
    //   console.log( "hard" );
    // } else if ( difficulty === "medium" ) {
    //   initialTime += 5;
    // } else {
    //   initialTime += 7;
    //   console.log( "easy" );
    // }

    // updateTime();

    //score updating
    initialScore++;
    if (initialScore > 0) {
      score.style.color = "#16a500";
    }
    score.innerHTML = initialScore;
  } else if (
    enteredInput.length == randomWord.length &&
    enteredInput != randomWord
  ) {
    wrong++;
    wrong = Number(wrong);
    console.log("wrong is" + wrong);

    tick.innerHTML = `<i class="fas fa-times fa-2x fa-wrong-color"></i>`;
    initialScore--;
    if (initialScore <= 0) {
      score.style.color = "red";
    }
    audio.play();
    score.innerHTML = initialScore;
    e.target.value = "";
    addWordToDom();
    return wrong;
  }
  console.log("wrong is finally" + wrong);
  return wrong;
});

console.log("final wrong is " + wrong);
//cursor to come automatically to input tag

//start counting down
text.disabled = true;

start.addEventListener("click", () => {
  text.disabled = false;
  text.focus();
  addWordToDom();

  start.style.display = "none";
  stop.style.display = "block";

  stop.addEventListener("click", gameOver);

  timeLeft = setInterval(updateTime, 1000);
});

function updateTime() {
  console.log(initialTime);
  initialTime--;
  time.innerHTML = `${initialTime}<span class="time-badge">sec</span>`;
  time.style.color = "#ffecb3";

  if (initialTime === 0) {
    console.log("time");
    text.disabled = true;
    clearInterval(timeLeft);
    //game over
    gameOver();
  }
  if (initialTime <= 5) {
    time.style.color = "red";
  }
}

function gameOver() {
  stop.style.display = "none";
  let accuracy;
  if (correct == 0 && wrong == 0) {
    accuracy = 0;
  } else accuracy = ((correct - wrong) / (correct + wrong)) * 100;
  accuracy = accuracy.toFixed(2);
  end.innerHTML = `<h1 id="blink">Time's Up</h1>
          <p id="correct">Correct : ${correct}</p>
          <p id="wrong">Wrong : ${wrong}</p>
          <p id="final-score">Accuracy is : ${accuracy} %</p>


          <button class="btn-grad" onClick="location.reload()">Play Again</button>`;

  setInterval(function () {
    document.getElementById("blink").style.opacity =
      blink.style.opacity == 0 ? 1 : 0;
  }, 500);
}

//difficulty

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
