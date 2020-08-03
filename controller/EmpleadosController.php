<?php
include_once "../model/Empleados.php";

//DEVUELVE TODO LOS DATOS DE LA TABLA
if(isset($_GET['listar'])){
  $emp = new Empleados("empleados");
  echo json_encode($emp->listar());
}

//INSERTA LOS DATOS EN LA TABLA
if(isset($_POST['cedula']) && isset($_POST['nombre']) && isset($_POST['apellido'])){  
    $emp = new Empleados("empleados");
    $emp->registrar($_POST["cedula"],$_POST["nombre"],$_POST["apellido"],$_POST["edad"],$_POST["sexo"],$_POST["cargo"],$_POST["sueldo"]);
}


?>