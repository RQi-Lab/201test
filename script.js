const drawButton = document.getElementById('drawButton');
const resetButton = document.getElementById('resetButton');
const result = document.getElementById('result');
const history = document.getElementById('history');

let availableNumbers = Array.from({ length: 23 }, (_, i) => i + 1);
let drawnNumbers = [];

function drawNumber() {
  if (availableNumbers.length === 0) {
    result.textContent = '所有座號都已抽完，請按「重置」。';
    return;
  }

  const index = Math.floor(Math.random() * availableNumbers.length);
  const selected = availableNumbers.splice(index, 1)[0];
  drawnNumbers.push(selected);

  result.textContent = `抽到的座號：${selected} 號`;
  history.textContent = `已抽：${drawnNumbers.join(', ')}。剩下：${availableNumbers.length} 個。`;
}

function resetDraw() {
  availableNumbers = Array.from({ length: 23 }, (_, i) => i + 1);
  drawnNumbers = [];
  result.textContent = '已重置，請按「開始抽籤」。';
  history.textContent = '';
}

drawButton.addEventListener('click', drawNumber);
resetButton.addEventListener('click', resetDraw);
