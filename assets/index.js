// Inicializa EmailJS con tu User ID
emailjs.init('11w83xZg0PuZCavgl'); // Reemplaza 'TU_USER_ID' con tu User ID de EmailJS

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const message = document.getElementById('message').value;

    if (message.trim() === '') {
        alert('Por favor, escribe un mensaje.');
        return;
    }

    // Envía el correo usando EmailJS
    emailjs.send('service_u215hne', 'template_7l6o9s4', { message }) //
        .then(function () {
            // Muestra un mensaje de confirmación
            document.getElementById('contactMessage').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('contactMessage').classList.add('hidden');
            }, 3000);

            // Limpia el campo de texto
            document.getElementById('message').value = '';
        }, function (error) {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        });
});