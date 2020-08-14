<?php
class EntidadBase{
  //ATRIBUTOS
  private $table, $db, $conectar;
  //METODOS
  //CONSTRUCTOR
  public function __construct($table){
    $this->table = (string) $table;
    
    require_once 'Conectar.php';
    $this->conectar = new Conectar();
    $this->db = $this->conectar->conexion();
  }

  //CONTIENE LA INSTANCIA DEL LA CLASE CONECTAR
  public function getConectar(){
    return $this->conectar;
  }

  //CONTIENE LA CONEXION
  public function db(){
    return $this->db;
  }
  //CONSULTA TODO LOS DATOS  Y ME LOS DEVUELVE EN UN ARRAY
  public function getAll(){
    $query = $this->db->query("SELECT * FROM $this->table ORDER BY id DESC");

    if($query->num_rows > 0){
     while ($row = $query->fetch_object()) {
       $resultSet[]=$row;
     }
     return $resultSet;
    }else{
     return false;
    }
    
  }
  //CONSULTA QUE ME DEVUELVE EL TOTAL DE LOS DATOS
  public function getAllNum(){
    $query = $this->db()->query("SELECT * FROM ".$this->table);
      
    return $query->num_rows;
  }
  
  public function getById($id){
    $query = $this->db->query("SELECT * FROM $this->table WHERE id=$id");
    
    if($row = $query->fetch_object()){
      $resultSet = $row;
    }
    
    return $resultSet;
  }
  
  public function getBy($column, $value){
    $query = $this->db->query("SELECT * FROM $this->table WHERE $column='$value'");
    
    while ($row = $query->fetch_object()) {
      $resultSet[]=$row;
    }
    
    return $resultSet;
  }

  public function deleteById($id){
    $query = $this->db->query("DELETE FROM $this->table WHERE id=$id");

    return $query;
  }
  
  public function deleteBy($column,$value){
    $query = $this->db->query("DELETE FROM $this->table WHERE $column='$value'");
    
    return $query;
  }


}
?>