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
<page_footer>Footer</page_footer>
<!-- <page></page>  -->
<table class="tb_head">
  <tr>
   <th colspan="2">SYSTEMCODEWEB S.A</th>
   <th colspan="2">No 01</th>
  </tr>
  <tr>
   <td>Rol de pagos individual</td>
   <td>Mes:</td>
   <th>May </th>
   <th> de 2020</th>
  </tr>
  <tr>
   <td>Empleado</td>
   <td>Heibert Joseph Ocaña Rodriguez</td>
  </tr>
  <tr>
   <td>Cargo</td>
   <td>Desarrollador Web</td>
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
   <td><strong>$</strong> <span>340,00</span></td>
   <td>Aportes IESS</td>
   <td><strong>$</strong> <span>41,14</span></td>
  </tr>
  <tr>
   <td>Horas extras</td>
   <td><strong>$</strong> <span>0,00</span></td>
   <td>Prestamos Quirogr. IESS</td>
   <td><strong>$</strong> <span>0,00</span></td>
  </tr>
  <tr>
   <td>Comisiones</td>
   <td><strong>$</strong> <span>100,00</span></td>
   <td>Prest. Y Antic. Empresa</td>
   <td><strong>$</strong> <span>0,00</span></td>
  </tr>
  <tr>
   <td>TOTAL INGRESOS</td>
   <td><strong>$</strong> <span>440,00</span></td>
   <td>TOTAL DESCUENTOS</td>
   <td><strong>$</strong> <span>41,14</span></td>
  </tr>
   <tr>
    <td colspan="2">NETO A PAGAR</td>
    <td colspan="2"><strong>$</strong> <span>398,86</span></td>
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
<!-- <div class="principalContenedor">
 </div> -->
</body>
</html>
