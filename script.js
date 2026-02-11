"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const valentineContainer = document.getElementById("valentineContainer");
const rosesContainer = document.getElementById("rosesContainer");
const bouquetWrapper = document.getElementById("bouquetWrapper");
const captionText = document.getElementById("captionText");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  // Cambia titolo e nascondi bottoni
  titleElement.innerHTML = "Preparando il tuo regalo speciale...";
  buttonsContainer.classList.add("hidden");
  
  // Avvia roses DOPO 2.5s esatti
  setTimeout(() => {
    transitionToRoses();
  }, 2500);
}

function transitionToRoses() {
  // Nascondi valentine e mostra roses
  valentineContainer.style.display = "none";
  rosesContainer.classList.remove("hidden");
  rosesContainer.style.display = "flex";
  
  // Avvia animazione packets dopo 500ms (tempo per render)
  setTimeout(() => {
    restartPackets();
  }, 500);
  
  // Avvia bouquet dopo il viaggio completo
  setTimeout(() => {
    showBouquet();
  }, 500 + 7300); // 500ms render + 7.3s viaggio
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
  ];
  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

// ROSA LOGIC
const packets = document.querySelectorAll(".rose-packet");

function restartPackets() {
  packets.forEach(p => {
    p.style.animation = "none";
    void p.offsetWidth;
    p.style.animation = "";
  });
}

function showBouquet() {
  if (!bouquetWrapper) return;
  bouquetWrapper.classList.add("bouquet-visible");
  if (captionText) {
    captionText.textContent = "Consegnato: il tuo bouquet è arrivato! Ti amo ❤️";
  }
}
