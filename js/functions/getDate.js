const week = document.querySelector('.week');
const week_array = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const month_array = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

const getDate = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();

  week.innerHTML = `${week_array[dayOfWeek]}<span>, </span>${day}<span> </span>${month_array[month]}`;
  setTimeout(getDate, 60000);
}

export default getDate;
