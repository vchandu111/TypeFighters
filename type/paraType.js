const randomTexts = "https://api.chucknorris.io/jokes/random";
const textDisplay = document.getElementById("paraDisplay");
const userInput = document.getElementById("userResponse");
let clock = document.getElementById("speedTimer");

let totalTyped;
let time;
let initial_time = 35;
let level = document.getElementById("select");

const selectchange = () => {
  // console.log(event.target.value);
  if (event.target.value == "Medium") {
    time = 20;
    clock.textContent = time;
    initial_time = 20;
    return time;
  } else if (event.target.value == "Hard") {
    time = 15;
    clock.textContent = time;
    initial_time = 15;
    return time;
  } else {
    time = 35;
    clock.textContent = time;
    return time;
  }
};

level.addEventListener("change", selectchange);
let userSpeed = (totalwords, initial_time) => {
  console.log(totalwords, initial_time);
  let final = document.getElementById("finalResult");
  final.textContent = "";
  let speed = Math.floor(totalwords / 5 / (initial_time / 60));

  final.innerHTML = ` ${speed}<br>WPM `;
  final.style.fontSize = "18px";
  final.style.color = "greenyellow";
};

const getrandomText = () => {
  return fetch(randomTexts)
    .then((response) => response.json())
    .then((texts) => texts.value);
};

userInput.addEventListener("input", () => {
  const displayArray = textDisplay.querySelectorAll("span");
  const userArray = userInput.value.split("");

  let flag = true;
  displayArray.forEach((textSpan, index) => {
    const userText = userArray[index];
    if (userText == null) {
      textSpan.classList.remove("correct");
      textSpan.classList.remove("incorrect");
      flag = false;
    } else if (userText == textSpan.innerText) {
      textSpan.classList.add("correct");
      textSpan.classList.remove("incorrect");
    } else {
      textSpan.classList.remove("correct");
      textSpan.classList.add("incorrect");
      flag = false;
    }
  });

  if (flag) {
    totalTyped = userInput.value;

    const wordCount = (totalTyped) => {
      let woRds = totalTyped.split("").length;
      return woRds;
    };

    let totalwords = wordCount(totalTyped);

    userSpeed(totalwords, initial_time);
    renderTexts();
  }
});

let timeLeft;
//console.log(time);
time = Number(clock.textContent);
updateTime = () => {
  //console.log(time);
  clock.textContent = time;
  time--;
  if (time == -1) {
    textDisplay.innerHTML = `<h1>Time's Up</h1>`;
    textDisplay.style.color = "red";
    clearInterval(timeLeft);
    userInput.style.display = "none";
    let timeUp = document.getElementById("timeUp");
    let elem = document.createElement("button");
    timeUp.innerHTML = `<button id="playAgain" class="btn-grad" onClick="location.reload()">Play Again</button>`;
  }

  if (time < 5) clock.style.color = "red";
  //console.log(time);

  //console.log(clock.textContent);

  //console.log(typeof time);
};
let btn = document.getElementById("btn");
const renderTexts = async () => {
  userInput.focus();
  btn.style.display = "none";
  const text = await getrandomText();
  textDisplay.innerHTML = "";
  text.split("").forEach((element) => {
    const textSpan = document.createElement("span");
    textSpan.innerText = element;
    textDisplay.appendChild(textSpan);
  });
  userInput.value = null;

  //console.log(text);
};

btn.addEventListener("click", () => {
  renderTexts();
  timeLeft = setInterval(updateTime, 1000);
});

// function startTimer() {
//   setInterval(updateTime, 1000);
// }

//renderTexts();
