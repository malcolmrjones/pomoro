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
//# sourceMappingURL=main.js.map