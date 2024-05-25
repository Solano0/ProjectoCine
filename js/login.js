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
