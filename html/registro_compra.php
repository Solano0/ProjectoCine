<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "ProjectoCine";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $clave, $bd);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numero_asiento = $_POST['seat_number'];

    // Marcar el asiento como ocupado en la base de datos
    $sql = "UPDATE asientos SET ocupado = 1 WHERE numero_asiento = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $numero_asiento);

    if ($stmt->execute()) {
        echo "Asiento registrado con éxito";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>

