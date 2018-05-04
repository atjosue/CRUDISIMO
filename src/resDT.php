<?php

require_once '../model/Usuario.php';

$usuario = new Usuario();

$datos = $usuario->getAllJSON();

echo $datos;