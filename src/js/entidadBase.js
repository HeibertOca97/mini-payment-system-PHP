class entidadBase {
 constructor() {
  this.nombres
 }
 ver() {
  return this.nombres;
 }
}

$( document ).ready( () => {
 $.get( 'index.php?controller=Sesiones&action=DatosSesion', res => {

 } );
 // fetch( 'index.php?controller=Sesiones&action=DatosSesion' )
 //  .then( x => x.json() )
 //  .then( x => x.filter( res => console.log( res.id ) ) )
} )