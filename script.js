const WORK = 25 * 60;
const BREAK = 5 * 60;

let mode = "work";
let duration = WORK;
let endTime = null;
let timer = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");

function update() {
  const diff = endTime - Date.now();
  const remain = Math.max(0, Math.ceil(diff / 1000));

  const min = String(Math.floor(remain / 60)).padStart(2, "0");
  const sec = String(remain % 60).padStart(2, "0");
  timeEl.textContent = `${min}:${sec}`;

  if (remain === 0) {
    finish();
  }
}

function start() {
    if (timer) return;

    endTime = Date.now() + duration * 1000;
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("mode", mode);

    update();
    timer = setInterval(update, 1000);
}

function finish() {
    clearInterval(timer);
    timer = null;

    notify();

    if (mode === "work") {
        mode = "break";
        duration = BREAK;
        modeEl.textContent = "休憩";
    } else {
        mode = "work";
        duration = WORK;
        modeEl.textContent = "作業";
    }

    start();
}

function notify() {
    if (Notification.permission === "granted") {
        new Notification("ポモドーロ終了");
    }
}

document.getElementById("start").onclick = start;
document.getElementById("reset").onclick = reset;

// 復元
const saveEnd = localStorage.getItem("endTime");
if (saveEnd) {
    endTime = Number(savedEnd);
    mode = localStorage.getItem("mode");
    duration = Math.floor((endTime - Date.now()) / 1000);
    timer = setInterval(update, 1000);
}

Notification.requestPermission();