<?php
class SesionesController extends ControladorBase{
 
 public function index(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $usuarioSesion=$_SESSION['usuario'];
   $this->view('index',[
    "vistaArchivo"=>"inicio"
   ]);
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }

 public function Logout(){
  $session = new Sesion();
  session_destroy();
  session_unset();
  $this->redirect('login','validacionUsuario');
 }

 public function DatosSesion(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $usuarioSesion=$_SESSION['usuario'];
   $user = new Usuario('usuarios');
   echo json_encode($user->getBy('usuario',$usuarioSesion));
  }else {
   $this->redirect('login','validacionUsuario');
  }

 }

}