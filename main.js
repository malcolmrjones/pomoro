var alarm_sound = new Audio('assets/alarmsound.mp3');
var start_sound = new Audio('assets/tone1-sound.mp3');

Vue.prototype.$timerID = 0;
Vue.prototype.$resetTime = 0;

initPomodoroTimes();

var app = new Vue({
    el: '#APP',
    data: {
        timer_active: false,
        show_settings_modal: false,
        seconds: localStorage.pomodoro
    },
    created: function() {
        this.$resetTime = this.seconds;
    },
    methods: {
 
        startTimer: function () {
            app.timer_active = true;
            start_sound.play();
            
            if(app.seconds == 0) {
                app.stopTimer();
                return;
            }

            this.$timerID = setInterval(function () { 

                if(app.seconds <= 0) {
                    app.stopTimer();
                    alarm_sound.play();
                    return;
                } 

                app.seconds -= 1;
            }, 1000);
        },

        stopTimer: function() {
            app.timer_active = false;
            clearInterval(this.$timerID);            
        },

        resetTimer: function() {
            app.seconds = this.$resetTime;
        },

        changeTime: function(mode) {
            
            app.stopTimer();

            if(mode == 1) {
                app.seconds = localStorage.pomodoro;
            }
            else if(mode == 2) {
                app.seconds = localStorage.shortbreak;
            }
            else if(mode == 3) {
                app.seconds = localStorage.longbreak;
            }

            this.$resetTime = app.seconds;

        },

        openSettings: function() {
            app.show_settings_modal = true;
            Vue.nextTick(function() {
                document.forms["settings"]["pomodoro"].value = Math.floor(localStorage.pomodoro / 60);
                document.forms["settings"]["shortbreak"].value = Math.floor(localStorage.shortbreak / 60);
                document.forms["settings"]["longbreak"].value = Math.floor(localStorage.longbreak / 60);           
                
                document.forms["settings"]["save"].onclick = function () {
                    localStorage.pomodoro = document.forms["settings"]["pomodoro"].value * 60;
                    localStorage.shortbreak = document.forms["settings"]["shortbreak"].value * 60;
                    localStorage.longbreak = document.forms["settings"]["longbreak"].value * 60;
                    app.changeTime(1);
                    app.show_settings_modal = false;
                };

                document.forms["settings"]["cancel"].onclick = function () {
                    app.show_settings_modal = false;
                };
            });
        }
    }

});

function initPomodoroTimes() {
    if(!localStorage.pomodoro) localStorage.pomodoro = 25 * 60;
    if(!localStorage.shortbreak) localStorage.shortbreak = 5 * 60;
    if(!localStorage.longbreak) localStorage.longbreak = 10 * 60;
}

