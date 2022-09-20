const qwerty = document.querySelectorAll("#qwerty button");
const lives = document.querySelectorAll("#scoreboard img");
const phrase = document.querySelector("#phrase ul");
const btnReset = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const title = document.getElementsByClassName("title")[0];

const phrases = [
  "My Cup Of Tea",
  "Your problem is similar to mine",
  "My headache has gone",
  "Everything But The Kitchen Sink",
  "It's Not Brain Surgery",
];

let missed = 0;
let selectedPhrase;

const createLi = (text) => {
  const li = document.createElement("li");
  li.innerText = text;
  if (text === " ") {
    li.classList.add("space");
  } else {
    li.classList.add("letter");
  }
  return li;
};

btnReset.addEventListener("click", () => {
  const randomNumber = Math.round(Math.floor(Math.random() * phrases.length));
  selectedPhrase = phrases[randomNumber];
  overlay.style.display = "none";
  selectedPhrase.split("").forEach((letter) => {
    phrase.appendChild(createLi(letter));
  });

  qwerty.forEach((ceva) => {
    ceva.removeAttribute("disabled");
  });
  lives.forEach((live) => {
    live.setAttribute("src", "/images/liveHeart.png");
  });
  missed = 0;
});

qwerty.forEach((ceva) => {
  ceva.addEventListener("click", (e) => {
    const letterToCheck = e.target.innerText;
    const toCheck = [...phrase.children].filter(
      (letter) => !letter.classList.contains("space")
    );
    let right = 0;

    toCheck.forEach((letter) => {
      if (letterToCheck === letter.innerText.toLowerCase()) {
        letter.classList.add("show");
        right += 1;
      } else {
        e.target.setAttribute("disabled", "disabled");
      }
    });

    if (right === 0) {
      missed += 1;
      let change = 5 - missed;
      if (missed < 6) {
        lives[change].setAttribute("src", "/images/lostHeart.png");
      }
    }

    if (toCheck.every((letter) => letter.classList.contains("show"))) {
      phrase.innerHTML = "";
      overlay.style.display = "flex";
      overlay.classList.remove("start");
      overlay.classList.add("win");
      btnReset.textContent = "Start a new game";
      title.textContent = "Congratulations, you won!";
    }

    if (missed === 5) {
      phrase.innerHTML = "";
      overlay.style.display = "flex";
      overlay.classList.remove("start");
      overlay.classList.add("lose");
      btnReset.textContent = "Try again";
      title.textContent = "You lost! Sorry";
    }
  });
});
