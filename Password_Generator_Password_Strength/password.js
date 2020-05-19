const strengthBar = document.querySelector(".strength-bar");
const reasons = document.querySelector(".reasons");
const passwordText = document.querySelector("input");

passwordText.addEventListener("input", () => {
  const weaknesses = calculatePasswordStrength(passwordText.value);
  let strength = 100;
  reasons.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasons.appendChild(messageElement);
  });
  strengthBar.style.setProperty("--strength", strength);
});

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(specialCharacterWeakness(password));
  weaknesses.push(repeatingCharactersWeakness(password));
  return weaknesses;
}

function lengthWeakness(password) {
  const passwordLength = password.length;

  if (passwordLength <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }

  if (passwordLength <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 5,
    };
  }
}

function characterWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches == 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }

  if (matches <= 2) {
    return {
      message: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
}

function lowercaseWeakness(password) {
  return characterWeakness(password, /[a-z]/g, "lowercase characters");
}

function uppercaseWeakness(password) {
  return characterWeakness(password, /[A-Z]/g, "uppercase characters");
}

function numberWeakness(password) {
  return characterWeakness(password, /[0-9]/g, "numbers");
}

function specialCharacterWeakness(password) {
  return characterWeakness(password, /[^0-9a-zA-Z\s]/g, "special characters");
}

function repeatingCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];

  if (matches.length > 0) {
    return {
      message: "Your password has repeating characters",
      deduction: matches.length * 10,
    };
  }
}
