const WORK = 25 * 60;
const BREAK = 5 * 60;

let mode = "work";
let duration = WORK;
let endTime = null;
let remaining = null;
let timer = null;
let paused = false;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const startBtn = document.getElementById("start")
const resetBtn = document.getElementById("reset")

function updateDisplay(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    timeEl.textContent = `${min}:${sec}`;
}

function update() {
  const remain = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
  updateDisplay(remain);

  if (remain === 0) finish();
}

function start() {
    if (timer) return;

    if (paused && remaining !== null) {
        endTime = Date.now() + remaining * 1000;
    } else {
        remaining = duration;
        endTime = Date.now() + duration * 1000;
    }

    paused = false;
    startBtn.textContent = "一時停止";

    update();
    timer = setInterval(update, 1000);
}

function pause() {
    if (!timer) return;

    clearInterval(timer);
    timer = null;

    remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    paused = true;
    startBtn.textContent = "再開";
}

startBtn.onclick = () => {
    if (timer) {
        pause();
    } else {
        start();
    }
};

function finish() {
    clearInterval(timer);
    timer = null;

    alert("終了");

    mode = mode === "work" ? "break" : "work";
    duration = mode === "work" ? WORK : BREAK;
    modeEl.textContent = mode === "work" ? "作業" : "休憩";

    paused = false;
    remaining = null;
    start();
}

function reset() {
    clearInterval(timer);
    timer = null;

    mode = "work";
    duration = WORK;
    remaining = null;
    paused = false;

    startBtn.textContent = "スタート";
    modeEl.textContent = "作業";
    updateDisplay(WORK);

    localStorage.clear();
}

resetBtn.onclick = reset;

updateDisplay(WORK);

Notification.requestPermission();