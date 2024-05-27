document.getElementById("loginButton").addEventListener("click", function() {
    // Aquí podrías añadir la lógica de validación del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Por ahora simplemente redirigimos a index.html
    // Aquí podrías añadir la lógica de autenticación

    if (username && password) { // Simple check to ensure fields are not empty
        window.location.href = "index.html";
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Constante para establecer el formulario de iniciar sesión.
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario estándar

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Crear una solicitud AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/conexion/login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Manejar la respuesta del servidor
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            alert(response.message); // Mostrar la alerta con el mensaje del servidor
        } else {
            alert('Error en la solicitud');
        }
    };

    // Enviar los datos del formulario al servidor
    xhr.send(`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
});
