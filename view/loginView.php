<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Login</title>
 <!--FUENTES-->
 <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"> 
 <link href="https://fonts.googleapis.com/css2?family=Ranchers&display=swap" rel="stylesheet">
 <!--ICONOS-->
 
 <!--CSS-->
 <link rel="stylesheet" href="src/css/login.css">
 <!--LIBRERIA JS-->
 <script src="src/lib/jquery-3.4.1.min.js"></script>
</head>

<body>
 <img src="src/image/img9.jpg" alt="">
 <section>
  <article>
   <h1>Ingreso al Sistema de pago</h1>
   <div id="msg_incorrecto">
    <p></p>
   </div>
   <div>
    <input type="text" id="usuario" placeholder="Usuario" autocomplete="off">
    <span class="icon-attention msg_aviso"></span>
   </div>
   <div>
    <input type="password" id="contraseña" placeholder="Contraseña" autocomplete="off">
    <span class="icon-attention msg_aviso"></span>
   </div>
   <div>
    <button type="submit">Ingrese</button>
   </div>
  </article>
 </section>
 <script src="src/js/validacionLogin.js"></script>
</body>

</html>