$( document ).ready( () => {
 validarIngresoSistema();
 removerEstilos();
} );

function validarIngresoSistema() {
 $( "button" ).click( () => {
  if ( validarInputs() ) {
   enviarPeticion( $( "#usuario" ).val(), $( "#contraseña" ).val() );
  }
 } );
 $( '#usuario, #contraseña' ).keyup( ( e ) => {
  if ( e.keyCode === 13 ) {
   if ( validarInputs() ) {
    enviarPeticion( $( "#usuario" ).val(), $( "#contraseña" ).val() );
   }
  }
 } );
}

const validarInputs = () => {
 const input = $( "input" );
 let verificar = true;

 for ( let i = 0; i < input.length; i++ ) {
  if ( !$( input ).eq( i ).val() ) {
   //ESTILOS DEL INPUT
   $( input ).eq( i ).css( "border", "2px solid red" );
   //ESTILOS DEL SPAN
   let nombreCampo = $( input ).eq( i ).attr( "id" );
   $( input ).eq( i ).next().text( `Campo ${nombreCampo} obligatorio` );
   $( input ).eq( i ).next().css( "display", "block" );
   verificar = false;
  }
 }
 if ( verificar ) {
  return true;
 }
};

function removerEstilos() {
 const input = $( "input" );

 for ( let i = 0; i < input.length; i++ ) {
  if ( !$( input ).eq( i ).val() ) {
   $( input ).eq( i ).focus( () => {
    $( input ).eq( i ).css( "border", "" );
    //ESTILOS DEL SPAN
    $( input ).eq( i ).next().text( "" );
    $( input ).eq( i ).next().css( "display", "none" );
    $( "#msg_incorrecto" ).children().html( "" );
   } );
  }
 }
}

function enviarPeticion( user, pass ) {
 const datos = {
  usuario: user,
  contraseña: pass,
 };
 $.post( "index.php?controller=Login&action=validacionUsuario", datos, ( res ) => {
  if ( res == 1 ) {
   window.location = "index.php?controller=Sesiones&action=index";
  } else {
   $( "#msg_incorrecto" ).children().html( "Usuario y/o contraseña incorrecta" );
  }
 } );
}