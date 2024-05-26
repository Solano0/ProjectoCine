<?php
require_once ('../entities/dto/usuarios.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $usuario = new Usuario;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['usuario'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['usuario'];
                }
                break;

            case 'login':
                $_SESSION['nombre_usuario'] = $usuario->getId();
                if (!$usuario->checkUser($_POST['username'])) {
                    $result['exception'] = 'Los datos no coinciden';
                } elseif (!$usuario->checkPassword($_POST['password'])) {
                    $result['exception'] = 'Credenciales incorrectas';
                } {
                $_SESSION['id_usuario'] = $usuario->getId();
                // $_SESSION['nombre_usuario_password'] = $usuario->getNombres();
                $result['password'] = true;
                $result['exception'] = 'Tu contraseña ha caducado';
            }
                break;
        }
    }


}