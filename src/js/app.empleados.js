$( document ).ready( () => {
  buscarDatos();
  //requestAnimationFrame( getDatosEmpleados );
  //FUNCION 1
  //FUNCION ENCARGADA DE REDIRECCIONAR LA VISTA
  regresarAtraz();
  //FUNCION 2
  //FUNCION ENCARGADA DE OBTENER LOS DATOS DE LA DB
  getDatosEmpleados();
  //FUNCION 3
  //FUNCION ENCARGADA DE REMOVER LOS ESTILOS DEL FORMULARIO
  removerEstilosError();
  //FUNCION 4
  //FUNCION ENCARGADA DE ENVIAR LOS DATOS AL SERVIDOR
   $( "#btn_registrar" ).click( accionarRegistroEmpleados);
  //FUNCIONALIDADES
  accionarToggleForm();
  //FUNCION ENCARGADA DE OBTENER LOS CARGOS
  getCargos();
  //FUNCION ENCARGADA DE OBTENER LOS SALARIOS DE LOS CARGOS
  getSalarioCargo();
} );

var getNumberData = (info='') => {
 $.get( "index.php?controller=Empleados&action=listar", data => {
  const numberData = JSON.parse( data ).length;
  if(numberData>0){
   $( '#info_datos' ).html( `<p>Total: registros ${numberData} ${info}</p>` );
  }
  } );
}

var accionarRegistroEmpleados = () => {
 
    $( "#fr_empleado" ).submit( e => {
      e.preventDefault();
      if ( validarFr() ) {
        //ENVIAR LOS REGISTROS
        registrarEmpleado( $( '#fr_empleado' ) );
        const el = toggleMensaje( 'icon-ok', 'Registro exitoso' );
        $( '#msg_evento' ).html( el );
        $( '#msg_evento' ).addClass( 'cl_correcto' );
        $( '#msg_evento' ).slideDown( '300' );
        requestAnimationFrame( getDatosEmpleados );
        //LIMPIAR LOS CAMPOS
        accionarLimpiarInputs();
      } else {
        const el = toggleMensaje( 'icon-attention', 'Invalido, por favor verifique los campo requeridos.' );
        $( '#msg_evento' ).html( el );
        $( '#msg_evento' ).addClass( 'cl_atencion' );
        $( '#msg_evento' ).slideDown( '300' );
        accionarEstilosEventoError();
      }
      removerMensaje();
    } );
}; //FUNCION QUE VALIDA LOS CAMPOS QUE SEAN REQUERIDOS


var validarFr = () => {
  var inputs = document.getElementsByClassName( "requerido" ),
    verificar = true;

  for ( let i = 0; i < inputs.length; i++ ) {
    if ( !inputs[ i ].value ) {
      verificar = false;
      break;
    }
  }

  if ( verificar == true ) {
    return verificar;
  }
}
//FUNCION QUE INDICA LOS CAMPOS REQUERIDOS O VACIOS

var accionarEstilosEventoError = () => {
  let inputs = document.getElementsByClassName( "requerido" ),
    span = document.getElementsByClassName( "msg_inputs" );

  for ( let i = 0; i < inputs.length; i++ ) {
    if ( !inputs[ i ].value ) {
      span[ i ].innerHTML = "Campo " + inputs[ i ].getAttribute( "id" ) + " requerido";
      span[ i ].classList.add("msg_span");
      inputs[ i ].style.border = "2px solid red";
    }
  }
} //FUNCION QUE REMUEVE LOS ESTILOS DE LOS CAMPOS CON ERRORES O CON DATOS INVALIDOS


var removerEstilosError = () => {
  var inputs = document.getElementsByClassName( "requerido" ),
    span = document.getElementsByClassName( "msg_inputs" );

  for ( let j = 0; j < inputs.length; j++ ) {
    inputs[ j ].addEventListener( "focus", () => {
      inputs[ j ].style.border = "2px solid #ccc";
      span[ j ].classList.remove("msg_span");
      span[ j ].innerHTML = "";
    } );
  }
} //FUNCION QUE LIMPIA TODO LOS INPUTS


var accionarLimpiarInputs = () => {
  var inputs = document.querySelectorAll( "input" );

  for ( let j = 0; j < inputs.length; j++ ) {
    if ( inputs[ j ].value ) {
      inputs[ j ].value = "";
    }
  }
} //FUCION ENCARGADA DE ENVIAR Y GUARDAR LOS DATOS EN LA BD

