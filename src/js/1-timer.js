import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datatePickerinput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDisplay = document.querySelector('.timer');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
startButton.disabled = true;
let userSelectedDate = null;


flatpickr( "#datetime-picker", {
    enableTime: true,
  time_24hr: true,
   dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      iziToast.show({
    message: 'Please choose a date in the future',
    backgroundColor: '#e57373',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    icon: 'icon-person',
    iconText: '\u2716',
    iconColor: 'red',
        })
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
} );

startButton.addEventListener('click', () => {

startButton.disabled = true;
datatePickerinput.disabled = true;

const timerInterval = setInterval(() => {
    const currentDate = new Date()
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0){
        clearInterval(timerInterval);
        daysDisplay.textContent = '00';
        hoursDisplay.textContent = '00';
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        datatePickerinput.disabled = false;
        startButton.disabled = false;
        iziToast.show({
    message: "Time's up!",
    backgroundColor: '#4caf50',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    icon: 'icon-person',
    iconText: '✔',
    iconColor: '#fff',
});
        return;
    }

updateTimerDisplay(timeDifference)

}, 1000 );

  function updateTimerDisplay(ms) {
const { days, hours, minutes, seconds } = convertMs(ms);
        daysDisplay.textContent = addLeadingZero(days);
        hoursDisplay.textContent = addLeadingZero(hours);
        minutesDisplay.textContent = addLeadingZero(minutes);
        secondsDisplay.textContent = addLeadingZero(seconds);
  }

});



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
