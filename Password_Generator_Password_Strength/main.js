const passwordDisplay = document.querySelector(".password-display");
const form = document.querySelector("form");
const amountRange = document.getElementById("amountRange");
const amountNumber = document.getElementById("amountNumber");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const specialCharacters = document.getElementById("specialCharacters");
const copyPassword = document.querySelector("p");

amountRange.addEventListener("change", syncChange);
amountNumber.addEventListener("input", syncChange);

function syncChange(e) {
  const value = e.target.value;
  amountRange.value = value;
  amountNumber.value = value;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = amountNumber.value;
  const includeUpperCase = uppercase.checked;
  const includeNumber = numbers.checked;
  const includespecialCharacters = specialCharacters.checked;
  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    includeNumber,
    includespecialCharacters
  );
  passwordDisplay.innerText = password;
});

const Lowercase_Char_Codes = arrayFromLowToHigh(97, 122);
const Uppercase_Char_Codes = arrayFromLowToHigh(65, 90);
const Number_Char_Codes = arrayFromLowToHigh(48, 57);
const SpecialCharacters_Char_Codes = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

function generatePassword(
  characterAmount,
  includeUpperCase,
  includeNumber,
  includespecialCharacters
) {
  let charCodes = Lowercase_Char_Codes;
  if (includeUpperCase) charCodes = charCodes.concat(Uppercase_Char_Codes);
  if (includeNumber) charCodes = charCodes.concat(Number_Char_Codes);
  if (includespecialCharacters)
    charCodes = charCodes.concat(SpecialCharacters_Char_Codes);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCodes =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCodes));
  }
  return passwordCharacters.join("");
}
//
function arrayFromLowToHigh(low, high) {
  const arr = [];
  for (let i = low; i < high; i++) {
    arr.push(i);
  }
  return arr;
}

copyPassword.addEventListener("click", () => {
  const password = passwordDisplay.innerText;
  const textarea = document.createElement("textarea");

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
