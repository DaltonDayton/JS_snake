document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay = document.querySelector('span');
  const startBtn = document.querySelector('.start');

  const width = 15;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0]; // 2 is head, 0 is tail, 1s are body
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;
  let gridDiv = '';
  let borderSize = width * 22;

  document.getElementById('gridContainer').innerHTML =
    '<div class="grid" ' +
    'style="height: ' +
    borderSize +
    'px; width: ' +
    borderSize +
    'px;"' +
    '></div>';

  // document.getElementById('gridContainer').innerHTML =
  //   '<div class="grid"></div>';

  for (let i = 0; i < width * width; i++) {
    gridDiv += '<div></div>';
  }
  document.querySelector('.grid').innerHTML = gridDiv;

  const squares = document.querySelectorAll('.grid div');

  // Start and restart the game
  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  // Deals with all move outcomes of the Snake
  function moveOutcomes() {
    // Snake collision with itself and borders
    if (
      (currentSnake[0] + width >= width * width && direction === width) || // If snake hits bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // If snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || // If snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) || // If snake hits top wall
      squares[currentSnake[0] + direction].classList.contains('snake') // Self collision
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop(); // Removes the last item of the array
    squares[tail].classList.remove('snake'); // Removes .snake from the tail
    currentSnake.unshift(currentSnake[0] + direction); // Gives direction to the head of the array

    // Collision with apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

    squares[currentSnake[0]].classList.add('snake');
  }

  // Generate new apple once apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  }

  // Assign functions to keys
  function control(e) {
    squares[currentIndex].classList.remove('snake');

    if (e.keyCode === 39) {
      direction = 1; // Right arrow key, snake wil go right
    } else if (e.keyCode === 38) {
      direction = -width; // Up arrow, snake will go back [width] divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1; // Left arrow key, snake will go left
    } else if (e.keyCode === 40) {
      direction = +width; // Down arrow, snake will go forward [width] divs, appearing down
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});
