function handleWeatherComponent() {
  const locationContainer = document.querySelector('.weather-comp-subcontainer');

  if (!locationContainer) {
    console.warn('Esperando a que .weather-comp-subcontainer aparezca en el DOM...');
    return;
  }

  const locationElement = locationContainer.querySelector('p:not([class])');

  if (!locationElement) {
    console.warn('No se encontró un <p> sin clase dentro del contenedor.');
    return;
  }

  const locationName = locationElement.textContent.trim();

  console.log('Ubicación encontrada:', locationName);

  if (!locationName) {
    console.error('No se encontró la ubicación en el componente.');
    return;
  }

  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`;

  fetch(geocodingUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API de geocodificación.');
      }
      return response.json();
    })
    .then((geoData) => {
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('No se encontraron resultados de geocodificación para la ubicación proporcionada.');
      }

      const { latitude, longitude } = geoData.results[0];
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto&forecast_days=3`;

      return fetch(weatherUrl);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API de pronóstico del tiempo.');
      }
      return response.json();
    })
    .then((weatherData) => {
      const weatherWrapper = document.querySelector('.weather-wrapper');

      if (!weatherWrapper) {
        throw new Error('No se encontró el contenedor para mostrar la información meteorológica.');
      }

      const dailyForecasts = weatherData.daily;
      let forecastHtml = '<div class="weather-forecast">';

      dailyForecasts.time.forEach((date, index) => {
        forecastHtml += `
          <div class="forecast-day">
            <h3>${new Date(date).toLocaleDateString()}</h3>
            <p>Temperatura Máxima: ${dailyForecasts.temperature_2m_max[index]}°C</p>
            <p>Temperatura Mínima: ${dailyForecasts.temperature_2m_min[index]}°C</p>
            <p>Amanecer: ${new Date(dailyForecasts.sunrise[index]).toLocaleTimeString()}</p>
            <p>Atardecer: ${new Date(dailyForecasts.sunset[index]).toLocaleTimeString()}</p>
            <p>Precipitación: ${dailyForecasts.precipitation_sum[index]} mm</p>
            <p>Horas de Precipitación: ${dailyForecasts.precipitation_hours[index]} h</p>
            <p>Velocidad Máxima del Viento: ${dailyForecasts.wind_speed_10m_max[index]} km/h</p>
            <p>Ráfagas Máximas de Viento: ${dailyForecasts.wind_gusts_10m_max[index]} km/h</p>
          </div>
        `;
      });

      forecastHtml += '</div>';
      weatherWrapper.innerHTML += forecastHtml;
    })
    .catch((error) => {
      console.error('Error al obtener la información meteorológica:', error);
    });
}

const observer = new MutationObserver(() => {
  if (document.querySelector('.weather-comp-subcontainer')) {
    observer.disconnect();
    handleWeatherComponent();
  }
});

observer.observe(document.body, { attributes: true, childList: true, subtree: true });
