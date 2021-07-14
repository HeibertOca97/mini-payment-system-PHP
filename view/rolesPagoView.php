<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reportes php</title>
  <!--<link rel="stylesheet" href="src/css/reportes.css">-->
  <style>
   .tb_head, .tb_body {
    display: block;
    margin: auto;
    line-height: 2.8em;
    width: 100%;
    font-size:12pt;
    border-collapse: collapse;
   }
   /*************ESTILOS TABLA ENCABEZADO**************/
   .tb_head tr td,.tb_head tr th{
    padding:10px;
    box-sizing:border-box;
   }
   .tb_body tr td,.tb_body tr th{
    padding:15px;
    box-sizing:border-box;
    border:1px solid #e6e6e6;
   }
   .tb_body tr td p {
    text-align:center;
   }

</style>
</head>
<body>
 <!--HEADER-->
<page_header>
 <img src="https://www.muylinux.com/wp-content/uploads/2010/05/opensource-logo.png" width="70" height="70">
</page_header>
<page_footer>Fecha de impresion: <?php if(isset($datos)){echo $datos[20]; } ?></page_footer>
<?php
 function mostrarMes($obj){
  $meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
   $indice = $obj-1;
   return $meses[$indice];
 }
 if(isset($datos)){
   echo '
   <br><br><br><br><br>
   <table class="tb_head">
     <tr>
      <th colspan="2">SYSTEMCODEWEB S.A</th>
      <th colspan="2">No. '.$datos[12].'</th>
     </tr>
     <tr>
      <td>Rol de pagos individual</td>
      <td>Mes:</td>
      <th>'.mostrarMes(substr($datos[20],5,-3)).', '.substr($datos[20],8).'</th>
      <th>de '.substr($datos[20],0,4).'</th>
     </tr>
     <tr>
      <td>Empleado</td>
      <td>'.$datos[2].' '.$datos[3].'</td>
     </tr>
     <tr>
      <td>Cargo</td>
      <td>'.$datos[9].'</td>
     </tr>
    </table>
    <br>
    <br>
    <table class="tb_body">
     <tr>
      <th colspan="2">INGRESOS</th>
      <th colspan="2">DESCUENTOS</th>
     </tr>
     <tr>
      <td>Sueldo basico</td>
      <td><strong>$</strong> <span>'.$datos[10].'</span></td>
      <td>Aportes IESS</td>
      <td><strong>$</strong> <span>'.$datos[15].'</span></td>
     </tr>
     <tr>
      <td>Horas extras</td>
      <td><strong>$</strong> <span>'.$datos[14].'</span></td>
      <td>Prest. Y Antic.</td>
      <td><strong>$</strong> <span>'.$datos[16].'</span></td>
     </tr>
     <tr>
      <td>TOTAL INGRESOS</td>
      <td><strong>$</strong> <span>'.$datos[17].'</span></td>
      <td>TOTAL DESCUENTOS</td>
      <td><strong>$</strong> <span>'.$datos[18].'</span></td>
     </tr>
      <tr>
       <td colspan="2">NETO A PAGAR</td>
       <td colspan="2"><strong>$</strong> <span>'.$datos[19].'</span></td>
      </tr>
      <tr>
       <td colspan="4">
        <p>____________________</p>
        <p>RECIBI CONFORME</p>
       </td>
      </tr>
      <tr>
       <td colspan="4">
        <p>C.I. _________________</p>
       </td>
      </tr>
     </table>
   ';
 }
?>
<!-- <div class="principalContenedor">
 </div> -->
</body>
</html>
