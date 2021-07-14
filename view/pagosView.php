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
  <p>Acontinuacion tenemos una simulacion para generar los roles de pago de nuestros trabajadores o empleados. Para ello deberas selecionar una fecha "Dia/Mes/Año". <b>Opcional</b> Ubicar horas extras mas el porciento de recargo de esas horas o tambien llenar el campo para un prestamo y/o anticipo.</p>
  <div>
   <article>
    <label>Fecha de emision:</label>
    <input type="date" id="txt_fecha">
   </article>
   <article>
    <label>Horas extras</label>
    <input type="number" id="txt_horas">
    <label>Recargos</label>
    <select id="txt_recargo">
     <option value="0">...</option>
     <option value="25">25%</option>
     <option value="50">50%</option>
     <option value="100">100%</option>
    </select>
   </article>
   <article>
    <label>Prestamo o anticipo:</label>
    <input type="number" id="txt_prestamo">
   </article>
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

<section id="box-detalle" class="fondoElementos principalContenedor">
 <h3><i class="icon-upload-cloud"></i> Abrir y/o Descargar documento</h3>
 <p>Realice la busqueda del documento aqui.</p>
 <p>Para realizar esta busqueda solamente necesita digitar los siguientes datos: numero de cedula, nombres o los apellidos. Esto debera seleccionar en el campo lista que encontrara al lado del buscador</p>
</section>
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
 <div id="card-datos" class="fondoElementos principalContenedor"></div>