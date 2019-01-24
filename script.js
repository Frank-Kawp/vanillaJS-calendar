const table = document.querySelector('.calendar-table');
const smallEventForm = document.querySelector('.small-event-form');
const bigEventForm = document.querySelector('.event-form');
const showSmallEventForm = document.querySelector('.add-event-button');
const closeSmallEventForm = document.querySelector('.close-small-form');
const closeBigEventForm = document.querySelector('.close-big-form');
const daysCells = document.querySelectorAll('td');
const prevMonth = document.querySelector('.prev-month');
const nextMonth = document.querySelector('.next-month');
const rejectEventButton = document.querySelector('.reject-event');
const currentMonthHTML = document.querySelector('.current-month');
const currentYearHTML = document.querySelector('.current-year');

let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();
let currentTD;


document.addEventListener('DOMContentLoaded', () => {
  createCalendar(currentYear, currentMonth);
});

// заглушка
bigEventForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bigEventForm.classList.remove('showform');
  currentTD.classList.remove('colored-data');
});

// заглушка
rejectEventButton.addEventListener('click', (event) => {
  bigEventForm.classList.remove('showform');
  currentTD.classList.remove('colored-data');
});


showSmallEventForm.addEventListener('click', (event) => {
  bigEventForm.classList.remove('showform');

  const coordsOnPage = getCoords(event.target);
  smallEventForm.style.top = coordsOnPage.top + 55 + 'px';
  smallEventForm.style.left = coordsOnPage.left + -200 + 'px';
  smallEventForm.classList.toggle('showform');
});

closeSmallEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  smallEventForm.classList.remove('showform');
});


table.addEventListener('click', (event) => {
  let target = event.target;
  smallEventForm.classList.remove('showform');

  while (target !== table) {
    if (target.tagName === 'TD') {
      
      // убрать подсветку с предыдущей ячейки
      if (currentTD && currentTD.classList.contains('colored-data')) {
        currentTD.classList.remove('colored-data');
      }

      currentTD = target;
      
      // Показать рядом форму
      target.classList.add('colored-data');
      showBigEeventForm(target);
      return;
    }
    target = target.parentNode;
  }
});

closeBigEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  bigEventForm.classList.remove('showform');
  currentTD.classList.remove('colored-data');
});

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

// получить координаты элемента относительно дкумента.
function getCoords(targetElement) {
  const box = targetElement.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  }
}

function showBigEeventForm(targetElement) {
  changeTrianglePosition('left');

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
    changeTrianglePosition('right');
    bigEventForm.style.left = coordsPage.left - formWidth - 215 + "px";
  } 
}

function changeTrianglePosition(position) {
  const oldlink = document.getElementsByTagName("link").item(1);
  const newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  if (position === 'left') {
    newlink.setAttribute("href", "triangle-left.css");
  } else {
    newlink.setAttribute("href", "triangle-right.css");
  }
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

// заполняем td's данными (начиная с текущего месяца)
function createCalendar(year, month) {
  const date = new Date(year, month - 1);

  let weekday = date.getDay() - 1;
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
  let m = date.toLocaleString("ru", { month: "long" });
  currentMonthHTML.innerHTML = m[0].toUpperCase() + m.slice(1);
}

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
