const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");

const arena = document.getElementById("arena");
const target = document.getElementById("target");

const timeText = document.getElementById("time");
const hitsText = document.getElementById("hits");

let time = 30;
let hits = 0;
let size = 50;
let speed = 1000;
let timer;
let targetTimer;

// Переміщення мішені
function moveTarget() {
    let x = Math.random() * (arena.clientWidth - size);
    let y = Math.random() * (arena.clientHeight - size);

    target.style.left = x + "px";
    target.style.top = y + "px";
}

// Поява наступної мішені
function newTarget() {
    moveTarget();

    clearTimeout(targetTimer);

    targetTimer = setTimeout(function () {
        newTarget();
    }, speed);
}

// Початок гри
document.getElementById("start").onclick = function () {
    let difficulty = document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        size = 70;
        speed = 2000;
    }

    if (difficulty === "medium") {
        size = 50;
        speed = 1000;
    }

    if (difficulty === "hard") {
        size = 30;
        speed = 500;
    }

    target.style.width = size + "px";
    target.style.height = size + "px";

    time = 30;
    hits = 0;

    timeText.textContent = time;
    hitsText.textContent = hits;

    menu.classList.add("hidden");
    result.classList.add("hidden");
    game.classList.remove("hidden");

    clearInterval(timer);
    clearTimeout(targetTimer);

    newTarget();

    timer = setInterval(function () {
        time--;
        timeText.textContent = time;

        if (time === 0) {
            endGame();
        }
    }, 1000);
};

// Натискання на мішень
target.onclick = function () {
    hits++;
    hitsText.textContent = hits;
    newTarget();
};

// Завершення гри
function endGame() {
    clearInterval(timer);
    clearTimeout(targetTimer);

    let difficulty = document.getElementById("difficulty").value;
    let key = "aimRecord_" + difficulty;
    let record = Number(localStorage.getItem(key)) || 0;

    if (hits > record) {
        record = hits;
        
        setItem(key, record);
        document.getElementById("message").textContent = "Новий рекорд!";
    } else {
        document.getElementById("message").textContent = "";
    }

    document.getElementById("finalHits").textContent = hits;
    document.getElementById("record").textContent = record;

    game.classList.add("hidden");
    result.classList.remove("hidden");
}

// Повернення в меню
document.getElementById("home").onclick = function () {
    result.classList.add("hidden");
    menu.classList.remove("hidden");
    showRecord();
};

// Показ рекорду
function showRecord() {
    let difficulty = document.getElementById("difficulty").value;
    let record = localStorage.getItem("aimRecord_" + difficulty) || 0;

    document.getElementById("menuRecord").textContent = record;
}

document.getElementById("difficulty").onchange = showRecord;

showRecord();