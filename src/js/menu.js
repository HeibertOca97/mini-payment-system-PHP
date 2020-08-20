$( document ).ready( () => {
  //FUNION QUE MUESTRA Y OCULTA LA BARRA MENU - AL HACER CLICK EN EL BTNMENU
  $( "#btnMenu" ).click( () => {
    $( "#btnMenu" ).toggleClass( "true" );
    let estilo;

    if ( $( "#btnMenu" ).hasClass( "true" ) ) {
      estilo = {
        "border": "2px solid transparent",
        "background-color": "rgb(15, 15, 15)"
      };
      $( ".box_menu" ).fadeIn( 300 );
      $( "#box_fondo" ).fadeIn( 300 );
    } else {
      estilo = {
        "border": "",
        "background-color": ""
      };
      $( ".box_menu" ).fadeOut( 300 );
      $( "#box_fondo" ).fadeOut( 300 );
    }

    $( "#btnMenu" ).css( estilo );
  } ); 
  //FUNCION QUE MUESTA EL ENUNCIADO DE CADA MENU
  for ( let i = 0; i < $( ".link" ).length; i++ ) {
    $( ".link" ).eq( i ).on( {
      mouseenter: e => {
        $( ".link" ).eq( i ).html( "<p>" + e.target.getAttribute( "name" ) + "</p>" );
      },
      mouseleave: e => {
        $( ".link" ).eq( i ).html( "" );
      },
      click:()=>{
       render($( ".link" ).eq( i ).attr("name"));
      }
    } ); 
  }


} );

function render(vista){
 switch (vista) {
  case "inicio":
   location.href = "index.php?controller=Sesiones&action=index";
  break;
  case "registro":
    location.href = "index.php?controller=Empleados&action=ver";
  break;
  case "pagos":
    location.href = "index.php?controller=Reportes&action=ver";
  break;
  default:
  break;
 }
}

function toggleMensaje( el, msg ){
  const icono = `<span class="${el}"></span> ${msg} <strong id="deshacer">Deshacer</strong>`;
  return icono;
}

function removerMensaje(){
 setTimeout( () => {
  $( '#msg_evento' ).slideUp( '300' );
  $( '#msg_evento' ).html( '' );
  $( '#msg_evento' ).addClass( '' );
  $( '#msg_evento' ).removeClass( 'cl_correcto' );
  $( '#msg_evento' ).removeClass( 'cl_atencion' );
 }, 5000 );
 $( '#deshacer' ).click( () => {
  $( '#msg_evento' ).slideUp( '300' );
  $( '#msg_evento' ).html( '' );
  $( '#msg_evento' ).addClass( '' );
  $( '#msg_evento' ).removeClass( 'cl_correcto' );
  $( '#msg_evento' ).removeClass( 'cl_atencion' );
 } );
}

var regresarAtraz = ()=>{
 const url = ()=> render("inicio");
 $(".btnInicio").click(url);
}