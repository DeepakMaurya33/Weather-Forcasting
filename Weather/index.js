const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIkey = 'ea5def6792a8d594d99e8bd0735edccb';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json); 

            if (json.cod === '404') {
                console.log('City not found');
                container.style.height = '404px';
                if (weatherBox) weatherBox.style.display = 'none';
                if (weatherDetails) weatherDetails.style.display = 'none';
                if (error404) {
                    error404.classList.add('fadeIn');
                    error404.style.display = 'block'; 
                }
                return;
            }

            if (error404) {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const wind = document.querySelector('.weather-details .wind span');
            const humidity = document.querySelector('.weather-details .humidity span');

            if (image) {
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'clear.png';
                        break;
                    case 'Rain':
                        image.src = 'rain.png';
                        break;
                    case 'Snow':
                        image.src = 'snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'cloud.png';
                        break;
                    case 'Haze':
                        image.src = 'haze.png';
                        break;
                    default:
                        image.src = '';
                }
            }

            if (temperature) {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            }

            if (description) {
                description.innerHTML = `${json.weather[0].description}`;
            }

            if (humidity) {
                humidity.innerHTML = `${json.main.humidity}%`;
            }

            if (wind) {
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            }

            if (weatherBox) {
                weatherBox.style.display = '';
                weatherBox.classList.add('fadeIn');
            }

            if (weatherDetails) {
                weatherDetails.style.display = '';
                weatherDetails.classList.add('fadeIn');
            }

            container.style.height = '590px';
        });
});
