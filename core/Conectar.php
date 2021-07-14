<?php
  class Conectar{
    private $driver,$host,$user,$pass,$database,$charset;

    public function __construct(){
      $this->driver = 'mysql';
      $this->host = '127.0.0.1';
      $this->user = 'root';
      $this->pass = '';
      $this->database = 'sistema_pago';
      $this->charset = 'utf8';
    }

    public function conexion(){
      if($this->driver=="mysql" || $this->driver==null){
        $cn = new mysqli($this->host,$this->user,$this->pass,$this->database);
        $cn->query("SET NAMES '".$this->charset."'");
      }
      return $cn;
    }
  }
?>