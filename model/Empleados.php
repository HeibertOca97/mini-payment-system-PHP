<?php
class Empleados extends EntidadBase{
  private $table;
  
  public function __construct($table){
    $this->table = $table;
    parent::__construct($table);
  }

  public function registrar($ci,$nom,$ape,$ed,$se,$car){
    $consulta = "INSERT INTO $this->table(cedula,nombres,apellidos,edad,sexo,idCargo,fecha) VALUES('$ci','$nom','$ape',$ed,'$se',$car,NOW())";
    $query = $this->db()->query($consulta);
  }

  public function actualizar($id,$ci,$nom,$ape,$ed,$se,$car){
    $consulta = "UPDATE $this->table SET cedula='$ci', nombres='$nom', apellidos='$ape',edad=$ed,sexo='$se',idCargo=$car WHERE id=$id";
    $query = $this->db()->query($consulta);
  }

  public function consultaIds($id){
   $consulta = "SELECT $this->table.id,cedula,nombres,apellidos,edad,sexo,idCargo,cargo.nombre FROM $this->table INNER JOIN cargo ON $this->table.idCargo = cargo.id WHERE $this->table.id = $id";
   $query = $this->db()->query($consulta);
   if($query->num_rows == 1){
    if($row = $query->fetch_object()){
     $resultSet = $row;
    }
    return $resultSet;
   }else{
    return false;
   }
  }

  public function consultaUnida($tabla,$columna,$datos){
   $consulta = "SELECT $this->table.id,cedula,nombres,apellidos,edad,sexo,idCargo,fecha,$tabla.nombre,sueldo FROM $this->table INNER JOIN $tabla ON $this->table.idCargo = $tabla.id WHERE $columna LIKE '%$datos%' ORDER BY $this->table.id DESC";
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

  public function buscarCoincidencia($column ,$value){
    $consultar = $this->db()->query("SELECT * FROM $this->table WHERE $column = '$value'");

    if($consultar->num_rows > 0){
      return true;
    }else {
      return false;
    }
  }

}
?>