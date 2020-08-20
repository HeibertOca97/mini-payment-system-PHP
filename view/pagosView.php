<!--CSS-->
<link rel="stylesheet" href="src/css/reportes.css">
<!--JS-->
<script src="src/js/reportePagos.js"></script>
<!--MENSAJES-->
<strong id="msg_evento" class=""></strong>
<!--HTML-->
<div id="interface_reporte_pagos">
 <h1>Gestion de Pagos</h1>
 <section class="barra_ruta fondoElementos principalContenedor">
  <strong class="icon-gauge btnInicio">Tablero</strong>
  <span>/</span>
  <strong>Pagos</strong>
 </section>
 <div id="box-barra-opciones">
  <div id="info_datos"></div>
   <div>
    <select name="" id="txtDato">
     <option value="cedula">Cedula</option>
     <option value="nombres">Nombres</option>
     <option value="apellidos">Apellidos</option>
     <option value="nombre">Cargo</option>
    </select>
   </div>
  <div><input type="text" placeholder="Buscar....." autocomplete="off" id="txtBuscar"></div>
 </div>
 <section id="box-detalle" class="fondoElementos principalContenedor">
  <p>Acontinuacion tenemos una simulacion para generar los roles de pago de nuestros trabajadores o empleados. Para ello deberas selecionar una fecha "Dia/Mes/Año", opcional llenar el campo para un prestamo o anticipo.</p>
  <div>
   <label for="">Fecha de emision:</label>
   <input type="date" id="txt_fecha">
   <label for="">Prestamo o anticipo:</label>
   <input type="number" id="txt_prestamo">
  </div>
 </section>
 <div id="cont_tb_empleados" class="fondoElementos principalContenedor">
  <table id="tb_empleados">
   <thead>
    <tr>
     <th>Cedula</th>
     <th>Nombres completos</th>
     <th>Cargo</th>
     <th>Sueldo</th>
     <th>Accion</th>
    </tr>
   </thead>
   <tbody id="datos_pagos_empleados"></tbody>
  </table>
 </div>
</div>
<!--Barra de busqueda 2-->
<div id="box-barra-opciones">
  <div id="info_datos"></div>
   <div>
    <select name="" id="txtDato2">
     <option value="cedula">Cedula</option>
     <option value="nombres">Nombres</option>
     <option value="apellidos">Apellidos</option>
    </select>
   </div>
  <div><input type="text" placeholder="Buscar....." autocomplete="off" id="txtBuscar2"></div>
 </div>
 <div id="" class="fondoElementos principalContenedor">
 <article id="card-datos"></article>
 </div>