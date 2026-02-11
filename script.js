"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const valentinePage = document.getElementById("valentinePage");
const rosesPage = document.getElementById("rosesPage");
const bouquetWrapper = document.getElementById("bouquetWrapper");
const captionText = document.getElementById("captionText");

const MAX_IMAGES = 5;

let play = true;
let noCount = 0;

if (yesButton && noButton) {
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
}

function handleYesClick() {
  if (!buttonsContainer || !titleElement || !valentinePage || !rosesPage) return;

  buttonsContainer.classList.add("hidden");
  titleElement.innerHTML = "Preparando il tuo regalo speciale...";

  setTimeout(() => {
    valentinePage.classList.add("hidden");
    rosesPage.classList.remove("hidden");

    setTimeout(() => {
      restartPackets();
      setTimeout(() => {
        showBouquet();
      }, 7300);
    }, 500);
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
  if (!catImg) return;
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  if (!noButton) return;
  noButton.innerHTML = generateMessage(noCount);
}

const packets = document.querySelectorAll(".rose-packet");

function restartPackets() {
  packets.forEach((p) => {
    p.style.animation = "none";
    void p.offsetHeight; // forza reflow per riavviare l’animazione
    p.style.animation = "";
  });
}

function showBouquet() {
  if (bouquetWrapper) {
    bouquetWrapper.classList.add("bouquet-visible");
  }
  if (captionText) {
    captionText.textContent =
      "Consegnato: il tuo bouquet è arrivato! Ti amo ❤️";
  }
}
