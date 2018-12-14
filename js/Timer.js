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
//# sourceMappingURL=Timer.js.map