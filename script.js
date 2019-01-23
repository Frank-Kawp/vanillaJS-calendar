const table = document.querySelector('.calendar-table');
const smallEventForm = document.querySelector('.small-event-form');
const bigEventForm = document.querySelector('.event-form');
const showSmallEventForm = document.querySelector('.add-event-button');
const closeSmallEventForm = document.querySelector('.close-small-form');
const closeBigEventForm = document.querySelector('.close-big-form');
const daysCells = document.querySelectorAll('td');
const prevMonth = document.querySelector('.prev-month');
const nextMonth = document.querySelector('.next-month');
const currentMonthHTML = document.querySelector('.current-month');
const currentYearHTML = document.querySelector('.current-year');

let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

// сформируем календарь, когда загружен HTML
document.addEventListener('DOMContentLoaded', () => {
  createCalendar(currentYear, currentMonth);
});

// добавляем маленькую форму (событие)
showSmallEventForm.addEventListener('click', (event) => {
  const coordsOnPage = getCoords(event.target);
  smallEventForm.style.top = coordsOnPage.top + 55 + 'px';
  smallEventForm.style.left = coordsOnPage.left + -200 + 'px';
  smallEventForm.classList.toggle('showform');
});

// скрываем маленькую форму (событие)
closeSmallEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  smallEventForm.classList.remove('showform');
});

// Показываем форму добавления события по клику на ячейке
table.addEventListener('click', (event) => {
  let target = event.target;

  while (target !== table) {
    if (target.tagName === 'TD') {
      // Показать рядом форму
      target.classList.add('colored-data');
      showBigEeventForm(target);
      return;
    }
    target = target.parentNode;
  }
});

// Скрываем форму добавления события
closeBigEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  bigEventForm.classList.remove('showform');
});

// отобразить предыдущий месяц
prevMonth.addEventListener('click', () => {
  const oldTds = document.querySelectorAll('td');
  const oldTdsArr = [].slice.call(oldTds);
  oldTdsArr.forEach(day => day.innerHTML = '');

  currentMonth -= 1;

  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear -= 1;
  }
  smallEventForm.classList.remove('showform');
  bigEventForm.classList.remove('showform');
  createCalendar(currentYear, currentMonth);
});

// отобразить следующий месяц
nextMonth.addEventListener('click', () => {
  const oldTds = document.querySelectorAll('td');
  const oldTdsArr = [].slice.call(oldTds);
  oldTdsArr.forEach(day => day.innerHTML = '');

  currentMonth += 1;

  if (currentMonth > 12) {
    currentMonth = 0;
    currentYear += 1;
  }
  smallEventForm.classList.remove('showform');
  bigEventForm.classList.remove('showform');
  createCalendar(currentYear, currentMonth);
})


// *** Вспомогательные функции ***
// получить координаты элемента относительно дкумента.
function getCoords(targetElement) {
  const box = targetElement.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  }
}

// Отобразить форму рядом с ячейкой
function showBigEeventForm(targetElement) {
  const coordsPage = getCoords(targetElement);
  const coordsWindow = targetElement.getBoundingClientRect();

  // ширина и высота окна формы
  const formWidth = bigEventForm.offsetWidth;
  const formHeight = bigEventForm.offsetHeight;

  // ширина и высота элемента target (td)
  const targetWidth = targetElement.offsetWidth;
  const targetHeight = targetElement.offsetHeight;

  // ширина и высота видимой части страницы
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;

  // показываем по умолчанию справа от ячейки + вниз
  bigEventForm.style.left = coordsPage.left - 50 + "px";
  bigEventForm.style.top = coordsPage.top + "px";
  bigEventForm.classList.add('showform');

  // если форма заходит правый край, меняем горизонтальную координату
  if (coordsWindow.left + targetWidth + formWidth > windowWidth) {
    // поменять положение указателя-треугольника
    bigEventForm.style.left = coordsPage.left - formWidth - 215 + "px";
  } 
}

// заполняем td's данными (начиная с текущего месяца)
function createCalendar(year, month) {
  let weekday = new Date(year, month - 1).getDay() - 1;
  weekday = weekday === -1 ? 0 : weekday;

  const daysInThisMonth = new Date(year, month, 0).getDate();
  let daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  for (let i = 0; i < 7; i += 1) {
    daysCells[i].innerHTML = getCurrentDay(i);
  }

  // заполнить текущий месяц.
  for (let i = weekday, d = 1; d <= daysInThisMonth; i += 1, d += 1) {
    if (daysCells[i] === undefined) break; // если выходим за рамки массива

    if (daysCells[i].innerHTML.length > 0) {
      daysCells[i].innerHTML += `, ${d}`;
    } else {
      daysCells[i].innerHTML = d;
    }
  }

  // заполнить предыдущий месяц.
  for (let i = weekday - 1; i >= 0; i -= 1) {
    if (daysCells[i].innerHTML.length > 0) {
      daysCells[i].innerHTML += `, ${daysInPrevMonth}`;
      daysInPrevMonth -= 1;
    } else {
      daysCells[i].innerHTML = daysInPrevMonth; 
      daysInPrevMonth -= 1;
    }
  }

  // заполнить след. месяц
  let filledDays = daysInThisMonth + weekday;
  if (filledDays < 35) {
    for (let i = filledDays, d = 1; i < 35; i += 1, d += 1) {
      daysCells[i].innerHTML = d;
    }
  }

  currentYearHTML.innerHTML = currentYear;
  currentMonthHTML.innerHTML = getMonth(currentMonth);
}

// Заполнитель дней недели
function getCurrentDay(num) {
  switch (num) {
    case 0:
      return 'Понедельник';
      break;
    
    case 1:
      return 'Вторник';
      break;

    case 2:
      return 'Среда';
      break;

    case 3:
      return 'Четверг';
      break;

    case 4:
      return 'Пятница';
      break;

    case 5:
      return 'Суббота';
      break;
    
    case 6:
      return 'Воскресенье';
      break;

    default:
      return undefined;
  }
}

// Вернуть название месяца по числу
function getMonth(num) {
  switch (num) {
    case 1:
      return 'Январь';
      break;
    
    case 2:
      return 'Февраль';
      break;

    case 3:
      return 'Март';
      break;

    case 4:
      return 'Апрель';
      break;

    case 5:
      return 'Май';
      break;

    case 6:
      return 'Июнь';
      break;
    
    case 7:
      return 'Июль';
      break;

    case 8:
      return 'Август';
      break;

    case 9:
      return 'Сентябрь';
      break;

    case 10:
      return 'Октябрь';
      break;

    case 11:
      return 'Ноябрь';
      break;

    case 12:
      return 'Декабрь';
      break;

    default:
      return undefined;
  }
}