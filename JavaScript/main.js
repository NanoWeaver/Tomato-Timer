let workingHoursMinut = 25;
let isRunning = false;
let work = true;


const timerDial = document.getElementById('timerDial');
const numberWorkingTomatoes = document.getElementById(`numberWorkingTomatoes`);
const tomatoesBeforeRest = document.getElementById(`tomatoesBeforeRest`);
const totalWorkingHours = document.getElementById('totalWorkingHours');
const totalRestTime = document.getElementById(`totalRestTime`);
const start = document.getElementById(`start`);
const pause = document.getElementById(`pause`);


start.addEventListener(`click`,timerStart);
// pause.addEventListener(`click`,timerPause);

function timerStart() {
    if (!isRunning) {
        isRunning = true;
        countdown();
    };
};

function countdown() {
    let n = 0;
    let b = 0;
    let a = 0; // короткий отдых по счету
    let c = 4; // циклов до длинного отдыха
    let x = 0; // Количество помидоров
    let minuts = workingHoursMinut;
    let ollSeconds = minuts * 60;
    let seconds = 60;
    console.log(`тик`);
    setInterval(anonim,10);

    function anonim(ollSeconds = minuts * 60) {
        ollSeconds--;
        seconds--;
        console.log(`так ${ollSeconds}`);
        minuts = (ollSeconds / 60);
        console.log(`так после ${ollSeconds}`);
        if (seconds == -1) {
            seconds = 59;
            if (work) {
                n++;
                totalWorkingHours.textContent =  `${n} минут`;
            } else {
                b++;
                totalRestTime.textContent = `${b} минут`
            }
        };
        timerDial.textContent = `${Math.floor(minuts) < 10 ? `0` + Math.floor(minuts) : Math.floor(minuts)} : ${seconds < 10 ? `0` + seconds : seconds}`;
        if (Math.floor(ollSeconds) == 0) {
            console.log(`pizdec`);
            if (work) {
                work = false;
                a++;
                if (a == 4) {
                x++;
                numberWorkingTomatoes.textContent = `${x}`;
                a = 0;
                c = 4;
                tomatoesBeforeRest.textContent = `${c}`;
                anonim(2400);
                    
                } else {
                    x++;
                numberWorkingTomatoes.textContent = `${x}`;
                c--;
                tomatoesBeforeRest.textContent = `${c}`;
                anonim(300);
                };
            } else {
                work = true;
                minuts = workingHoursMinut;
                
                anonim();
               
            }
        };
    };
}