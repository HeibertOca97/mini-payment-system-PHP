/*****************
METODO RENDER 
ESTA FUNCION RECIBE COMO PARAMETRO UNA URL QUE 
*******************/
function render( url, contenido ) {
 $.get( url, data => {
  $( '#' + contenido ).load( data );
 } );
}

function validarRender( fileName ) {
 let linkName = fileName == null || fileName == undefined || fileName == "" ? "inicio" : fileName;
 localStorage.setItem( "vista", linkName );
 let urlNameFile = localStorage.getItem( "vista" );

 switch ( urlNameFile ) {
  case urlNameFile:
   render( "view/" + urlNameFile + ".html", "box_content" );
   break;

  default:
   render( "view/inicio.html", "box_content" );
   break;
 }
}

$( document ).ready( () => {
 validarRender( localStorage.getItem( "vista" ) );
 $( "#box_link" ).click( e => {
  validarRender( e.target.getAttribute( "link" ) );
 } );
} );