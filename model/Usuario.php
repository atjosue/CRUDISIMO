<?php 
require_once 'Conexion.php';
	class Usuario
	{

		private $username;
		private $password;
        private $salt;
		private $estado;
		private $rol;
        public $db;
        
		public function __construct()
		{
            
            $this->db = conectar();
            
		}


        public function getDb()
        {
            return $this->db;
        }


    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $username
     *
     * @return self
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     *
     * @return self
     */
    public function setPassword($password)
    {
        $passEncode = sha1($password);
        $this->password = $passEncode;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @param mixed $salt
     *
     * @return self
     */
    public function setSalt()
    {
        $this->salt = $this->generateSalt();

        return $this;
    }

    public function generateSalt()
    {
        $salt = $this->password;
        for ($i=1; $i<=12 ; $i++) { 
            $salt = sha1($salt);
        }
        return $salt;
    }

    /**
     * @return mixed
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * @param mixed $estado
     *
     * @return self
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getRol()
    {
        return $this->rol;
    }

    /**
     * @param mixed $rol
     *
     * @return self
     */
    public function setRol($rol)
    {
        $this->rol = $rol;

        return $this;
    }





    public function getAll()
    {
        $sqlAll = "SELECT * from usuario WHERE estado = 1";
        $info = $this->db->query($sqlAll);
        if ($info->num_rows>0) {
            
            $dato = $info;
        }else{

            $dato = false;
        }
        return $dato;
    }
    // metodo para llenar el select

    public function getAllRol(){
        $sql="select r.id, r.nombre from rol r where r.estado='1'";
        $info = $this->db->query($sql);
        if ($info->num_rows>0) {
            $data = $info;
        }else{
            $data=false;
        }
        return $data;
    }
    //fin del metodo
    //metodo para guardar Usuario

    public function saveUser(){
        $sql="INSERT INTO usuario values(0,'".$this->username."','".$this->password."','".$this->salt."','".$this->estado."','".$this->rol."')";
        $res = $this->db->query($sql);
        $data = array();

        if ($res) {

            $data['estado'] = true;
            $data['descripcion'] = "Datos Ingresados correcatamente";
        }else{
             $data['estado'] = false;
             $data['descripcion'] = "Error al ingresar datos".$this->db->error;
        }
            return json_encode($data);
    }

        //METODO BUSCAR EL USUARIO 
        public function findUser($user){
            $sql="SELECT COUNT(u.id) as numero from usuario u where u.username = '".$user."'";
            $info = $this->db->query($sql);
            $datos = $info->fetch_assoc();
            if ($datos['numero']>0) {
                $datos['estado']=false;
                $datos['descripcion'] = "Usuario ya esta registrado";
            }else{
                $datos['estado']=true;
                $datos['descripcion'] = "Usuario Disponible";
            }

            return json_encode($datos);
        }
        //fin del findUser

        public function getUser($idUser){

        $sql = "SELECT u.id as idUsuario, r.id as idRol, u.username From usuario u inner join rol r on u.rol_id = r.id where u.id='".$idUser."'";
            $info = $this->db->query($sql);
            $data = $info->fetch_assoc();

                return json_encode($data);
        }





        //---------------------------ELIMINAR-------------------

        public function eliminar($id){

            //$sql=

        }

    //fin de la clase usuarion
}


 ?>