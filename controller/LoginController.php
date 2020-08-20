<?php
class LoginController extends ControladorBase{

  public function validacionUsuario(){
    $user = new Usuario('usuarios');
    $sesion = new Sesion();
    if(isset($_SESSION['usuario'])){
     $this->redirect('Sesiones','index');
    }
    else if(isset($_POST['usuario']) && isset($_POST['contraseña'])){
     if($user->consultar($_POST['usuario'],$_POST['contraseña'])){
      $user->__set('user',$_POST['usuario']);
      $user->__set('pass',$_POST['contraseña']);
      $sesion->usuarioSesion($user->__get('user'));
      echo 1;
     }else{
      echo 2;
     }
    }else{
     $this->view('login',[]);     
    }
  }
  
  public function cerrarSession(){
   $session = new Sesion();
   session_destroy();
   session_unset();
   $this->redirect('login','validacionUsuario');
  }

}
?>