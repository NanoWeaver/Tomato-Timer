let workingHoursMinut = 25;
let shortRestMinutes = 5;
let longRestMinutes = 40;
let isRunning = false;
let work = true;
let timer = null;
let countdown = {
    n: 0, // время работы
    b: 0, // время отдыха
    a: 0, // короткий отдых по счету
    c: 4, // циклов до длинного отдыха
    x: 0, // Количество помидоров
    minuts: 0,
    seconds: 60,
    workingHoursSecond : workingHoursMinut * 60,
    shortRestSecond : shortRestMinutes * 60,
    longRestSecond : longRestMinutes * 60,
    timeNow : workingHoursMinut * 60,
    anonim: function( ) {
        if (this.seconds == 0) {
            this.seconds = 60;
            if (work) {
                this.n++;
                totalWorkingHours.textContent = `${this.n} минут`;
            } else {
                this.b++;
                totalRestTime.textContent = `${this.b} минут`;
            }
        }
        console.log(`Секунды объекта до декремента ${this.seconds}`);
        this.timeNow--;
        this.seconds--;
        console.log(`Секунды объекта после декремента ${this.seconds}`);
        console.log(`так ${this.timeNow}`);
        this.minuts = (this.timeNow / 60);
        console.log(`так после ${this.timeNow}`);
        timerDial.textContent = `${Math.floor(this.minuts) < 10 ? `0` + Math.floor(this.minuts) : Math.floor(this.minuts)} : ${this.seconds < 10 ? `0` + this.seconds : this.seconds}`;
        if (Math.floor(this.timeNow) == 0) {
            console.log(`pizdec`);
            if (work) {
                this.n++;
                totalWorkingHours.textContent = `${this.n} минут`;
                this.a++;
                work = false;
                if (this.a == 4) {
                    this.x++;
                    numberWorkingTomatoes.textContent = `${this.x}`;
                    this.a = 0;
                    this.c = 4;
                    tomatoesBeforeRest.textContent = `${this.c}`;
                    countdown.timeNow = longRestMinutes * 60;
                    this.seconds = 60;
                    this.anonim();
                } else {
                    this.x++;
                    numberWorkingTomatoes.textContent = `${this.x}`;
                    this.c--;
                    tomatoesBeforeRest.textContent = `${this.c}`;
                    countdown.timeNow = shortRestMinutes * 60;
                    this.seconds = 60;
                    this.anonim();
                }
            } else {
                this.b++;
                totalRestTime.textContent = `${this.b} минут`;
                work = true;
                countdown.timeNow = workingHoursMinut * 60;
                this.seconds = 60;
                this.anonim();
            }
        }
    }
};

const timerDial = document.getElementById('timerDial');
const numberWorkingTomatoes = document.getElementById('numberWorkingTomatoes');
const tomatoesBeforeRest = document.getElementById('tomatoesBeforeRest');
const totalWorkingHours = document.getElementById('totalWorkingHours');
const totalRestTime = document.getElementById('totalRestTime');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const timerSettings = document.getElementById(`timerSettings`)
const timerSettingButton = document.getElementById(`timerSettingButton`)

start.addEventListener('click', timerStart);
pause.addEventListener('click', timerPause);
timerSettingButton.addEventListener(`click`,timerMenuVisibility);


function timerMenuVisibility() {
    timerSettings.classList.toggle(`none`);
}

function timerStart() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(countdown.anonim.bind(countdown), 1000); // Привязка контекста
    }
}

function timerPause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer); // Остановка интервала
    }
}
