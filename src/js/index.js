//FUNCION QUE OBTIENE EL NUMERO DE REGISTROS DE LA TABLA
//IMPRIME LOS VALORES EN LA PAGINA
const obtenerNumeroRegistros = (controlador,accion,el)=>{
 const url = `index.php?controller=${controlador}&action=${accion}`;
 $.get(url,res=>{
  if(res == 'false'){
   $(el).html("0");
  }else{
   const resultados = JSON.parse(res);
   $(el).html(resultados.length);
  }     
 });
}

const listarCargos = ()=>{
 const url = `index.php?controller=Cargos&action=listar`;
 $.get(url,res=>{
  if(res=='false'){
   $("#lista_cargos").html("<strong>Por el momento no ha ningun registro</strong>");
  }else{
   const datos = JSON.parse(res);
   let el=``;
   datos.filter(cargo=>{
    el += `
     <strong class="cargos">${cargo.nombre}</strong>
    `;
   })
   $("#lista_cargos").html(el);
  }
 });
}
const crearCargos = ()=>{
 const url = `index.php?controller=Cargos&action=crear`;
 const objeto = {
  nombre:$('#txtCargo').val(),
  sueldo:$('#txtSueldo').val()
 }
 $.post(url,objeto,res=>{console.log(res)});
 listarCargos();
}

$(document).ready(()=>{
 obtenerNumeroRegistros('Usuarios','listar','#numUsuarios');
 obtenerNumeroRegistros('Empleados','listar','#numEmpleados');
 obtenerNumeroRegistros('Cargos','listar','#numCargos');

 listarCargos();
 $("#crearCargos").click(crearCargos);
});