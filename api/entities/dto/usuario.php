<?php 
require_once('../helpers/validator.php');
require_once('../entities/dao/usuario_queries.php');

class Usuario extends UsuarioQueries{
    protected $id_usuario = null;
    protected $usuario = null;
    protected $contrasena = null;

    

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    /*
    * Método para validar el id de un usuario
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }
    /*
    * Método para validar el formato del nombre del usuario
    */
    public function setNombres($value)
    {
        if (Validator::validateAlphabetic($value, 1, 50)) {
            $this->usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->contrasena = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_usuario;
    }
    /*
    *   Método para obtener el valor del nombre de el usuario
    */
    public function getNombres()
    {
        return $this->usuario;
    }
    /*
    *   Método para obtener el valor de la clave de el usuario
    */
    public function getClave()
    {
        return $this->contrasena;
    }
    /*
    *   Método para obtener el valor del correo del usuario
    */
    public function getCorreo()
    {
        return $this->correo_usuario;
    }
    /*
    *   Método para obtener el valor de la codigo de recuperación de un usuario usuario
    */
    public function getCodigoRecuperacion()
    {
        return $this->codigo_recuperacion;
    }
    
}