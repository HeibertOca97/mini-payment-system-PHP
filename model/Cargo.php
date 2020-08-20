<?php

class Cargo extends EntidadBase{
 private $table;
 private $id, $nombre, $sueldo, $estado;
 
 public function __construct($table){
  $this->table = (string)$table;
  parent::__construct($this->table);
 }

 public function __get($propiedad){
  if(property_exists($this,$propiedad)){
   return $this->$propiedad;
  }
 }

 public function __set($propiedad,$valor){
  if(property_exists($this,$propiedad)){
   $this->$propiedad = $valor;
  }
  return $this;
 }

 public function insertar(){
  $insertar = "INSERT INTO $this->table(nombre,sueldo,estado) VALUES('$this->nombre',$this->sueldo,'activado')";
  
  $this->db()->query($insertar);
 }

 public function actualizar(){
  $actualizar = "UPDATE $this->table SET nombre='$this->nombre',sueldo='$this->sueldo' WHERE id='$this->id'";
  
  $this->db()->query($actualizar);
 }
 
 public function actualizacionEspecificar($columna,$valor){
  $actualizar = "UPDATE $this->table SET $columna = '$valor' WHERE id=$this->id";
  
  $this->db()->query($actualizar);
 }

}