<?php
class Empleados{
  private $table, $db;
  
  public function __construct($table){
    $this->table = $table;
    include_once "../core/Conectar.php";
    $conexion = new Conectar();
    $this->db = $conexion->conexion();
  }

  public function registrar($ci,$nom,$ape,$ed,$se,$car,$su){
    $consulta = "INSERT INTO $this->table(id,cedula,nombres,apellidos,edad,sexo,cargo,sueldo,fecha) VALUES(null,'$ci','$nom','$ape','$ed','$se','$car','$su',NOW())";
    $query = $this->db->query($consulta);

    return $query;
  }

  public function listar(){
    $consulta = "SELECT * FROM $this->table ORDER BY id DESC";
    $query = $this->db->query($consulta);
    if($query->num_rows > 0){
      while ($row=$query->fetch_object()) {
        $resultSet[] = $row;
      }
      return $resultSet;
    }
  }
}
?>