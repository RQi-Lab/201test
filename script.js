const drawButton = document.getElementById('drawButton');
const resetButton = document.getElementById('resetButton');
const result = document.getElementById('result');
const history = document.getElementById('history');
const numbersContainer = document.getElementById('numbers');
const dart = document.getElementById('dart');

let availableNumbers = Array.from({ length: 23 }, (_, i) => i + 1);
let drawnNumbers = [];

function createNumberPins() {
  numbersContainer.innerHTML = '';

  for (let i = 1; i <= 23; i += 1) {
    const number = document.createElement('div');
    number.className = 'number';
    number.dataset.number = i;
    number.dataset.index = i - 1;
    number.textContent = i;

    const angle = (360 / 23) * (i - 1) - 90;
    const radius = 155;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    number.style.transform = `translate(${x}px, ${y}px)`;
    numbersContainer.appendChild(number);
  }
}

function updateDartPosition(selected) {
  const selectedItem = document.querySelector(`.number[data-number='${selected}']`);
  const previous = document.querySelector('.number.selected');

  if (previous) {
    previous.classList.remove('selected');
  }

  if (!selectedItem) return;
  selectedItem.classList.add('selected');

  const index = Number(selectedItem.dataset.index);
  const angle = (360 / 23) * index - 90;
  dart.style.transform = `translate(-50%, -100%) rotate(${angle}deg) translateY(-18px)`;
}

function drawNumber() {
  if (availableNumbers.length === 0) {
    result.textContent = '所有座號都已抽完，請按「重置」。';
    return;
  }

  const index = Math.floor(Math.random() * availableNumbers.length);
  const selected = availableNumbers.splice(index, 1)[0];
  drawnNumbers.push(selected);

  updateDartPosition(selected);
  result.textContent = `飛鏢命中：${selected} 號！`;
  history.textContent = `已抽：${drawnNumbers.join(', ')}。剩下：${availableNumbers.length} 個。`;
}

function resetDraw() {
  availableNumbers = Array.from({ length: 23 }, (_, i) => i + 1);
  drawnNumbers = [];
  result.textContent = '已重置，請按「投飛鏢」。';
  history.textContent = '';

  const previous = document.querySelector('.number.selected');
  if (previous) {
    previous.classList.remove('selected');
  }

  dart.style.transform = 'translate(-50%, -100%) rotate(0deg) translateY(-18px)';
}

createNumberPins();
drawButton.addEventListener('click', drawNumber);
resetButton.addEventListener('click', resetDraw);
