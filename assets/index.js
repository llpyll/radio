// Inicializa EmailJS con tu User ID
emailjs.init('11w83xZg0PuZCavgl');

// Función para obtener el clima
async function getWeather() {
    const API_KEY = 'a97547e3a7a080e3d45a126209263c17';
    const city = 'Asuncion';
    const country = 'PY';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=es`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'omit',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos del clima:', data); // Para debug

        if (data.main && data.weather && data.weather[0]) {
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;

            // Actualizar el ícono según el clima
            const weatherIcon = document.getElementById('weather-icon');
            const iconCode = data.weather[0].icon;
        const iconMap = {
            '01d': 'fa-sun',
            '01n': 'fa-moon',
            '02d': 'fa-cloud-sun',
            '02n': 'fa-cloud-moon',
            '03d': 'fa-cloud',
            '03n': 'fa-cloud',
            '04d': 'fa-cloud',
            '04n': 'fa-cloud',
            '09d': 'fa-cloud-rain',
            '09n': 'fa-cloud-rain',
            '10d': 'fa-cloud-sun-rain',
            '10n': 'fa-cloud-moon-rain',
            '11d': 'fa-bolt',
            '11n': 'fa-bolt',
            '13d': 'fa-snowflake',
            '13n': 'fa-snowflake',
            '50d': 'fa-smog',
            '50n': 'fa-smog'
        };

        weatherIcon.className = `fas ${iconMap[iconCode] || 'fa-sun'}`;
    } else {
        throw new Error('Datos del clima incompletos');
    }
    } catch (error) {
        console.error('Error detallado al obtener el clima:', error);
        document.getElementById('temperature').textContent = 'Error';
        document.getElementById('description').textContent = 'Intente más tarde';
    }
}

// Obtener el clima al cargar la página y actualizarlo cada 30 minutos
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    setInterval(getWeather, 1800000);
});

// Código existente del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const message = document.getElementById('message').value;

    if (message.trim() === '') {
        alert('Por favor, escribe un mensaje.');
        return;
    }

    emailjs.send('service_u215hne', 'template_guziqqn', { message: message })
        .then(function () {
            document.getElementById('contactMessage').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('contactMessage').classList.add('hidden');
            }, 3000);

            document.getElementById('message').value = '';
        }, function (error) {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        });
});