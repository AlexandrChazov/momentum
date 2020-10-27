let time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    week = document.querySelector('.week'),
    week_array = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    month_array = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    body = document.querySelector("body"),
    photoNumber = Math.floor(1 + Math.random() * 20),
    timeOfDay = ['morning','day','evening','night'],
    folderName = "";



//Выводим на экран время--------------------------------------------------------
//------------------------------------------------------------------------------
function setTime() {
  let date = new Date(),
      hour = date.getHours(),
       min = date.getMinutes(),
       sec = date.getSeconds();
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  if (min === 0 && sec === 0) {
    show_greting()
  };
  setTimeout(setTime, 1000); //встроеная функция, она вызывает другую функцию через определённое кол-во милисекунд 
}

function addZero(x) {           //Добавляем ноль к числу меньше 10
 return x < 10 ? x = '0'+ x : x
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



//Выводим на экран день недели число и месяц------------------------------------------
//------------------------------------------------------------------------------
function setDay() {
    let date = new Date(),
    dayOfWeek = date.getDay(),
    day = date.getDate(),
    month = date.getMonth();
    week.innerHTML = `${week_array[dayOfWeek]}<span>, </span>${day}<span> </span>${month_array[month]}`;
    setTimeout(setDay, 60000);
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



//Выводим приветствие и Фоновое изображение-------------------------------------
//------------------------------------------------------------------------------
function show_greting() {
  let date = new Date(),
      hour = date.getHours();
      photoNumber = Math.floor(1 + Math.random() * 20);

  if (hour<6) {
    greeting.innerHTML = 'Доброй ночи,';
    folderName = timeOfDay[3];
    body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else 
  if (hour<12) {
    greeting.innerHTML = 'Доброе утро,';
    folderName = timeOfDay[0];
    body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else
  if (hour<18) {
    greeting.innerHTML = 'Добрый день,';
    folderName = timeOfDay[1];
    body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  } else
  if (hour<24) {
    greeting.innerHTML = 'Добрый вечер,';
    folderName = timeOfDay[2];
    body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
  }
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//Очистка имени и цели----------------------------------------------------------
//------------------------------------------------------------------------------
name.addEventListener('focus', function() {
   name.textContent = ''; 
})

name.addEventListener('blur', function() {
  name.textContent = localStorage.getItem('name'); 
})

focus.addEventListener('focus', function() {
  focus.textContent = ''; 
})

focus.addEventListener('blur', function() {
  focus.textContent = localStorage.getItem('focus'); 
})
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



//кнопки смены фонового изображения--------------------------------------------
//-----------------------------------------------------------------------------
back_button.addEventListener('click', function() {
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
  body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
})

ahead_button.addEventListener('click', function() {
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

  body.style.backgroundImage = `url(./assets/images/${folderName}/${photoNumber}.jpg)`;
})
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------



//Ввод имени и цели--------------------------------------------------------------
//-------------------------------------------------------------------------------
getName = () => {
  localStorage.getItem('name') === null ? name.textContent = 'Укажите ваше имя' : 
                                          name.textContent = localStorage.getItem('name')
}

getFocus = () => {
  localStorage.getItem('focus') === null ? focus.textContent = 'Задайте цель' : 
                                           focus.textContent = localStorage.getItem('focus')
}

setName = (event) => {
 if (event.keyCode === 13) {
    if (name.innerText !== '') {
      localStorage.setItem('name', name.innerText);
    }
    name.blur();
 }
}

setFocus = (event) => {
  if (event.keyCode === 13) {
    if (focus.innerText !== '') {
      localStorage.setItem('focus', focus.innerText);
    }
    focus.blur();
 }
}

name.addEventListener('keypress', setName);
focus.addEventListener('keypress', setFocus);
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//Погода--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
      alert('Название города указано не верно')
      city.textContent = 'Введите название вашего города';
      localStorage.setItem('city', 'Ваш город');
      weatherDescription.textContent = '';
      wind.textContent = '';
      temperature.textContent = '';
      humidity.textContent = '';
      wind.textContent = '';
      weatherIcon.classList.add('hide');

      exit();
    }
  
  
  weatherIcon.classList.remove('hide');
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherIcon.classList.add(`owf-5x`); //большие иконки
  temperature.textContent = `Температура воздуха ${data.main.temp} °C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Относительная влажность ${data.main.humidity} %`;
  wind.textContent = `Скорость ветра ${data.wind.speed} м/с`;
}
  

function setCity(event) {
  if (event.keyCode === 13) {
    
    if (city.innerText !== '') {                         // запоминаем город
      localStorage.setItem('city', city.innerText);
      
    }
      city.textContent = localStorage.getItem('city');
      getWeather();
      city.blur();
  }
}

if (localStorage.getItem('city')) {
    city.textContent = localStorage.getItem('city');   // если в памяти уже присутствует город, то 
}                                                      // выводим название города на экран


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

getWeather()



city.addEventListener('focus', function() {    //Очистка названия города
  city.textContent = ''; 
});

city.addEventListener('blur', function() {
  city.textContent = localStorage.getItem('city');  
});



//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


//вызываем функции времени
getName();
getFocus();
show_greting();
setDay();
setTime();

