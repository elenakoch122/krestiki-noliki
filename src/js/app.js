/* eslint-disable no-restricted-syntax */
import { click, startGame } from './logic';

window.addEventListener('load', startGame);

const boardEl = document.getElementById('board');
const modalEl = document.getElementById('modal');
const resetButtons = document.getElementsByClassName('reset');

for (const btn of resetButtons) {
  btn.addEventListener('click', () => {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    startGame();
  });
}

boardEl.addEventListener('click', (event) => {
  const targetClasses = event.target.classList;
  const targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});
