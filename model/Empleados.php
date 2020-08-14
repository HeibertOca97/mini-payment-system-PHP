<?php
class Empleados extends EntidadBase{
  private $table;
  
  public function __construct($table){
    $this->table = $table;
    parent::__construct($table);
  }

  public function registrar($ci,$nom,$ape,$ed,$se,$car,$su){
    $consulta = "INSERT INTO $this->table(id,cedula,nombres,apellidos,edad,sexo,cargo,sueldo,fecha) VALUES(null,'$ci','$nom','$ape','$ed','$se','$car','$su',NOW())";
    $query = $this->db()->query($consulta);

    return $query;
  }
  
  public function consulta($columna,$datos){
   $consulta = "SELECT * FROM $this->table WHERE $columna LIKE '%$datos%' ORDER BY id DESC";
   $query = $this->db()->query($consulta);
   if($query->num_rows > 0){
    while($row=$query->fetch_object()){
     $resultSet[] = $row;
    }
    return $resultSet;
   }else{
    return false;
   }
  } 

}
?>