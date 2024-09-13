// Seleção de elementos da interface
const initialScreen = document.querySelector('.initial-screen');
const finalScreen = document.querySelector('.final-screen');
const formElement = document.querySelector('form');
const quantityInput = document.getElementById('quantity');
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const allowRepetitionCheckbox = document.getElementById('repeat-number');
const generatedNumbersList = document.getElementById('generated-numbers');
const resetButton = document.querySelector('.reset');

// Armazena os números gerados
const generatedNumbersSet = new Set();

// Permitir apenas números nos campos de entrada
function enforceNumericInput(inputElement) {
  inputElement.addEventListener('input', () => {
    inputElement.value = inputElement.value.replace(/\D/g, '');
  });
}

// Inicializa a aplicação
function initialize() {
  enforceNumericInput(quantityInput);
  enforceNumericInput(startInput);
  enforceNumericInput(endInput);

  allowRepetitionCheckbox.addEventListener('click', toggleCheckbox);
  resetButton.addEventListener('click', resetApplication);
  formElement.addEventListener('submit', handleFormSubmit);
}

// Alterna o estado do checkbox de repetição
function toggleCheckbox() {
  allowRepetitionCheckbox.checked = !allowRepetitionCheckbox.checked;
}

// Gera números aleatórios, com ou sem repetição
function generateRandomNumber(min, max) {
  const allowRepetition = allowRepetitionCheckbox.checked;
  const minimum = Number(min);
  const maximum = Number(max);
  let randomNumber;

  if (allowRepetition) {
    if (generatedNumbersSet.size >= (maximum - minimum + 1)) {
      throw new Error('Todos os números possíveis já foram gerados!');
    }
    do {
      randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    } while (generatedNumbersSet.has(randomNumber));
    generatedNumbersSet.add(randomNumber);
  } else {
    randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  return randomNumber;
}

// Gera múltiplos números conforme solicitado
function generateRandomNumbers(amount, min, max) {
  const numbers = [];
  const quantity = Number(amount);
  const rangeSize = Number(max) - Number(min) + 1;

  if (allowRepetitionCheckbox.checked && quantity > rangeSize) {
    throw new Error('A quantidade solicitada excede o número de valores possíveis sem repetição!');
  }

  for (let i = 0; i < quantity; i++) {
    numbers.push(generateRandomNumber(min, max));
  }

  return numbers;
}

// Limpa os campos de entrada e reinicia o estado da aplicação
function resetApplication() {
  generatedNumbersSet.clear();
  quantityInput.value = '';
  startInput.value = '';
  endInput.value = '';

  while (generatedNumbersList.firstChild) {
    generatedNumbersList.removeChild(generatedNumbersList.firstChild);
  }

  initialScreen.classList.remove('hidden');
  finalScreen.classList.remove('show');
}

// Executa a aplicação quando o formulário for enviado
function handleFormSubmit(event) {
  event.preventDefault();

  initialScreen.classList.add('hidden');
  finalScreen.classList.add('show');

  const randomNumbers = generateRandomNumbers(quantityInput.value, startInput.value, endInput.value);

  displayGeneratedNumbers(randomNumbers);
}

// Exibe os números gerados
function displayGeneratedNumbers(numbers) {
  numbers.forEach((number) => {
    const listItem = document.createElement('li');
    listItem.innerText = number;
    generatedNumbersList.appendChild(listItem);
  });
}

// Inicializa a aplicação
initialize();