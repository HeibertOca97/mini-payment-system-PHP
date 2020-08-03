$( document ).ready( () => {
  //listarDatos();
  //requestAnimationFrame( getDatosEmpleados );
  getDatosEmpleados();
  removerEstilosError();
  accionarRegistroEmpleados();
  eliminarDato();
  //FUNCIONALIDADES
  accionarToggleForm();
  modals();
} );

var getNumberData = () => {
  $.get( "controller/EmpleadosController.php?listar", data => {
    const numberData = JSON.parse( data ).length;
    $( '#box-barra-opciones div:first' ).html( `<p>Total de registros ${numberData}</p>` );
  } );
}

var accionarRegistroEmpleados = () => {
  $( "#btn_registrar" ).click( () => {
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
    } );
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
    url: "controller/EmpleadosController.php",
    type: "post",
    data: formulario.serialize(),
    success: res => {
      //ACTUALIZA LOS REGISTROS
      //getDatosEmpleados();
    }
  } );
}
//FUNCION DE IMPRIMIR LOS DATOS
//FUNCION UTILIZADA PARA ACTUALIZAR LOS REGISTROS
var getDatosEmpleados = () => {
  console.log( 'Se ejecuto' );
  $.get( "controller/EmpleadosController.php?listar", data => {
    const res = JSON.parse( data );
    res.map( datos => {
      const {
        cedula,
        nombres,
        apellidos,
        edad,
        cargo,
        sueldo,
        fecha
      } = datos;
      imprimirData( cedula, nombres, apellidos, edad, cargo, sueldo, fecha );
    } );
    getNumberData();
  } );
}
var imprimirData = ( cedula, nombres, apellidos, edad, cargo, sueldo, fecha ) => {
  let tr = ``;
  tr += `
    <tr>
        <td>${cedula}</td>
        <td>${nombres} ${apellidos}</td>
        <td>${cargo}</td>
        <td>${edad}</td>
        <td>${sueldo}</td>
        <td>${fecha}</td>
    </tr>
  `;
  $( '#datos_empleados' ).append( tr );
}

var listarDatos = () => {
  $.get( "controller/EmpleadosController.php?listar", res => {
    const datos = JSON.parse( res );
    let tr = ``;

    if ( datos !== null ) {
      datos.forEach( dato => {
        tr += `
        <tr>
          <td>${dato.cedula}</td>
          <td>${dato.nombres}</td>
          <td>${dato.apellidos}</td>
          <td>${dato.sexo}</td>
          <td>${dato.edad}</td>
          <td>${dato.cargo}</td>
          <td>${dato.sueldo}</td>
          <td>${dato.fecha}</td>
        </tr>
        `;
      } );
      $( "#datos_empleados" ).html( tr );
    }
  } );
}

/**************
 * DELETE
 * *************/
var eliminarDato = () => {
  $( '.btnDelete' ).click( e => {
    const el = e.target;
    const valor = el.getAttribute( 'idEl' );
    //console.log( valor );
    const res = confirm( "Desea elminar permanentemente el dato seleccionado" ) ? valor : false;
    const fila = el.parentElement.parentElement;
    if ( res ) {
      fila.parentElement.removeChild( fila );
      getNumberData();
    }
  } );
}
/****************
 * BUSCADOR
 * ***************/
/****************
 * FUNCIONALIDADES DE LA INTERFAZ
 * ***************/
var accionarToggleForm = () => {
  const formularioEvent = () => {
    const estilo = $( '#btnNuevo' ).css( 'background-color' ) == 'rgba(0, 0, 0, 0)' ? [ 'rgba(0,0,0,.7)', 'rgba(255,255,255,.8)', true ] : [ 'rgba(0, 0, 0, 0)', 'rgb(46, 46, 46)', false ];
    $( '#btnNuevo' ).css( {
      'background-color': estilo[ 0 ],
      'color': estilo[ 1 ]
    } );
    estilo[ 2 ] == true ? $( '#fr_empleado' ).slideDown( '300' ) : $( '#fr_empleado' ).slideUp( '300' );
  }

  $( '#btnNuevo' ).click( formularioEvent );
  //$( '#btnNuevo' ).click( modals() );
}

var toggleMensaje = ( el, msg ) => {
  const icono = `<span class="${el}"></span> ${msg} <strong id="deshacer">Deshacer</strong>`;
  return icono;
}
/********MODALS********/
var modals = () => {
  $( '#modals' ).fadeOut( '300' );
  /*
  $( '#btnNuevo' ).click( () => {
    $( '#modals' ).fadeIn( '300' );
  } );
  $( '#modals' ).click( () => {
    $( '#modals' ).fadeOut( '300' );
  } );
  $( window ).keyup( ( e ) => {
    console.log( e.which + ' ' + e.key )
    e.which === 27 || e.key === "Escape" ? $( '#modals' ).fadeOut( '300' ) : false;
  } )
  */
}