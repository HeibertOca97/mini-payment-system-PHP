<!--CSS-->
<link rel="stylesheet" href="src/css/inicio.css">
<!--JS-->  
<script src="src/js/index.js"></script>
<!--HTML-->
<div id="componenteInicio" class="principalContenedor">
 <!--MENSAJES-->
 <strong id="msg_evento" class=""></strong>
 <div>
  <h1 class="fondoElementos"><i class="icon-gauge"></i>Tablero</h1>
 </div> 
 <div class="contenedor_datos fondoElementos">
  <!--OBJETO 1-->
  <div>
   <h3 class="icon-user">Usuarios</h3>
   <p id="numUsuarios"></p>
  </div>
  <!--OBJETO 1-->
  <div>
   <h3 class="icon-address-card"> Empleados</h3>
   <p id="numEmpleados"></p>
  </div>
  <!--OBJETO 1-->
  <div>
   <h3 class="icon-list-alt"> Cargos</h3>
   <p id="numCargos"></p>
  </div>
 </div>
 <section id="box-cargos" class="fondoElementos">
  <article>
   <div>
    <label for="">Ingresar cargo:</label>
    <input type="text" id="txtCargo">
   </div>
   <div>
    <label for="">Ingresar sueldo:</label>
    <input type="number" id="txtSueldo">
   </div>
   <div>
    <button id="crearCargos" idcar="">Crear</button>
   </div>
  </article>
  <aside id="lista_cargos"></aside>
 </section>
</div>