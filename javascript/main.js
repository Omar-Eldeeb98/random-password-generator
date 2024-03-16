const lengthSlider = document.querySelector(".pass-length input ");
const generateButton = document.querySelector("div button");
const options = document.querySelectorAll(".option input");
const paswordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector("div.pass-indicator");
const copyIcon = document.querySelector("div.icon-container i.copy ");
const checkIcon = document.querySelector("div.icon-container i.check ");
const chars = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+?|<>*-+~[]{}",
};

function copyPass() {
  navigator.clipboard.writeText(paswordInput.value);
  copyIcon.classList.add("d-none");
  checkIcon.classList.remove("d-none");
  
  setTimeout(() => {
    checkIcon.classList.add("d-none");
    copyIcon.classList.remove("d-none");
    paswordInput.value = null;
  }, 500);
  //   checkIcon.addEventListener("click", () => {
  //     checkIcon.classList.add("d-none");
  //     copyIcon.classList.remove("d-none");
  //   });
}

function updateSlider() {
  //   console.log(lengthSlider.value);
  document.querySelector(".pass-length .details span ").innerText =
    lengthSlider.value;
}

function generatePassword() {
  //   copyIcon.classList.remove("d-none");
  //   checkIcon.classList.add("d-none");
  let staticPassword = "";
  passlength = lengthSlider.value;
  randomPassword = "";
  excludeDublicate = false;
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-dublicate" && option.id !== "spaces") {
        staticPassword += chars[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}`;
      } else {
        excludeDublicate = true;
      }
    }
  });

  for (let i = 0; i < passlength; i++) {
    let random_ =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDublicate) {
      !randomPassword.includes(random_) || random_ == " "
        ? (randomPassword += random_)
        : i--;
    } else {
      randomPassword += random_;
    }
  }

  //   console.log(randomPassword); //^ just for testing
  paswordInput.value = randomPassword;
}

function updatePasswordIndicator() {
  //   passIndicator.id =
  //     lengthSlider.value <= 8
  //       ? "weak"
  //       : lengthSlider.vlaue <= 16
  //       ? "medium"
  //       : "strong";
  if (lengthSlider.value <= 8) {
    passIndicator.id = "weak";
  } else if (lengthSlider.value <= 16) {
    passIndicator.id = "medium";
  } else {
    passIndicator.id = "strong";
  }
}

updatePasswordIndicator();

lengthSlider.addEventListener("input", () => {
  updateSlider();
  updatePasswordIndicator();
});

generateButton.addEventListener("click", () => {
  generatePassword();
});

copyIcon.addEventListener("click", () => {
  copyPass();
});
