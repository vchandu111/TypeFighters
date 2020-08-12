const randomTexts = "http://api.quotable.io/random";
const textDisplay = document.getElementById("paraDisplay");
const userInput = document.getElementById("userResponse");
let clock = document.getElementById("speedTimer");
let timeLeft;

let totalTyped;
let time = 35;
let level = document.getElementById("select");

const selectchange = () => {
  clearInterval(timeLeft);
  console.log(event.target.value);
  if (event.target.value == "Medium") {
    time = 20;
    clock.textContent = time;
  } else if (event.target.value == "Hard") {
    time = 15;
    clock.textContent = time;
  } else {
    time = 35;
    clock.textContent = time;
  }
  return time;
};

level.addEventListener("change", selectchange);
let userSpeed = (totalwords, time) => {
  console.log(totalwords, time);
  let final = document.getElementById("finalResult");
  final.textContent = "";
  let speed = Math.floor(totalwords + 1 / time);

  final.textContent = `Hey, your Speed is ${speed} words per minute`;
};

const getrandomText = () => {
  return fetch(randomTexts)
    .then((response) => response.json())
    .then((texts) => texts.content);
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

  // if (flag) {
  //   renderTexts();

  // }
});

const updatetime = () => {
  if (time == 1) {
    clearInterval(timeLeft);
    totalTyped = userInput.value;

    const wordCount = (totalTyped) => {
      let woRds = totalTyped.split(" ").length;
      return woRds;
    };

    let totalwords = wordCount(totalTyped);

    userSpeed(totalwords, time);
  }
  time--;
  clock.innerHTML = time;
};
const renderTexts = async () => {
  timeLeft = setInterval(updatetime, 1000);

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

let btn = document.getElementById("btn");
btn.addEventListener("click", renderTexts);

//renderTexts();
