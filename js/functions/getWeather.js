const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '404') {
    alert('Название города указано не верно')
    city.textContent = 'Введите название города';
    localStorage.setItem('city', '');
    weatherDescription.textContent = '';
    wind.textContent = '';
    temperature.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
    weatherIcon.classList.add('hide');
    // exit();
  }

  weatherIcon.classList.remove('hide');
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherIcon.classList.add(`owf-5x`); //большие иконки
  temperature.textContent = `Температура воздуха ${data.main.temp} °C`;
  weatherDescription.textContent = `В вашем городе ${data.weather[0].description}`;
  humidity.textContent = `Относительная влажность ${data.main.humidity} %`;
  wind.textContent = `Скорость ветра ${data.wind.speed} м/с`;
}

export default getWeather;
