function handleWeatherComponent() {
  const locationElement = document.querySelector('.weather-comp-location');

  if (!locationElement) {
    console.warn('Could not found  element.');
    return;
  }

  const locationName = locationElement.textContent.trim();

  console.log('Location found:', locationName);

  if (!locationName) {
    console.error('Could not found location.');
    return;
  }

  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`;

  fetch(geocodingUrl)
    .then((response) => {
      if (!response.ok) {
        console.error('Error on geocoding API response.');
        return;
      }
      return response.json();
    })
    .then((geoData) => {
      if (!geoData.results || geoData.results.length === 0) {
        console.error('Could not found geocoding info.');
        return;
      }

      const { latitude, longitude } = geoData.results[0];
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max&timezone=auto&forecast_days=3`;

      return fetch(weatherUrl);
    })
    .then((response) => {
      if (!response.ok) {
        console.error('Error on weather API response.');
        return;
      }
      return response.json();
    })
    .then((weatherData) => {
      const weatherWrapper = document.querySelector('.weather-wrapper');

      if (!weatherWrapper) {
        console.error('Could not found weather container.');
        return;
      }

      const dailyForecasts = weatherData.daily;
      let forecastHtml = '<div class="weather-forecast">';

      dailyForecasts.time.forEach((date, index) => {
        forecastHtml += `
          <div class="forecast-day" data-aue-type="container" data-aue-label="Forecast Day">
            <h3 data-aue-prop="date" data-aue-label="Date">${dailyForecasts.time[index]}</h3>
            <p data-aue-prop="temperature_max" data-aue-label="Maximum Temperature">Maximum Temperature: ${dailyForecasts.temperature_2m_max[index]}°C</p>
            <p data-aue-prop="temperature_min" data-aue-label="Minimum Temperature">Minimum Temperature: ${dailyForecasts.temperature_2m_min[index]}°C</p>
            <p data-aue-prop="sunrise" data-aue-label="Sunrise">Sunrise: ${new Date(dailyForecasts.sunrise[index]).toLocaleTimeString()}</p>
            <p data-aue-prop="sunset" data-aue-label="Sunset">Sunset: ${new Date(dailyForecasts.sunset[index]).toLocaleTimeString()}</p>
            <p data-aue-prop="precipitation_sum" data-aue-label="Precipitation">Precipitation: ${dailyForecasts.precipitation_sum[index]} mm</p>
            <p data-aue-prop="precipitation_hours" data-aue-label="Precipitation Hours">Precipitation Hours: ${dailyForecasts.precipitation_hours[index]} h</p>
            <p data-aue-prop="wind_speed_max" data-aue-label="Maximum Wind Speed">Maximum Wind Speed: ${dailyForecasts.wind_speed_10m_max[index]} km/h</p>
            <p data-aue-prop="wind_gusts_max" data-aue-label="Maximum Wind Gusts">Maximum Wind Gusts: ${dailyForecasts.wind_gusts_10m_max[index]} km/h</p>
          </div>
        `;
      });

      forecastHtml += '</div>';
      weatherWrapper.innerHTML += forecastHtml;
    })
    .catch((error) => {
      console.error('Error obtaining info:', error);
    });
}

const observer = new MutationObserver(() => {
  if (document.querySelector('.weather-comp-subcontainer')) {
    observer.disconnect();
    handleWeatherComponent();
  }
});

observer.observe(document.body, { attributes: true, childList: true, subtree: true });
