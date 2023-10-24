/* eslint-disable no-restricted-syntax */
const boardEl = document.getElementById('board');
const modalEl = document.getElementById('modal');

export function renderBoard(board) {
  const fields = [];
  for (const [i, row] of board.entries()) {
    for (const [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}"
            data-row="${i}"
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}

export function showWinner(winner) {
  const header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
  modalEl.classList.remove('hidden');
}
