import getQuote from "./functions/getQuote.js";
import getWeather from "./functions/getWeather.js";
import getDate from "./functions/getDate.js";

const userName = document.querySelector('.userName');
const focus = document.querySelector('.focus');
const wrapper = document.querySelector(".wrapper");
const prev_button = document.getElementById('back_button');
const next_button = document.getElementById('next_button');
const city = document.querySelector('.city');
const greeting = document.querySelector('.greeting');
const time = document.querySelector('.time');
const timeOfDay = ['morning','day','evening','night'];
let folderName = "";
let photoNumber = Math.floor(1 + Math.random() * 20);

//Выводим на экран время-------------------

const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  if (min === 0 && sec === 0) {
    showGretingAndImage();
  };
  setTimeout(getTime, 1000);
}

function addZero(x) {      //Добавляем ноль к числу меньше 10
  return x < 10
    ? x = '0'+ x
    : x
}

//Выводим на экран приветствие и фоновую картинку--------------------

const showGretingAndImage = () => {
  const date = new Date();
  const hour = date.getHours();
    photoNumber = Math.floor(1 + Math.random() * 20);

  if (hour<6) {
    greeting.innerHTML = 'Доброй ночи,';
    folderName = timeOfDay[3];
    wrapper.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else
  if (hour<12) {
    greeting.innerHTML = 'Доброе утро,';
    folderName = timeOfDay[0];
    wrapper.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else
  if (hour<18) {
    greeting.innerHTML = 'Добрый день,';
    folderName = timeOfDay[1];
    wrapper.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else
  if (hour<24) {
    greeting.innerHTML = 'Добрый вечер,';
    folderName = timeOfDay[2];
    wrapper.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  }
}

//кнопки смены фонового изображения--------------------------------------------

const changeImage = (folderName) => {
  let img = document.createElement('img');    // фоновое изображение не меняется пока не прогрузится картинка
  img.src = `./assets/images/${folderName}/${photoNumber}.jpg`;
  img.onload = () => {
    wrapper.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  }
}

prev_button.addEventListener('click', function() {
  photoNumber--;
  if (photoNumber < 1) {
    photoNumber = 20;
    var index = timeOfDay.indexOf(folderName)-1;
    if (index < 0) {
      folderName = 'night';
    } else {
      folderName = timeOfDay[index];
    }
  };

  prev_button.disabled = true;
  setTimeout(function() {
    prev_button.disabled = false
  }, 2000);

  changeImage(folderName);
})

next_button.addEventListener('click', function() {
  photoNumber++;
  if (photoNumber > 20) {
    photoNumber = 1;
    var index = timeOfDay.indexOf(folderName)+1;
    if (index > 3) {
      folderName = 'morning';
    } else {
      folderName = timeOfDay[index];
    }
  };

  next_button.disabled = true;
  setTimeout(function() {
    next_button.disabled = false
  }, 2000);

  changeImage(folderName);
})

//Ввод имени и цели--------------------------------------------------------------

const getName = () => {
  localStorage.getItem('userName') === null
    ? userName.textContent = 'Укажите ваше имя'
    : userName.textContent = localStorage.getItem('userName')
}

const getFocus = () => {
  localStorage.getItem('focus') === null
    ? focus.textContent = 'Задайте цель'
    : focus.textContent = localStorage.getItem('focus')
}

const setName = (event) => {
  if (event.keyCode === 13) {
    if (userName.innerText !== '') {
      localStorage.setItem('userName', userName.innerText);
    }
    userName.blur();
  }
}

const setFocus = (event) => {
  if (event.keyCode === 13) {
    if (focus.innerText !== '') {
      localStorage.setItem('focus', focus.innerText);
    }
    focus.blur();
  }
}

userName.addEventListener('focus', () => {userName.textContent = ''})
userName.addEventListener('blur', getName)
userName.addEventListener('keypress', setName);

focus.addEventListener('focus', () => {focus.textContent = ''})
focus.addEventListener('blur', getFocus)
focus.addEventListener('keypress', setFocus);

//Вводим название города--------------------------------------------------------------------------------------

function setCity(event) {
  if (event.keyCode === 13) {
    if (city.innerText !== '') {
      localStorage.setItem('city', city.innerText);
    }
      city.textContent = localStorage.getItem('city');
      getWeather();
      city.blur();
  }
}

city.addEventListener('focus', () => {city.textContent = ''});
city.addEventListener('keypress', setCity);
city.addEventListener('blur', function() {
  localStorage.getItem('city')
    ? city.textContent = localStorage.getItem('city')
    : city.textContent = "Минск"
});

if (localStorage.getItem('city')) {
  city.textContent = localStorage.getItem('city');
}

getName();
getFocus();
getDate();
getTime();
showGretingAndImage();
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
