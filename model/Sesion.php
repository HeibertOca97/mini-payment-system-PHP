<?php

require_once 'Usuario.php';
class Sesion extends Usuario{
 
 public function __construct(){
  session_start();
 }
 
 public function usuarioSesion($user){
  $_SESSION['usuario'] = $user;
 }
 
 public function nombreSesion($name){
  $_SESSION['nombre'] = $name;
 }
 
 public function idSesion($id){
  $_SESSION['id'] = $id;
 } 

}

?>