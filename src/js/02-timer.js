import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  flatPickr: document.querySelector('input#datetime-picker'),
  inputStart: document.querySelector('button[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.inputStart.setAttribute('disabled', false);

let numberTimeCalendar = null;
let currentHour = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    numberTimeCalendar = selectedDates[0].getTime();
    currentHour = options.defaultDate.getTime();
    if (currentHour > numberTimeCalendar) {
      Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
    } else {
      refs.inputStart.removeAttribute('disabled');
    }

    // windowAlert(numberTimeCalendar);
  },
};

// function windowAlert(numberTimeCalendar) {
//   // console.log('теперішній', currentHour);
//   // console.log('вибрана', numberTimeCalendar);
//   // console.log(Number(currentHour) > Number(numberTimeCalendar));
//   currentHour = options.defaultDate.getTime();
//   numberTime = selectedDates[0].getTime();
//   if (currentHour < numberTime) {
//     Notify.failure('Please choose a date in the future', {
//       timeout: 3000,
//     });
//   } else {
//     refs.inputStart.removeAttribute('disabled');
//   }
// }

flatpickr(refs.flatPickr, options, {
  allowInput: true,
  dateFormat: 'm/d/Y',
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
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

refs.inputStart.addEventListener('click', onStart);

function onStart() {
  refs.flatPickr.setAttribute('disabled', false);
  refs.inputStart.setAttribute('disabled', false);
  const timer = {
    start() {
      const timerId = setInterval(() => {
        currentHour = new Date().getTime();
        const differenceTime = numberTimeCalendar - currentHour;
        if (currentHour <= numberTimeCalendar) {
          const { days, hours, minutes, seconds } = convertMs(differenceTime);
          onUpdateSpanCalendar(days, hours, minutes, seconds);
        } else {
          clearInterval(timerId);
          console.log('Timer Stopped');
          return;
        }
      }, 1000);
    },
  };
  timer.start();
}

function onUpdateSpanCalendar(days, hours, minutes, seconds) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
}
