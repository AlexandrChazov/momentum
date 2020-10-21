let time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    week = document.querySelector('.week'),
    week_array = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    month_array = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    body = document.querySelector("body"),
    photoNumber = Math.floor(1 + Math.random() * 20),
    timeOfDay = "";
    console.log(photoNumber);

function setTime() {
  let date = new Date(),
      hour = date.getHours(),
       min = date.getMinutes(),
       sec = date.getSeconds();
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  if (min === 0) {
    show_greting()
  };
  setTimeout(setTime, 1000); //встроеная функция, она вызывает другую функцию через определённое кол-во милисекунд 
}
//Добавляем ноль к числу меньше 10
function addZero(x) {
 return x < 10 ? x = '0'+ x : x
}

//Выводим на экран день недели число и месяц
function setDay() {
    let date = new Date(),
    dayOfWeek = date.getDay(),
    day = date.getDate(),
    month = date.getMonth();
    week.innerHTML = `${week_array[dayOfWeek]}<span>, </span>${day}<span> </span>${month_array[month]}`;
    setTimeout(setDay, 60000);
}

//Выводим приветствие и Фоновое изображение-------------------------------------
//------------------------------------------------------------------------------
function show_greting() {
  let date = new Date(),
      hour = date.getHours();

  if (hour<6) {
    timeOfDay = "night";
    greeting.innerHTML = 'Доброй ночи,';
    body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
  } else 
  if (hour<12) {
    timeOfDay = "morning";
    greeting.innerHTML = 'Доброе утро,';
    body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
  } else
  if (hour<18) {
    timeOfDay = "day";
    greeting.innerHTML = 'Добрый день,';
    body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
  } else
  if (hour<24) {
    timeOfDay = "evening";
    greeting.innerHTML = 'Добрый вечер,';
    body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
  }
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


name.addEventListener('focus', function() {
   name.innerHTML = ''; 
})

name.addEventListener('blur', function() {
  name.innerHTML = 'Укажите Ваше имя'; 
})

focus.addEventListener('focus', function() {
  focus.innerHTML = ''; 
})

focus.addEventListener('blur', function() {
  focus.innerHTML = 'Задайте цель'; 
})

//кнопки смены фонового изображения--------------------------------------------
//-----------------------------------------------------------------------------
back_button.addEventListener('click', function() {
  photoNumber--;
  if (photoNumber < 1) {
    photoNumber=20
  };
  body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
})

ahead_button.addEventListener('click', function() {
  photoNumber++;
  if (photoNumber >20) {
    photoNumber = 1
  };
  body.style.backgroundImage = `url(./assets/images/${timeOfDay}/${photoNumber}.jpg)`;
})
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//вызываем функции времени
show_greting();
setDay();
setTime();

