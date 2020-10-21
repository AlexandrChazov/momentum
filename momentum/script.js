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




//вызываем функции времени
getName();
getFocus();
show_greting();
setDay();
setTime();

