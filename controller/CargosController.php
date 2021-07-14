<?php
class CargosController extends ControladorBase{

 public function listar(){
  $sesion = new Sesion();
  if(isset($_SESSION['usuario'])){
   $cargo = new Cargo("cargo");
   echo json_encode($cargo->getAll());
  }
  else{
   $this->redirect('login','validacionUsuario');
  }

 }

 public function crear(){
  $sesion = new Sesion();
  if(isset($_SESSION['usuario'])){
   if(isset($_POST['nombre']) && isset($_POST['sueldo'])){
    $cargo = new Cargo("cargo");
    $cargo->__set('nombre',$_POST['nombre']);
    $cargo->__set('sueldo',$_POST['sueldo']);
    $cargo->insertar();
   }
  }else{
   $this->redirect('login','validacionUsuario');
  }
 }

 public function editar(){
  $sesion = new Sesion();
  if(isset($_SESSION['usuario'])){
   if(isset($_POST['nombre']) && isset($_POST['sueldo'])){
    $cargo = new Cargo("cargo");
    $cargo->__set('id',$_POST['id']);
    $cargo->__set('nombre',$_POST['nombre']);
    $cargo->__set('sueldo',$_POST['sueldo']);
    $cargo->actualizar();
   }
  }else{
   $this->redirect('login','validacionUsuario');
  }
 }

 public function consultar(){
  $sesion = new Sesion();
  if(isset($_SESSION['usuario'])){
   if(isset($_POST['id'])){
    $cargo = new Cargo("cargo");
    echo json_encode($cargo->getBy("id",$_POST['id']));
   }
  }else{
   $this->redirect('login','validacionUsuario');
  }
 }

}

