const apiKey = '57b7e13adee974ba9666deb50899b544';

function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weather-info');
    
    if (city.trim() === '') {
        weatherInfo.classList.remove('hidden');
        document.getElementById('city-name').innerText = 'Please enter a city name!';
        clearWeatherInfo();
        return;
    }

    const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherInfo.classList.remove('hidden');

            if (data.success === false) {
                document.getElementById('city-name').innerText = 'City not found!';
                clearWeatherInfo();
                return;
            }

            const weatherData = data.current;
            document.getElementById('city-name').innerText = `${data.location.name}, ${data.location.country}`;
            document.getElementById('temperature').innerText = `🌡️ Temperature: ${weatherData.temperature}°C`;
            document.getElementById('description').innerText = `🌥️ ${weatherData.weather_descriptions[0]}`;
            document.getElementById('humidity').innerText = `💧 Humidity: ${weatherData.humidity}%`;
        })
        .catch(error => {
            weatherInfo.classList.remove('hidden');
            document.getElementById('city-name').innerText = 'An error occurred while fetching data!';
            clearWeatherInfo();
        });
}

function clearWeatherInfo() {
    document.getElementById('temperature').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('humidity').innerText = '';
}
