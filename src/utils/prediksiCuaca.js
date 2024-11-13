const request = require('postman-request');

const getWeatherIcon = (description) => {
    const lowerCaseDescription = description.toLowerCase();

    if (lowerCaseDescription.includes('sunny')) {
        return '<img src="/img/sunny.png" class="weather-icon rainy" alt="sunny Icon">';
    } else if (lowerCaseDescription.includes('cloud')) {
        return '<img src="/img/clouds.png" class="weather-icon rainy" alt="cloud Icon">';
    } else if (lowerCaseDescription.includes('rain')) {
        return '<img src="/img/rain.png" class="weather-icon rainy" alt="Rainy Icon">';
    } else if (lowerCaseDescription.includes('storm')) {
        return '<img src="/img/storm.png" class="weather-icon storm" alt="storm Icon">';
    } else if (lowerCaseDescription.includes('mist') || lowerCaseDescription.includes('fog')) {
        return '<i class="fas fa-smog weather-icon misty"></i>';
    } else {
        return '<i class="fas fa-question-circle weather-icon unknown"></i>';
    }
};


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8b99bed5337de0fcccb5b11f090330d1&query=' +
        encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +
        '&units=m';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined);
        } else if (response.body.error) {
            callback('Tidak dapat menemukan lokasi', undefined);
        } else {
            const description = response.body.current.weather_descriptions[0];
            const iconHTML = getWeatherIcon(description);

            callback(undefined,
                `<br>${iconHTML} <br>
                ${response.body.current.weather_descriptions[0]} <br> <br>
                <i class="fas fa-thermometer-half temp-icon"></i> Suhu saat ini adalah ${response.body.current.temperature} derajat. <br> 
                <i class="fas fa-sun uv-icon"></i> Index UV adalah ${response.body.current.uv_index} nm. <br> 
                <i class="fas fa-smog visibility-icon"></i> Visibilitas sejauh ${response.body.current.visibility} kilometer.`
            );
        }
    });
};

module.exports = forecast;
