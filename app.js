const apiKey = '9f93013b631d10e0f1cf148f078ecf7c';
const weatherInfo = document.getElementById('weather-info');
const getWeatherButton = document.getElementById('getWeatherButton');

function kelvinToCelsius(kelvin) {
    const celsius = kelvin - 273.15;
    return celsius;
}

function getWeatherData() {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    if (location === '') {
        alert('Ingresa una ubicación válida.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la información');
            }
            return response.json();
        })
        .then(data => {
            const temperatureKelvin = data.main.temp;
            const celsius = kelvinToCelsius(temperatureKelvin).toFixed(2); // Redondear a 2 decimales
            const weatherDescription = data.weather[0].description;

            weatherInfo.innerHTML = `
                <p>Temperatura: ${celsius} °C</p>
                <p>Descripción: ${weatherDescription}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            weatherInfo.innerHTML = 'No se pudo obtener la información del clima.';
        });
}

getWeatherButton.addEventListener('click', getWeatherData);