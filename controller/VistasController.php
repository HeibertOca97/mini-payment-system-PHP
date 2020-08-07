<?php
class VistasController extends ControladorBase{
 
 public function Reportes(){  
  require "vendor/autoload.php";
  $ruta = 'view/reporteView.php';
  $this->view("ver",[
    "archivo"=>$ruta
   ]);
 }

 /*public function Ver(){
  $user = new Usuario('usuarios');
  $sesion= new Sesion();
  if(isset($_SESSION['usuario'])){
   if($_GET['id']){
    $users = $user->getById($_GET['id']);
    echo json_encode($users);
   }else {
    $this->redirect('login','validacionUsuario');
   }
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }*/

}

?>