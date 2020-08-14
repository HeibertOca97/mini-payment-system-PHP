<?php

class UsuariosController extends ControladorBase{

 public function listar(){
  //DEVUELVE TODO LOS DATOS DE LA TABLA
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
    $user = new Usuario("usuarios");
    echo json_encode($user->getAll());
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }

}