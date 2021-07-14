<?php
 class Usuario extends EntidadBase{
  private $tabla, $user, $pass, $id;

  public function __construct($table){
   $this->tabla = $table;
   parent::__construct($table);
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

  public function consultar($user,$pass){
   $query = $this->db()->query("SELECT * FROM $this->tabla WHERE usuario='$user' AND contraseña='$pass'");

   if($query->num_rows > 0){
    return true;
   }else {
    return false;
   }
  }
 }
?>