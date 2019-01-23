const table = document.querySelector('.calendar-table');
const smallEventForm = document.querySelector('.small-event-form');
const bigEventForm = document.querySelector('.event-form');
const showSmallEventForm = document.querySelector('.add-event-button');
const closeSmallEventForm = document.querySelector('.close-small-form');
const closeBigEventForm = document.querySelector('.close-big-form');

// добавляем маленькую форму
showSmallEventForm.addEventListener('click', (event) => {
  const coordsOnPage = getCoords(event.target);
  smallEventForm.style.top = coordsOnPage.top + 55 + 'px';
  smallEventForm.style.left = coordsOnPage.left + -200 + 'px';
  smallEventForm.classList.toggle('showform');
});

// скрываем маленькую форму
closeSmallEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  smallEventForm.classList.remove('showform');
});

// Вешаем событие на ячейки, чтобы показывать форму
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

// Скрываем большую форму
closeBigEventForm.addEventListener('click', (event) => {
  event.preventDefault();
  bigEventForm.classList.remove('showform');
});


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















// заполнить календарь фейковыми данными
const tds = document.querySelectorAll('td');

for (let i = 0; i < tds.length; i += 1) {
  if (tds[i].innerHTML.length > 0) {
    tds[i].innerHTML += `, ${i + 1}`;
  } else {
    tds[i].innerHTML = i + 1;
  }
}