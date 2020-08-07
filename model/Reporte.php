<?php

class Reporte{
 private $html2pdf,$archivoDOM,$nombreReporte;
 
 public function __construct($archivoDOM,$nombreReporte){
  ob_start();
  $this->archivoDOM= $archivoDOM;
  $this->nombreReporte= $nombreReporte;
  $this->html2pdf = new Html2Pdf("P","A4","es",true,"UTF-8");
  }

  public function VisualizarDatos(){
   $this->html2pdf->writeHTML($this->archivoDOM);
  $this->html2pdf->output($this->nombreReporte.'pdf');
  }


 }
?>