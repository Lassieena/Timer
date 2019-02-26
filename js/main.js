'use strict';
const timer = document.getElementById('timer');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const reset = document.getElementById('reset');
const start = document.getElementById('start');
let startTime;
let timeLeft;
let timeToCountDown = 0;
let timerID;
let isRunning = false;

function updateTimer(t) {
  const d = new Date(t);
  let m = d.getMinutes();
  let s = d.getSeconds();
  let ms = d.getMilliseconds();
  m = ('0' + m).slice(-2);
  s = ('0' + s).slice(-2);
  ms = ('00' + ms).slice(-3);
  const timerString = m + ':' + s + '.' + ms;
  timer.textContent = timerString;
  document.title = timerString;
}

function countDown() {
  timerID = setTimeout(() => {
    timeLeft = timeToCountDown - (Date.now() - startTime);
    if(timeLeft < 0) {
      isRunning = false;
      start.textContent = 'Start';
      clearTimeout(timerID);
      timeLeft = 0;
      timeToCountDown = 0;
      updateTimer(timeLeft);
      return;
    }
    updateTimer(timeLeft);
    countDown();
  },10);
}

start.addEventListener('click', () => {
  if (isRunning === false) {
    isRunning = true;
    start.textContent = 'Stop';
    startTime = Date.now();
    countDown();
  } else {
    isRunning = false;
    start.textContent = 'Start';
    timeToCountDown = timeLeft;
    clearTimeout(timerID);
  }

});

min.addEventListener('click', () => {
  if (isRunning === true) return;
  timeToCountDown += 60 * 1000;
  if (timeToCountDown >= 60 * 60 * 1000) {
    timeToCountDown = 0;
  }
  updateTimer(timeToCountDown);
});

sec.addEventListener('click', () => {
  if (isRunning === true) return;
  timeToCountDown += 1000;
  if (timeToCountDown >= 60 * 60 * 1000) {
    timeToCountDown = 0;
  }
  updateTimer(timeToCountDown);
});

reset.addEventListener('click', () => {
  timeToCountDown = 0;
  updateTimer(timeToCountDown);
});
