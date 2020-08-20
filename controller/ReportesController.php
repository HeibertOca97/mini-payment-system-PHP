<?php
class ReportesController extends ControladorBase{
 
 public function ver(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $this->view("index",[
    "vistaArchivo"=>"pagos"
   ]);
   }else {
   $this->redirect('login','validacionUsuario');
  }
 }

 public function crear(){  
  $sesion = new Sesion();
  if(isset($_SESSION['usuario'])){
    if(isset($_POST['id'])){
     $roles_emp = new Rolpago("rolpago");
     $roles_emp->crear($_POST['id'],$_POST['horasExtras'],$_POST['aporte'],$_POST['prestamos'],$_POST['ingresos'],$_POST['descuentos'],$_POST['salario'],$_POST['fecha']);
     echo "creado";
    }
  }
 }

 public function consultar(){
  if(isset($_POST['id']) && isset($_POST['fecha'])){
   $roles_emp = new Rolpago("rolpago");
   echo json_encode($roles_emp->getBys('id_emp',$_POST['id'],"fecha_emision",$_POST['fecha']));   
  }
 }

 public function consultarReportes(){
  $session = new Sesion();
  if(isset($_SESSION['usuario'])){
   $emp = new Rolpago("empleados");
   if(isset($_POST['columna']) && isset($_POST['dato'])){
    echo json_encode($emp->consulta("rolpago",$_POST['columna'],$_POST['dato']));
   }
  }else {
   $this->redirect('login','validacionUsuario');
  }
 }
 
 public function reporteGenerado(){
  $sesion= new Sesion();
  if(isset($_SESSION['usuario'])){
   if(isset($_GET['id']) && isset($_GET['fecha'])){
    require "vendor/autoload.php";
    $ruta = 'view/reporteView.php';
    
    $roles_emp = new Rolpago("rolpago");
    $datos=$roles_emp->getBys('id_emp',$_GET['id'],"fecha_emision",$_GET['fecha']);
    
    $this->view("ver",[
     "archivo"=>$ruta,
     "datos"=>$datos
    ]);
   }else {
    self::ver();
   }
  }else{
   $this->redirect('login','validacionUsuario');
  }
 }

}

?>