var registrarEmpleado = formulario => {
  $.ajax( {
    url: "index.php?controller=Empleados&action=crear",
    type: "post",
    data: formulario.serialize(),
    success: res => {
      //ACTUALIZA LOS REGISTROS
      getDatosEmpleados();
     }
  } );
}
//FUNCION 2
//FUNCION DE IMPRIMIR LOS DATOS
//FUNCION UTILIZADA PARA ACTUALIZAR LOS REGISTROS
var getDatosEmpleados = () => {
  $.get( "index.php?controller=Empleados&action=consultar", res => {
   let tr=``;
   if(res != "false"){
    const req = JSON.parse( res );
    req.filter( datos => {
      const {
       id,
        cedula,
        nombres,
        apellidos,
        edad,
        nombre,
        fecha,
        sueldo
      } = datos;
      tr += `
       <tr>
           <td>${cedula}</td>
           <td>${nombres} ${apellidos}</td>
           <td>${nombre}</td>
           <td>${edad}</td>
           <td>${sueldo}</td>
           <td>${fecha}</td>
           <td><button idEmp="${id}" class="icon-trash-empty btnDelete"></button><button class="icon-edit"></button></td>
       </tr>
     `;
    } );
    $( '#datos_empleados' ).html( tr );
    getNumberData();
    eliminarDato();
   }else{
    $( '#datos_empleados' ).html( "" );
   }
  } );
}
/**************
 * DELETE
 * *************/
var eliminarDato = () => {
 for (let i = 0; i < $( '.btnDelete' ).length; i++) {
  $( '.btnDelete' ).eq(i).click( e => {
    const el = e.target;
    const valor = el.getAttribute( 'idEmp' );
    const verificar = confirm( "Desea elminar permanentemente el dato seleccionado" ) ? valor : false;
    const fila = el.parentElement.parentElement;
    if ( verificar != false) {
     $.post("index.php?controller=Empleados&action=eliminar",{id:valor});
     fila.parentElement.removeChild( fila );
      getNumberData();
    }
  } );
 }
}
/****************
 * BUSCADOR
 * ***************/
var buscarDatos = () => {
 const datosABuscar = ()=>{
  if($("#txtBuscar").val() && $("#txtBuscar").length > 0 && $("#txtDato").val()){
   const inputBuscador = {
    columna:$("#txtDato").val(),
    dato:$("#txtBuscar").val()
   }
   let tr=``;
   $.post( "index.php?controller=Empleados&action=consultar",inputBuscador, res => {
    if(res != "false"){
     const datos = JSON.parse(res);
     datos.filter(data => {
      const {
        id,
         cedula,
         nombres,
         apellidos,
         edad,
         nombre,
         sueldo,
         fecha
       } = data;
      tr += `
       <tr>
        <td>${cedula}</td>
        <td>${nombres} ${apellidos}</td>
        <td>${nombre}</td>
        <td>${edad}</td>
        <td>${sueldo}</td>
        <td>${fecha}</td>
        <td><button idEmp="${id}" class="icon-trash-empty btnDelete"></button><button class="icon-edit"></button></td>
       </tr>
     `;  
    });
    $( '#datos_empleados' ).html( tr );
    getNumberData(`| encontrados ${datos.length}`);
     eliminarDato();
    }else{
     let tr = `<tr><td colspan="7" style="text-align:center;color:#fff;line-height:3em;">El dato ingresado no existe</td></tr>`;
     $( '#datos_empleados' ).html(tr);
     getNumberData();
    }
   });
  }else{
   getDatosEmpleados();
  }
 }
 $("#txtBuscar").keyup(datosABuscar);
}
/****************
 * FUNCIONALIDADES DE LA INTERFAZ
 * ***************/
var accionarToggleForm = () => {
  const formularioEvent = () => {
   //VALIDACION DE ESTILO DEL BOTON
   const estilo = $( '#btnNuevo' ).css( 'background-color' ) == 'rgb(20, 71, 189)' ? [ 'rgb(255, 255, 255)', 'rgb(20, 71, 189)', true ] : [ 'rgb(20, 71, 189)', 'rgb(255, 255, 255)', false ];
   //AÑADIENDO ESTILO AL BOTON
    $( '#btnNuevo' ).css( {
      'background-color': estilo[ 0 ],
      'color': estilo[ 1 ]
    } );
    //VALIDACION DE FUNCIONALIDAD DEL BOTON
    estilo[ 2 ] == true ? $( '#fr_empleado' ).slideDown( '300' ) : $( '#fr_empleado' ).slideUp( '300' );
  }

  $( '#btnNuevo' ).click( formularioEvent );
}

var getCargos = ()=>{
 $.get("index.php?controller=Cargos&action=listar",res=>{
  if(res != "false"){
   let opciones=``;
   opciones += `<option value="">Seleccione un cargo de la lista</option>`;
   const datos = JSON.parse(res);
   datos.forEach((x,z)=>{
    opciones += `
     <option value="${x.id}" class="txtCargos">${x.nombre}</option>
    `;
   });
   $("#cargo").html(opciones);
  }
 });
}

var getSalarioCargo = ()=>{
  $("#cargo").change(()=>{
   const id={id:$("#cargo").val()};
   $.post("index.php?controller=Cargos&action=consultar",id,res=>{
    const salario = JSON.parse(res);
    salario.filter(x=>$("#sueldo").val(x.sueldo));
   });
  });
}