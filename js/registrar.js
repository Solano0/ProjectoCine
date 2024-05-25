document.getElementById("RegistrarButton").addEventListener("click", function() {
    // Aquí podrías añadir la lógica de validación del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Por ahora simplemente redirigimos a index.html
    // Aquí podrías añadir la lógica de autenticación

    if (username && password) { // Simple check to ensure fields are not empty
        window.location.href = "login.html";
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Constante para establecer el formulario de iniciar sesión.
const SESSION_FORM = document.getElementById('session-form');


// Método manejador de eventos para cuando se envía el formulario de iniciar sesión.
// simple mente se comprueban los datos y se inicia
SESSION_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SESSION_FORM);
    // Petición para determinar si el cliente se encuentra registrado.
    const JSON = await dataFetch(USER_API, 'login', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        sweetAlert(1, JSON.message, true, 'index.html');
    } else {
        sweetAlert(2, JSON.exception, false);
    }
});