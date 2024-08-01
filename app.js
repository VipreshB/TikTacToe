let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); //here we are getting deatil to work
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let sound = document.getElementById("sound");
const audio = document.getElementById("bg-audio");
const muteUnmuteButton = document.getElementById("muteUnmuteButton");
const playAudioButton = document.getElementById("play-audio-btn");

playAudioButton.addEventListener("click", () => {
  audio.play();
  playAudioButton.style.display = "none"; // Hide the button after playing audio
});

muteUnmuteButton.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteUnmuteButton.textContent = "🎵";
  } else {
    audio.muted = true;
    muteUnmuteButton.textContent = "🔇";
  }
});

let turnO = true; //player x , player o
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("buton was clked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    sound.play();
    box.disabled = true;
    checkWinner(); // here we are call that
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (Winner) => {
  //making winner function
  msg.innerText = `Congrats, Winner is ${Winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  //making check winner function
  for (let pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner", pos1val);
        showWinner(pos1val); //calling and passing val
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
