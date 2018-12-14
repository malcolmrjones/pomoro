(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(setSec) {
        this.timerID = 0;
        this.timerSeconds = setSec;
        this.timerDefaultSeconds = setSec;
        this.timerMinutesElement = document.getElementById("TIMER-MIN");
        this.timerSecondsElement = document.getElementById("TIMER-SEC");
        this.timerCanvasElement = document.getElementById("CANVAS-TIMER");
        this.timerCanvasElement.width = this.timerCanvasElement.parentElement.clientWidth;
        this.timerCanvasElement.height = this.timerCanvasElement.parentElement.clientHeight;
        this.displayTime();
        this.draw();
    }
    start() {
        let timer = this;
        this.timerID = window.setInterval(function () {
            if (timer.timerSeconds > 0) {
                timer.timerSeconds -= 1;
            }
            else {
                timer.stop();
            }
            timer.displayTime();
        }, 1000);
    }
    displayTime() {
        let timer = this;
        let minutes = Math.trunc(timer.timerSeconds / 60);
        let secondsRemaining = (timer.timerSeconds % 60);
        let minutesStr;
        let secondsStr;
        if (minutes < 10) {
            minutesStr = "0" + minutes;
        }
        else {
            minutesStr = "" + minutes;
        }
        if (secondsRemaining < 10) {
            secondsStr = "0" + secondsRemaining;
        }
        else {
            secondsStr = "" + secondsRemaining;
        }
        timer.timerMinutesElement.innerHTML = minutesStr;
        timer.timerSecondsElement.innerHTML = secondsStr;
        this.draw();
    }
    stop() {
        window.clearInterval(this.timerID);
    }
    setTime(seconds) {
        this.timerSeconds = seconds;
        this.timerDefaultSeconds = seconds;
        this.displayTime();
    }
    reset() {
        this.stop();
        this.timerSeconds = this.timerDefaultSeconds;
        this.displayTime();
    }
    draw() {
        this.timerCanvasElement.width = this.timerCanvasElement.parentElement.clientWidth;
        this.timerCanvasElement.height = this.timerCanvasElement.parentElement.clientHeight;
        let lineY = this.timerMinutesElement.offsetTop + this.timerMinutesElement.clientHeight;
        let lineX = this.timerMinutesElement.offsetLeft;
        let arcX = 0;
        let arcY = 0;
        var ctx = this.timerCanvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.timerCanvasElement.width, this.timerCanvasElement.height);
        /* MINUTES ARC */
        let x = this.timerCanvasElement.clientWidth / 2;
        let y = this.timerCanvasElement.clientHeight / 2;
        let radius = this.timerMinutesElement.parentElement.clientWidth * 0.70;
        let startAngle = -(Math.PI / 2);
        let endAngle = -(-startAngle + (2 * Math.PI) * (this.timerSeconds / this.timerDefaultSeconds));
        let anticlockwise = true;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#555555";
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, startAngle + (2 * Math.PI), anticlockwise);
        ctx.stroke();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.stroke();
    }
}
exports.Timer = Timer;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimerController {
    static start(timer) {
        timer.start();
    }
    static stop(timer) {
        timer.stop();
    }
    static reset(timer) {
        timer.reset();
    }
}
exports.TimerController = TimerController;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timer_1 = require("./Timer");
const TimerController_1 = require("./TimerController");
if (localStorage["POMODORO"] == undefined) {
    localStorage["POMODORO"] = "25";
}
if (localStorage["SHORTBREAK"] == undefined) {
    localStorage["SHORTBREAK"] = "5";
}
if (localStorage["LONGBREAK"] == undefined) {
    localStorage["LONGBREAK"] = "10";
}
let POMODOROTIME = minutesToSeconds(localStorage["POMODORO"]);
let SHORTBREAKTIME = minutesToSeconds(localStorage["SHORTBREAK"]);
let LONGBREAKTIME = minutesToSeconds(localStorage["LONGBREAK"]);
let timer = new Timer_1.Timer(POMODOROTIME);
let btnStart = document.getElementById("BTN-START");
let btnStop = document.getElementById("BTN-STOP");
let btnReset = document.getElementById("BTN-RESET");
let btnSettings = document.getElementById("BTN-SETTINGS");
let btnPomodoro = document.getElementById("BTN-POMODORO");
let btnShortBreak = document.getElementById("BTN-SHORTBREAK");
let btnLongBreak = document.getElementById("BTN-LONGBREAK");
window.onresize = function (event) {
    timer.draw();
};
/***************************** TIMER CONTROLS ********************************* */
btnStart.onclick = function () {
    TimerController_1.TimerController.start(timer);
};
btnStop.onclick = function () {
    TimerController_1.TimerController.stop(timer);
};
btnReset.onclick = function () {
    TimerController_1.TimerController.reset(timer);
};
btnSettings.onclick = function () {
    let modalSettings = document.getElementById("MODAL-SETTINGS");
    let pomodoroField = document.forms["settings"]["pomodoro"];
    let shortbreakField = document.forms["settings"]["shortbreak"];
    let longbreakField = document.forms["settings"]["longbreak"];
    if (modalSettings.style.visibility == "hidden") {
        modalSettings.style.visibility = "visible";
        pomodoroField.value = secondsToMinutes(POMODOROTIME);
        shortbreakField.value = secondsToMinutes(SHORTBREAKTIME);
        longbreakField.value = secondsToMinutes(LONGBREAKTIME);
    }
    else {
        modalSettings.style.visibility = "hidden";
    }
};
document.getElementById("MODAL-CLOSE").onclick = function () {
    let modalSettings = document.getElementById("MODAL-SETTINGS");
    modalSettings.style.visibility = "hidden";
};
document.forms["settings"]["save"].onclick = function () {
    let pomodoroField = document.forms["settings"]["pomodoro"];
    let shortbreakField = document.forms["settings"]["shortbreak"];
    let longbreakField = document.forms["settings"]["longbreak"];
    POMODOROTIME = minutesToSeconds(pomodoroField.value);
    SHORTBREAKTIME = minutesToSeconds(shortbreakField.value);
    LONGBREAKTIME = minutesToSeconds(longbreakField.value);
    localStorage["POMODORO"] = secondsToMinutes(POMODOROTIME);
    localStorage["SHORTBREAK"] = secondsToMinutes(SHORTBREAKTIME);
    localStorage["LONGBREAK"] = secondsToMinutes(LONGBREAKTIME);
    timer.setTime(POMODOROTIME);
    document.getElementById("SETTINGS-NOTIFICATION").innerHTML = "Setting time to pomodoro time " + secondsToMinutes(POMODOROTIME) + " MINS";
};
/***************************** ************** ********************************* */
/*****************************  POMODORO/BREAK CONTROLS ************************ */
btnPomodoro.onclick = function () {
    timer.stop();
    timer.setTime(POMODOROTIME);
};
btnShortBreak.onclick = function () {
    timer.stop();
    timer.setTime(SHORTBREAKTIME);
};
btnLongBreak.onclick = function () {
    timer.stop();
    timer.setTime(LONGBREAKTIME);
};
/***************************** ************************* *********************** */
function minutesToSeconds(minutes) {
    return 60 * minutes;
}
function secondsToMinutes(seconds) {
    return Math.trunc(seconds / 60);
}

},{"./Timer":1,"./TimerController":2}]},{},[3]);
