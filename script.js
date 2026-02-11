"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const valentineContainer = document.getElementById("valentineContainer");
const rosesContainer = document.getElementById("rosesSection");
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
  console.log("Yes clicked - starting roses"); // DEBUG
  
  buttonsContainer.classList.add("hidden");
  titleElement.innerHTML = "Preparando il tuo regalo speciale...";
  
  // 2.5s dopo, forza transizione
  setTimeout(() => {
    if (valentineContainer && rosesContainer) {
      valentineContainer.style.display = "none";
      rosesContainer.classList.remove("hidden");
      rosesContainer.style.display = "flex";
      console.log("Roses container activated"); // DEBUG
      
      // Avvia animazioni dopo 300ms
      setTimeout(() => {
        restartPackets();
        setTimeout(() => {
          showBouquet();
        }, 7300);
      }, 300);
    }
  }, 2500);
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;
  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No", "Are you sure?", "Pookie please", "Don't do this to me :(",
    "You're breaking my heart", "I'm gonna cry..."
  ];
  return messages[Math.min(noCount, messages.length - 1)];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

// ROSA ANIMATIONS
const packets = document.querySelectorAll(".rose-packet");

function restartPackets() {
  console.log("Restarting packets"); // DEBUG
  packets.forEach(p => {
    p.style.animation = "none";
    p.offsetHeight; // Force reflow
    p.style.animation = "";
  });
}

function showBouquet() {
  console.log("Showing bouquet"); // DEBUG
  if (bouquetWrapper) {
    bouquetWrapper.classList.add("bouquet-visible");
  }
  if (captionText) {
    captionText.textContent = "Consegnato: il tuo bouquet è arrivato! Ti amo ❤️";
  }
}
