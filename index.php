<?php
//CONFIGURACION GLOBAL - TENEMOS NUESTAS VARIABLES GLOBALES
require_once 'config/global.php';
//ARCHIVO BASE PARA LOS CONTROLADORES
require_once 'core/ControladorBase.php';
//ARCHIVO PARA CARGAR LAS FUNCIONES DEL CONTROLADOR FRONTAL
require_once 'core/ControladorFrontal.func.php';

$controlador = new ControladorFrontal();
//CARGAMOS CONTROLADORES Y ACCIONES
if(isset($_GET['controller'])){
  $controllerObj = $controlador->cargarControlador($_GET['controller']);
}else {
  $controllerObj = $controlador->cargarControlador(CONTROLADOR_DEFECTO);
}
$controlador->lanzarAccion($controllerObj);