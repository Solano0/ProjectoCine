<?php 
require_once('../helpers/validator.php');
require_once('../entities/dao/usuario_queries.php');

class Usuario extends UsuarioQueries{
    protected $id_usuario = null;
    protected $usuario = null;
    protected $contrasena = null;

    protected $estado_usuario = null;

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
        
    public function setEstado($value) {
        if ($value === true || $value === false) {
            // Convert boolean to tinyint (0 or 1)
            $this->estado_usuario = $value ? 1 : 0;
        } else {
            throw new InvalidArgumentException("El valor de estado_usuario debe ser un booleano.");
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
    
    public function getEstado()
    {
        return $this->estado_usuario;
    }
    
}