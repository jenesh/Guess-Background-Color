let btnRed = document.querySelector('#btn-red');
let btnGreen = document.querySelector('#btn-green');
let btnBlue = document.querySelector('#btn-blue');
let score = document.querySelector('#score');
let lives = document.querySelector('#lives');
let hScore = document.querySelector('#high-score');

let storage = JSON.parse(localStorage.getItem('highScore'));

let highScore = storage > 0 ? storage : 0;

hScore.innerHTML = `High Score: ${highScore}`;

let currScore = 0;
let currLives = 3;
let star = ['⭐️', '⭐️', '⭐️'];

console.log(highScore)
console.log(JSON.parse(localStorage.getItem('storeObj')))

let answer;
randomColor();

function randomColor() {
    let background = document.querySelector('#game-screen');
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    let rgb = `rgb(${red}, ${green}, ${blue})`;

    console.log('RGB: ', red, green, blue)
    background.style.backgroundColor = rgb;

    if (red > green && red > blue) {
        answer = 'red';
    } else if (green > red && green > blue) {
        answer = 'green';
    } else if (blue > red && blue > green) {
        answer = 'blue';
    } else if (red === green) {
        answer = 'redgreen';
    } else if (red === blue) {
        answer = 'redblue';
    } else if (blue === green) {
        answer = 'bluegreen';
    }
}

function checkGuess() {
    if (this.id.includes(answer)) {
        currScore++;
        if (currScore > highScore) {
            highScore = currScore;
        }
    } else {
        currLives--;
        star.pop();
    }
    score.innerHTML = `Current Score: ${currScore}`;
    lives.innerHTML = `Lives Remaining: ${star.join('')}`;
    hScore.innerHTML = `High Score: ${highScore}`;
    gameCheck();
    randomColor();
    
    console.log(star)
    console.log("lives: ", currLives)
    console.log('Answer: ', answer);
    console.log('Button Clicked: ', this);
}

function gameCheck() {
    if (currLives === 0) {
        if (currScore > highScore) {
            highScore = currScore;
        }
        document.location.reload(true);
    }
    localStorage.setItem('highScore', JSON.stringify(highScore));
}
btnRed.addEventListener('click', checkGuess);
btnGreen.addEventListener('click', checkGuess);
btnBlue.addEventListener('click', checkGuess);