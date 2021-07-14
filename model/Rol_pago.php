<?php
 class Rolpago extends EntidadBase{
  private $table, $id;

  public function __construct($table){
   $this->table = $table;
   parent::__construct($table);
  }

  public function crear($id,$he,$ai,$pres,$ingre,$desc,$tt,$fe){
   $insertar = "INSERT INTO $this->table(id_emp,h_extras,aportes_iess,prestamo,ingresos,descuentos,total_pagar,fecha_emision) VALUES($id,$he,$ai,$pres,$ingre,$desc,$tt,'$fe')";
   $query = $this->db()->query($insertar);
   return $query;
  }

  public function buscarCoincidencia($column ,$value,$column2,$value2){
    $consultar = $this->db()->query("SELECT * FROM $this->table WHERE $column = '$value' AND $column2 = '$value2'");

    if($consultar->num_rows > 0){
      return true;
    }else {
      return false;
    }

  }
  
  public function getBys($column, $value,$column2,$value2){
    $query = $this->db()->query("SELECT * FROM empleados INNER JOIN cargo INNER JOIN $this->table ON empleados.id = $this->table.id_emp AND empleados.idCargo = cargo.id WHERE $column='$value' AND $column2='$value2'");
    
    if($query->num_rows == 1){
     if ($row = $query->fetch_array()) {
      $resultSet=$row;
     }
     return $resultSet;
    }else {
     return false;
    }
  }
  public function innerGetAlls($table){
   $query = $this->db->query("SELECT * FROM $this->table INNER JOIN $table ON $this->table.id = $table.id_emp ORDER BY $this->table.id DESC");

    if($query->num_rows > 0){
     while ($row = $query->fetch_array()) {
       $resultSet[]=$row;
     }
     return $resultSet;
    }else{
     return false;
    }
  }
  public function consulta($tabla,$columna,$datos){
   $consulta = "SELECT * FROM $this->table INNER JOIN $tabla ON $this->table.id = $tabla.id_emp WHERE $columna LIKE '%$datos%' ORDER BY $tabla.id DESC";
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