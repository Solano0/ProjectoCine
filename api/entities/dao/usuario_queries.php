<?php
require_once('../helpers/database.php');

class UsuarioQueries{

    public function checkUser($usuario)
    {
        $sql = 'SELECT id_usuario FROM usuario WHERE usuario = ?';
        $params = array($usuario);
        if ($data = Database::getRow($sql, $params)) {
            $this->id = $data['id_usuario'];
            $this->usuario = $usuario;
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT contrasena
                FROM usuario
                WHERE id_usuario = ?';
        $params = array($this->id);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['contrasena'])) {
        }
        else{
            return false;
        }
    }

}