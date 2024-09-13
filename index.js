const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5; // const changed into let //

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';
    resetButton.disabled = true;     // added the reset button//
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // changed from low to high//
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    // added 2 lines wuth numberOfGuessesMessages//
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML =`0 guesses remaining`;
    resetButton.disabled = false; //added the reset button//
  }

 // added a new condition //
  if (attempts === 4) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML =`1 guess remaining`;
    resetButton.disabled = false; 
  }


  guessInput.value = '';

  resetButton.style.display = '';
}
// in the loop <= was changed into < //
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;// changed from 0 to 5 again//
  attempts = 0; // added the number of attemps again //
 
  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value = ''; // added a clear input again //

  hideAllMessages();
  resetButton.style.display = 'none';
  resetButton.disabled = true;
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
