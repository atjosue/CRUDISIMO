<?php 
require_once '../model/Usuario.php';

if (isset($_POST['key'])) {
	$key = $_POST['key'];

		switch ($key) {
			case 'agregar':
				agregar();
				break;
			case 'finduser':
				findUser();
				break;
			case 'getUser':
				getUser();
				break;
			case 'modificar':
				modificar();
				break;
			case 'eliminar':
				eliminar();
				break;
			
			default:
				
				break;
		}


}
// fin del isset

	function agregar(){

		$info= $_POST['dataUsuario'];
		$decodeInfo = json_decode($info);

		$objUsuario =  new Usuario();
		$objUsuario->setUsername($decodeInfo[0]->value);
		$objUsuario->setPassword($decodeInfo[1]->value);
		$objUsuario->setSalt();
		$objUsuario->setEstado(1);
		$objUsuario->setRol($decodeInfo[3]->value);
		$res = $objUsuario->saveUser();

		echo $res;

	}

	function findUser(){
		$objusuario = new Usuario();

		$user =  $_POST['valor'];

		$res =$objusuario->findUser($user);

		echo $res;

	}

	function getUser(){

		$objUsuario = new usuario();
		$idUsuario = $_POST['idUsuario'];
		$res = $objUsuario->getUser($idUsuario);

		echo $res;
	}

	function modificar(){
		$info = $_POST['dataModificar'];
		$infoJson = json_decode($info);

		var_dump($infoJson);
		die();

		$objUsuario = new Usuario();
		$objusuario->setUsername($infoUsuario[0]);



	}

	function eliminar(){

		$id= $_POST['idUsuario'];

		$objusuario = new Usuario();
		$data = $objusuario->eliminar($id);
		echo $data;

	}


 ?>