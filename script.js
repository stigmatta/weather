window.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    const weatherElement = document.getElementById('weather');
    const iconw = document.getElementById('img');
    const cit = document.getElementById('city');
    const formContainer = document.querySelector('.form-container');
    const resultContainer = document.querySelector('.requested-city');
    const cityInput = document.getElementById('cityInput');
    const submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', showWeather);

    cityInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            showWeather();
        }
    });

    function showWeather() {
        const city = cityInput.value;
        if (city !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const icn = data.weather[0].icon;
                    const feels=data.main.feels_like;
                    cit.innerText = data.name;
                    iconw.src = `https://openweathermap.org/img/wn/${icn}.png`;
                    weatherElement.innerHTML = `Текущая температура: ${temperature}°C<br>Ощущается как:${feels} <br>Описание: ${description}`;

                    formContainer.style.display = 'none';
                    resultContainer.style.display = 'block';
                })
                .catch((error) => {
                    console.error('Произошла ошибка:', error);
                });
        } else {
            alert('Пожалуйста, введите город.');
        }
    }
});
