<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Pago</title>
  <!--FUENTES - ICONOS-->
  <link rel="stylesheet" href="src/iconos/css/fontello.css">
  <!--SCRIPT-->
  <script src="src/lib/jquery-3.4.1.min.js"></script>
  <!--<script src="src/js/render.js"></script>-->
  <script src="src/js/menu.js"></script>
  <script src="src/js/entidadBase.js"></script>
  <!--CSS-->
  <link rel="stylesheet" href="src/css/index.css">
</head>

<body>
  <header>
    <div>
      <strong id="btnMenu" class="icon-menu"></strong>
      <strong>Sistema de Pago</strong>
    </div>
  </header>
  <nav class="box_menu">
    <div id="box_link">
      <strong class="icon-gauge link" link="inicio" name="Inicio"></strong>
      <strong class="icon-users link" link="registro" name="Registro"></strong>
      <strong class="icon-list-alt link" link="pagos" name="Pagos"></strong>
    </div>
  </nav>
  <div id="box_fondo"></div>
  <!--CONTENEDOR DE ELEMENTOS-->
  <section id="root">
  <?php
  $vistaArchivo = "inicio";
   if(isset($vistaArchivo)){
    require_once "view/".$vistaArchivo."View.php";
    echo '<a href="index.php?controller=Sesiones&action=Logout">Salir del sitio</a>';
   }
  ?>
   <footer>
    <p>Sistema de pagos</p>
    <p>Desarrollado por estudiantes de la UNESUM. Carrera de Ingenieria en Computacion y Redes</p>
   </footer>
  </section>
</body>

</html>