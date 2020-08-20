<?php
class EmpleadosController extends ControladorBase{
 
 public function ver(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $this->view("index",[
    "vistaArchivo"=>"registros"
   ]);
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }

 public function listar(){
  //DEVUELVE TODO LOS DATOS DE LA TABLA
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
    $emp = new Empleados("empleados");
    echo json_encode($emp->innerGetAll("cargo"));
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }
 public function crear(){
  //INSERTA LOS DATOS EN LA TABLA
 $session = new Sesion();
 if(isset($_SESSION['usuario'])){
  if(isset($_POST['cedula']) && isset($_POST['nombre']) && isset($_POST['apellido'])){  
    $emp = new Empleados("empleados");
    
    $emp->registrar($_POST["cedula"],$_POST["nombre"],$_POST["apellido"],$_POST["edad"],$_POST["sexo"],$_POST["cargo"]);
    
  }
  }else{
   $this->redirect('login','validacionUsuario');
  }
 }
 public function consultar(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $emp = new Empleados("empleados");
   if(isset($_POST['columna']) && isset($_POST['dato'])){
    echo json_encode($emp->consulta("cargo",$_POST['columna'],$_POST['dato']));
   }else{
    echo json_encode($emp->innerGetAll("cargo"));
   }
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }

 public function eliminar(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $emp = new Empleados("empleados");
   $emp->deleteById($_POST['id']);
   echo 'El dato se elimino correctamente';
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }

}
?>