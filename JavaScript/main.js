const timerDial = document.getElementById(`timerDial`);
const numberWorkingTomatoes = document.getElementById(`numberWorkingTomatoes`);
const tomatoesBeforeRest = document.getElementById(`tomatoesBeforeRest`);
const totalWorkingHours = document.getElementById(`totalWorkingHours`);
const totalRestTime = document.getElementById(`totalRestTime`);
const start = document.getElementById(`start`);
const pause = document.getElementById(`pause`);
const timerSettings = document.getElementById(`timerSettings`);
const timerSettingButton = document.getElementById(`timerSettingButton`);
const enteredWorkingHours = document.getElementById(`enteredWorkingHours`);
const enteredWorkingMinutes = document.getElementById(`enteredWorkingMinutes`);
const enteredShortRestHours = document.getElementById(`enteredShortRestHours`);
const enteredShortRestMinutes = document.getElementById(`enteredShortRestMinutes`);
const enteredLongRestHours = document.getElementById(`enteredLongRestHours`);
const enteredLongRestMinutes = document.getElementById(`enteredLongRestMinutes`);
const enteredNumberСycles = document.getElementById(`enteredNumberСycles`);
const accept = document.getElementById(`accept`);
const cancel = document.getElementById(`cancel`);

let countdown = {
    timer : null,  // Переменная для хранения setInterval
    work : true,  // Цикл работы или отдыха
    isRunning : false,  //  Состояние таймера
    workingTimeMminutes: 0,  // Время работы
    restTimeMminutes: 0,  // Время отдыха
    numberShortRest: 0,  // Короткий отдых по счету
    cyclesLongRest: 4,  // циклов до длинного отдыха
    numberTomatoes: 0,  // Количество помидоров
    numberСyclesObject : 4,  // Количестов циклов по умолчанию
    minuts: 0,  // Переменная для хранения минут
    seconds: 60,  // Переменная для хранения секунд
    workingHoursSecond : 1500,  // Длительность рабочего цикла по умолчанию 
    shortRestSecond : 300,  // Длительность короткого отдыха по умолчанию 
    longRestSecond : 2400,  // Длительность длинного отдыха по умолчанию 
    timeNow : 1500,  // Переменная для хранения оставшихся секунд текущего цикла 
    anonim: function( ) {  // Работа таймера
        timeUpdate(this.seconds);
        updatingTimerTime();
        if (Math.floor(this.timeNow) === 0) {
            checkingWorkStatus(this.work);
        }
    }
};


start.addEventListener(`click`, timerStart);  // Обработка клика по кнопке Старт
pause.addEventListener(`click`, timerPause);  // Обработка клика по кнопке Стоп
timerSettingButton.addEventListener(`click`,timerMenuVisibility); // Обработка клика по значку настройки (шестерёнка справа над таймером)
accept.addEventListener(`click`,saveTimerChanges);  // Обработка клика по кнопке Принять в меню настройки таймера


function checkingWorkStatus(workGlobal) {  // Проверяет состояние булевой переменной work и вызывает функцию смены режима таймера
    if (workGlobal) {
        totalWorkingHours.textContent = `${++countdown.workingTimeMminutes} минут`;
        countdown.numberShortRest++;
        countdown.work = false;
        if (countdown.numberShortRest === countdown.numberСyclesObject) {
            settingTimerMode(`long`);
        } else {
            settingTimerMode(`short`);
        }
    } else {
        settingTimerMode();
    }
}

function updatingTimerTime() {  // Вычет общего времени и секунд, визуальное обновление таймера
    countdown.timeNow--;
    countdown.seconds--;
    countdown.minuts = (countdown.timeNow / 60);
    timerDial.textContent = `${timeFormatting(Math.floor(countdown.minuts))} : ${timeFormatting(countdown.seconds)}`;
}

function timeFormatting(number) {  // Решает добавлять ноль перед числом или нет
    return number < 10 ? `0` + number : number;
}

function settingTimerMode(status = `work`) {  // Смена режима таймера
    switch (status) {
        case `work`:   // Рабочий 
            totalRestTime.textContent = `${++countdown.restTimeMminutes} минут`;
            countdown.work = true;
            countdown.timeNow = countdown.workingHoursSecond;
            break;
        case `long`:  // Длинный отдых
            numberWorkingTomatoes.textContent = `${++countdown.numberTomatoes}`;
            countdown.numberShortRest = 0;
            countdown.cyclesLongRest = countdown.numberСyclesObject;
            tomatoesBeforeRest.textContent = `${countdown.cyclesLongRest}`;
            countdown.timeNow = countdown.longRestSecond;
            break;
        case `short`:  // Короткий отдых
            numberWorkingTomatoes.textContent = `${++countdown.numberTomatoes}`;
            tomatoesBeforeRest.textContent = `${--countdown.cyclesLongRest}`;
            countdown.timeNow = countdown.shortRestSecond;
            break;
    }
    countdown.seconds = 60;
    countdown.anonim();
}

function timeUpdate(seconds) {  // Счётчик минут работы или отдыха 
    if (seconds === 0) {
        countdown.seconds = 60;
        if (countdown.work) {
            totalWorkingHours.textContent = `${++countdown.workingTimeMminutes} минут`;
        } else {
            totalRestTime.textContent = `${++countdown.restTimeMminutes} минут`;
        }
    }
}

function conversionSeconds(a,b) {  // Возвращает сумму часов и минут в секундах
    return (+a * 60 + +b) * 60;
}

function saveTimerChanges() {  // Сохранение настроек введённых пользователем через меню настройки (шестерёнка справа над таймером )
    countdown.workingHoursSecond = conversionSeconds(enteredWorkingHours.value,enteredWorkingMinutes.value);
    countdown.timeNow = countdown.workingHoursSecond;
    timerDial.textContent = `${timeFormatting(countdown.workingHoursSecond/60)} : 00`;
    
    countdown.shortRestSecond = conversionSeconds(enteredShortRestHours.value,enteredShortRestMinutes.value);

    countdown.longRestSecond = conversionSeconds(enteredLongRestHours.value,enteredLongRestMinutes.value);

    countdown.numberСyclesObject = +enteredNumberСycles.value;
    countdown.cyclesLongRest = +enteredNumberСycles.value;
    tomatoesBeforeRest.textContent = +enteredNumberСycles.value;

    timerMenuVisibility();
}

function timerMenuVisibility() {  // Показ или скрытие меню настройки (шестерёнка справа над таймером ) через класс none
    timerSettings.classList.toggle(`none`);
}

function timerStart() {
    if (!countdown.isRunning) {
        countdown.isRunning = true;
        countdown.timer = setInterval(countdown.anonim.bind(countdown), 10); // Привязка контекста к объекту countdow и запуск таймера
    }
}

function timerPause() {
    if (countdown.isRunning) {
        countdown.isRunning = false;
        clearInterval(countdown.timer); // Остановка таймера
    }
}