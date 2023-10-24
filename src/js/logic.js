/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { renderBoard, showWinner } from './ui';

const players = ['x', 'o'];
let activePlayer;
let fieldSize;
let field;
let move;

// ----------------------------------------- Установка размера поля
function setField() {
  const size = prompt('Выберете размер поля. Введите число - сколько ячеек будет в длине и ширине (допустимые значения от 3 до 8):');

  if (!size) return null;

  if (size < 3 || size > 8) {
    alert('Допустимые значения от 3 до 8!');
    return setField();
  }

  return size;
}

// ----------------------------------------- Старт игры
export function startGame() {
  field = [];

  const choosePlayer = prompt(`Ваш ход первый!\nВыберете за кого будете играть (нажмите Х или О):\nИгрок №1 - ${players[0]}\nИгрок №2 - ${players[1]}`);

  switch (choosePlayer) {
    case 'х':
    case 'x':
      activePlayer = 0;
      break;
    case 'o':
    case 'о':
      activePlayer = 1;
      break;
    case null:
      return;
    default:
      alert('Игрок не выбран! Доступные игроки только "x" или "o".');
      return startGame();
  }

  alert(`Вы выбрали игрока №${activePlayer + 1}!`);

  fieldSize = setField();
  if (!fieldSize) return;

  for (let i = 0; i < fieldSize; i++) {
    field[i] = [];
    for (let k = 0; k < fieldSize; k++) {
      field[i][k] = '';
    }
  }

  move = 0;
  renderBoard(field);
}

// ----------------------------------------- Смена игрока и счет шагов
function changeActivePlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  move++;

  const maxMove = fieldSize * fieldSize;

  if (move === maxMove) {
    alert('Ничья!\nИграть снова');
    startGame();
  }
}

// ----------------------------------------- Определение победителя
function isWinner() {
  let sum = 0;

  // функция Победа
  function win() {
    if (sum === (fieldSize - 1)) showWinner(activePlayer);
  }

  // проверка по горизонтали
  for (let i = 0; i < field.length; i++) {
    for (let k = 1; k < field.length; k++) {
      if (field[i][0] === players[activePlayer] && field[i][k] === players[activePlayer]) {
        sum += 1;
        win();
      } else {
        sum = 0;
        break;
      }
    }
  }

  // проверка по вертикали
  for (let i = 0; i < field.length; i++) {
    for (let k = 1; k < field.length; k++) {
      if (field[0][i] === players[activePlayer] && field[k][i] === players[activePlayer]) {
        sum += 1;
        win();
      } else {
        sum = 0;
        break;
      }
    }
  }

  // проверка по диагонали1
  for (let i = 1; i < field.length; i++) {
    if (field[0][0] === players[activePlayer] && field[i][i] === players[activePlayer]) {
      sum += 1;
      win();
    } else {
      sum = 0;
    }
  }

  // проверка по диагонали2
  for (let i = 1; i < field.length; i++) {
    if (field[field.length - 1][0] === players[activePlayer] && field[(field.length - 1) - i][i] === players[activePlayer]) {
      sum += 1;
      win();
    } else {
      sum = 0;
    }
  }

  changeActivePlayer();
}

// ----------------------------------------- Клик по клетке
export function click(row, column) {
  if (field.length === 0) return;
  renderBoard(field);
  field[row].splice([column], 1, players[activePlayer]);
  renderBoard(field);
  isWinner();
}
