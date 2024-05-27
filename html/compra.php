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

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numero_asiento = $_POST['seat-number'];
    $precio_total = $_POST['total-price'];
    $nombre_cliente = $_POST['customer-name'];
    $email_cliente = $_POST['customer-email'];

    // Iniciar la transacción
    $conn->begin_transaction();

    try {
        // Dividir los números de asientos
        $asientos = explode(',', $numero_asiento);
        foreach ($asientos as $asiento) {
            $stmt = $conn->prepare("INSERT INTO compras (FK_id_usuario, numero_asiento, precio_total, nombre_cliente, email_cliente) VALUES (1, ?, ?, ?, ?)");
            $stmt->bind_param("sdss", $asiento, $precio_total, $nombre_cliente, $email_cliente);
            if (!$stmt->execute()) {
                throw new Exception($stmt->error);
            }
        }

        // Confirmar la transacción
        $conn->commit();
        $response['status'] = 'success';
        $response['message'] = 'Compra realizada con éxito';
        $response['occupied_seats'] = $asientos;
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $conn->rollback();
        $response['status'] = 'error';
        $response['message'] = 'Error: ' . $e->getMessage();
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Obtener los asientos ocupados
    $result = $conn->query("SELECT numero_asiento FROM compras");
    $occupied_seats = [];
    while ($row = $result->fetch_assoc()) {
        $seats = explode(',', $row['numero_asiento']);
        $occupied_seats = array_merge($occupied_seats, $seats);
    }
    $response['occupied_seats'] = $occupied_seats;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>


