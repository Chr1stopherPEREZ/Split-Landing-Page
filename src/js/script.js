const buttons = document.querySelectorAll(".btn");
const splitContainer = document.querySelector(".split .container");

// Déclaration des images pour chaque éléments
const images = {
  light: "/src/assets/images/hydaelyn.jpg",
  darkness: "/src/assets/images/emet-selch.jpg",
  sadness: "/src/assets/images/meteion.jpg",
};

let isSadnessActive = false;
let currentImage = images.sadness;

// Fonction pour changer l'image principale avec une animation GSAP
function changeBackground(image, direction) {
  if (image === currentImage) return; // Pas de transition si l'image est la même

  gsap.to(splitContainer, {
    x: direction === "left" ? "-100%" : "100%",
    opacity: 0,
    duration: 1,
    onComplete: () => {
      splitContainer.style.backgroundImage = `url(${image})`;
      gsap.fromTo(
        splitContainer,
        { x: direction === "left" ? "100%" : "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1 }
      );
      currentImage = image;
    },
  });
}

// Gestion des clics sur les boutons
function handleButtonClick(button) {
  const direction = button.classList.contains("light") ? "left" : "right";
  const newImage = button.classList.contains("light")
    ? images.light
    : images.darkness;

  if (newImage !== currentImage) changeBackground(newImage, direction);
  if (!isSadnessActive) activateSadness(button);
}

// Active l'élément Sadness sur un <bouton>
function activateSadness(button) {
  setTimeout(() => {
    button.textContent = "Sadness"; // Change le texte du <bouton>
    button.classList.add("sadness"); // Ajoute la classe .Sadness
    isSadnessActive = true; // Active l'élément Sadness

    button.addEventListener(
      "click",
      () => {
        const direction = button.classList.contains("light") ? "left" : "right";
        changeBackground(images.sadness, direction); // Affiche l'image Sadness
        resetButton(button);
      },
      { once: true }
    );
  }, 1000);
}

// Réinitialise dans son état d'origine si l'élément Sadness n'est plus actif
function resetButton(button) {
  button.textContent = button.classList.contains("light")
    ? "Light"
    : "Darkness"; // Restaure le texte initial
  button.classList.remove("sadness"); // Retire la classe .Sadness
  isSadnessActive = false;
  attachButtonEvents();
}

function attachButtonEvents() {
  buttons.forEach((button) => {
    button.removeEventListener("click", handleButtonClick);
    button.addEventListener("click", () => handleButtonClick(button), {
      once: true,
    });
  });
}

// Initialise les événements au chargement de la page
attachButtonEvents();

/* Script.js */
