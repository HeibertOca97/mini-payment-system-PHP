<link rel="stylesheet" href="src/css/registros.css">
<script src="src/js/app.empleados.js"></script>
<!--MENSAJES-->
<strong id="msg_evento" class=""></strong>
<!--MODAL-->
<div id="modals"></div>
<!--MODAL FORMULARIO-->
<article class="box_fr">
 <form action="" method="post" id="fr_empleado">
  <span class="icon-cancel" id="box-cerrar"></span>
    <section>
      <article>
        <div>
         <input type="hidden" id="id" name="id" value="">
          <label for="">No. Identificacion</label>
          <input type="text" name="cedula" id="cedula" class="requerido" placeholder="No. Cedula"
            autocomplete="off" maxlength="10">
          <span class="msg_inputs"></span>
        </div>
        <div>
          <label for="">Nombres</label>
          <input type="text" name="nombre" id="nombre" class="requerido" placeholder="Nombre completo"
            autocomplete="off" maxlength="30">
          <span class="msg_inputs"></span>
        </div>
        <div>
          <label for="">Apellidos</label>
          <input type="text" name="apellido" id="apellido" class="requerido" placeholder="Apellido completo"
            autocomplete="off" maxlength="30">
          <span class="msg_inputs"></span>
        </div>
        <div>
          <label for="">Sexo</label>
          <select name="sexo" id="sexo">
            <option value="M">Seleccione su genero</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </article>
      <article>
        <div>
          <label for="">Edad</label>
          <input type="number" name="edad" id="edad" class="requerido" autocomplete="off" maxlength="2">
          <span class="msg_inputs"></span>
        </div>
        <div>
          <label for="">Cargo</label>
          <select name="cargo" id="cargo">
          </select>
        </div>
        <div>
          <label for="">Sueldo</label>
          <input type="number" name="sueldo" id="sueldo" class="requerido" autocomplete="off" readonly>
          <span class="msg_inputs"></span>
        </div>
       </article>
    </section>
    <article id="nota-info"></article>
    <div class="box-btnRegistra">
      <button id="btn_registrar" class="icon-plus">Registrar</button>
    </div>
  </form>
 </article>
<!--CONTENIDO-->
<div id="interface_registro_empleados">
  <h1>Gestion de Empleados</h1>
  <section class="barra_ruta fondoElementos principalContenedor">
    <strong class="icon-gauge btnInicio">Tablero</strong>
    <span>/</span>
    <strong>Empleados</strong>
  </section>
  <div class="box_btn">
    <button class="icon-users" id="btnNuevo">Nuevo</button>
  </div>
  
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
  <!--TABLA-->
  <article id="cont_tb_empleados" class="fondoElementos principalContenedor">
    <table id="tb_empleados">
      <thead>
        <tr>
          <th>Cedula</th>
          <th>Nombres completos</th>
          <th>Cargo</th>
          <th>Edad</th>
          <th>Salario</th>
          <th>Fecha Inicio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="datos_empleados">
      </tbody>
    </table>
  </article>
</div>