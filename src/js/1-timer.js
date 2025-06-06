import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const datatePickerinput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDisplay = document.querySelector('.timer');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const currentDate = new Date();
startButton.disabled = true;
let userSelectedDate = null;


flatpickr( "#datetime-picker", {
    enableTime: true,
  time_24hr: true,
   dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < currentDate) {
      window.alert("Please choose a date in the future");
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
        timerDisplay.textContent = "Time's up!"
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
