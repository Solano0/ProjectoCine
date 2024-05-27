<?php
// Definir las constantes de conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "projectocine";

// Crear la conexión
$coneccion = mysqli_connect($servidor, $usuario, $clave, $bd);

// Verificar la conexión
if (!$coneccion) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Función para encriptar la contraseña
function encriptarContraseña($contraseña) {
    // Usar password_hash() para encriptar la contraseña
    return password_hash($contraseña, PASSWORD_DEFAULT);
}

?>

<form method="post">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <input type="submit" name="enviar">
</form>

<?php
if (isset($_POST['enviar'])) {
    $nombre = $_POST['username'];
    $contraseña = $_POST['password'];
    
    // Encriptar la contraseña
    $contraseñaEncriptada = encriptarContraseña($contraseña);
    
    // Preparar la consulta para evitar inyecciones SQL
    $stmt = mysqli_prepare($coneccion, "INSERT INTO usuario (usuario, contrasena, estado_usuario) VALUES (?, ?, 1)");
    if ($stmt === false) {
        die('Error en la preparación de la consulta: ' . htmlspecialchars(mysqli_error($coneccion)));
    }
    
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, 'ss', $nombre, $contraseñaEncriptada);
    
    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Nuevo registro creado exitosamente.";
        // Redirigir al login.html después de la inserción
        header("Location: http://localhost/ProjectoCine/html/login.html");
        exit;
    } else {
        echo "Error: " . htmlspecialchars(mysqli_stmt_error($stmt));
    }
    
    // Cerrar la sentencia
    mysqli_stmt_close($stmt);
}

// Cerrar la conexión
mysqli_close($coneccion);
?>


