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
  
  public function consulta($tabla,$columna,$datos){
   $consulta = "SELECT * FROM $this->table INNER JOIN $tabla ON $this->table.idCargo = $tabla.id WHERE $columna LIKE '%$datos%' ORDER BY $tabla.id DESC";
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
 //INSERTAR EN TBPIVO
 
 //METODOS ARITMETICOS
 public function calcularSalarioPorHoras($sueldo){
  $sueldoPorHoras = ($sueldo / 20) / 8;
  return $sueldoPorHoras;
 }

 public function calcularHorasExtra($sueldoPorHoras,$recargo){
  $sueldoHorasExtras = (($sueldoPorHoras * $recargo) / 100) + $sueldoPorHoras;
  return $sueldoHorasExtras;
 }

 public function horasExtras($sueldo, $recargo,$dias){
  $sueldoSalarioHoras = self::calcularSalarioPorHoras($sueldo);
  $sueldoHorasExtras = self::calcularHorasExtra($sueldoSalarioHoras,$recargo);
  $totalHorasExtras = $sueldoHorasExtras * $dias;
  return $totalHorasExtras;
 }

 public function aporteIEES($sueldo){
  $aporte = ($sueldo * 9.45) / 100;
  return $aporte;
 }

}
?>