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
    
   break;
  default:
   break;
 }
}