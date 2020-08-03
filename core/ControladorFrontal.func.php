<?php
class ControladorFrontal{
  
 function cargarControlador($controller){
    $controlador = ucwords($controller)."Controller";
    $strFileController = "controller/".$controlador.".php";
    
    if(!is_file($strFileController)){
      $strFileController = "controller/".ucwords(CONTROLADOR_DEFECTO)."Controller.php";
    }

    require_once $strFileController;
    $controllerObj = new $controlador();
    return $controllerObj;
  }
  
  function cargarAccion($controllerObj, $action){
    $accion = $action;
    $controllerObj->$accion();
  }

  function lanzarAccion($controllerObj){
    if(isset($_GET['action']) && method_exists($controllerObj, $_GET['action'])){
      $this->cargarAccion($controllerObj, $_GET['action']);
    }else {
      $this->cargarAccion($controllerObj, ACCION_DEFECTO);
    }
  }

}

?>