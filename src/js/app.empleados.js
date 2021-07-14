$(document).ready(() => {
  buscarDatos();
  //requestAnimationFrame( getDatosEmpleados );
  //FUNCION 1
  //FUNCION ENCARGADA DE REDIRECCIONAR LA VISTA
  regresarAtraz();
  //FUNCION 2
  //FUNCION ENCARGADA DE OBTENER LOS DATOS DE LA DB
  getDatosEmpleados();
  //FUNCION 3
  //FUNCION ENCARGADA DE ENVIAR LOS DATOS AL SERVIDOR
  // $( "#btn_registrar" ).click( accionarRegistroInfoEmpleados);
  $("#btn_registrar").click(validarAcciones);
  //FUNCION ENCARGADA DE OBTENER LOS CARGOS
  getCargos();
  //FUNCION ENCARGADA DE OBTENER LOS SALARIOS DE LOS CARGOS
  getSalarioCargo();
  //FUNCIONALIDADES
  accionarToggleForm();
  //FUNCION ENCARGADA DE REMOVER LOS ESTILOS DEL FORMULARIO
  removerEstilosError();
});

var getNumberData = (info = "") => {
  $.get("index.php?controller=Empleados&action=listar", (data) => {
    const numberData = JSON.parse(data).length;
    if (numberData > 0) {
      $("#info_datos").html(`<p>Total: registros ${numberData} ${info}</p>`);
    }
  });
};
var validarAcciones = () => {
  const accion =
    $("#btn_registrar").text() == "Registrar"
      ? accionarRegistroInfoEmpleados
      : accionarActualizarInfoEmpleados;
  return accion();
};
var accionarRegistroInfoEmpleados = () => {
  $("#fr_empleado").submit((e) => {
    e.preventDefault();
    if (validarFr()) {
      //ENVIAR LOS REGISTROS
      registrarEmpleado($("#fr_empleado"));
      const el = toggleMensaje("icon-ok", "Registro exitoso");
      $("#msg_evento").html(el);
      $("#msg_evento").addClass("cl_correcto");
      $("#msg_evento").slideDown("300");
      requestAnimationFrame(getDatosEmpleados);
      //LIMPIAR LOS CAMPOS
      accionarLimpiarInputs();
      $("#btnNuevo").css({ "background-color": "", color: "" });
      $("#btn_registrar").text("Registrar");
      $(".box_fr").slideUp(300);
    } else {
      const el = toggleMensaje(
        "icon-attention",
        "Invalido, por favor verifique los campo requeridos."
      );
      $("#msg_evento").html(el);
      $("#msg_evento").addClass("cl_atencion");
      $("#msg_evento").slideDown("300");
      accionarEstilosEventoError();
    }
    removerMensaje();
  });
};
var accionarActualizarInfoEmpleados = () => {
  $("#fr_empleado").submit((e) => {
    e.preventDefault();
    if (validarFr()) {
      //ENVIAR LOS REGISTROS
      actualizarEmpleado($("#fr_empleado"));
      const el = toggleMensaje("icon-ok", "Actualizacion exitoso");
      $("#msg_evento").html(el);
      $("#msg_evento").addClass("cl_correcto");
      $("#msg_evento").slideDown("300");
      requestAnimationFrame(getDatosEmpleados);
      //LIMPIAR LOS CAMPOS
      accionarLimpiarInputs();
      $("#nota-info").html("");
      $("#btnNuevo").css({ "background-color": "", color: "" });
      $("#btn_registrar").text("Actualizar");
      $(".box_fr").slideUp(300);
      removeEventListener("load", getInfoInputs);
    } else {
      const el = toggleMensaje(
        "icon-attention",
        "Invalido, por favor verifique los campo requeridos."
      );
      $("#msg_evento").html(el);
      $("#msg_evento").addClass("cl_atencion");
      $("#msg_evento").slideDown("300");
      accionarEstilosEventoError();
    }
    removerMensaje();
  });
};

var getInfoInputs = () => {
  for (let i = 0; i < $(".btnUpdate").length; i++) {
    $(".btnUpdate")
      .eq(i)
      .click(() => {
        $("#btn_registrar").text("Actualizar");
        $(".box_fr").css("opacity", 1);
        $(".box_fr").slideDown(300);
        const dt = { id: $(".btnUpdate").eq(i).attr("idEmp") };
        $.post(
          "index.php?controller=Empleados&action=consultarPorId",
          dt,
          (res) => {
            const datos = JSON.parse(res);
            const {
              id,
              cedula,
              nombres,
              apellidos,
              edad,
              sexo,
              nombre,
            } = datos;
            $("#id").val(id);
            $("#cedula").val(cedula);
            $("#nombre").val(nombres);
            $("#apellido").val(apellidos);
            $("#edad").val(edad);
            const genero = sexo == "M" ? "Masculino" : "Femenino";
            const el = `
     <div>
      <h3>Nota:</h3>
      <p>Antes de actualizar verifique que los datos que no halla modificado sean los mismo. A continuacion vera los anteriores datos que tenia: <b>Cedula:</b> ${cedula}, <b>Nombres:</b> ${nombres}, <b>Apellidos:</b> ${apellidos}, <b>edad:</b> ${edad}, <b>Sexo:</b> ${genero}, <b>Cargo:</b> ${nombre}</p>
      <p><strong>Si cree que ya tiene todo listo proceda a actualizar los datos</strong></p>
     </div>
    `;
            $("#nota-info").html(el);
          }
        );
      });
  }
};
//FUNCION QUE VALIDA LOS CAMPOS QUE SEAN REQUERIDOS
var validarFr = () => {
  var inputs = document.getElementsByClassName("requerido"),
    verificar = true;

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      verificar = false;
      break;
    }
  }

  if (verificar == true) {
    return verificar;
  }
};
//FUNCION QUE INDICA LOS CAMPOS REQUERIDOS O VACIOS

var accionarEstilosEventoError = () => {
  let inputs = document.getElementsByClassName("requerido"),
    span = document.getElementsByClassName("msg_inputs");

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      span[i].innerHTML =
        "Campo " + inputs[i].getAttribute("id") + " requerido";
      span[i].classList.add("msg_span");
      inputs[i].style.border = "2px solid red";
    }
  }
};
//FUNCION QUE REMUEVE LOS ESTILOS DE LOS CAMPOS CON ERRORES O CON DATOS INVALIDOS
var removerEstilosError = () => {
  var inputs = document.getElementsByClassName("requerido"),
    span = document.getElementsByClassName("msg_inputs");

  for (let j = 0; j < inputs.length; j++) {
    inputs[j].addEventListener("focus", () => {
      inputs[j].style.border = "2px solid #ccc";
      span[j].classList.remove("msg_span");
      span[j].innerHTML = "";
    });
  }
};
var removerEstilosErrorInputs = () => {
  var inputs = document.getElementsByClassName("requerido"),
    span = document.getElementsByClassName("msg_inputs");

  for (let j = 0; j < inputs.length; j++) {
    inputs[j].style.border = "2px solid #ccc";
    span[j].classList.remove("msg_span");
    span[j].innerHTML = "";
  }
};
//FUNCION QUE LIMPIA TODO LOS INPUTS
var accionarLimpiarInputs = () => {
  var inputs = document.querySelectorAll("input");

  for (let j = 0; j < inputs.length; j++) {
    if (inputs[j].value) {
      inputs[j].value = "";
    }
  }
};
//FUCION ENCARGADA DE ENVIAR Y GUARDAR LOS DATOS EN LA BD
var registrarEmpleado = (formulario) => {
  $.ajax({
    url: "index.php?controller=Empleados&action=crear",
    type: "post",
    data: formulario.serialize(),
    success: (res) => {
      //ACTUALIZA LOS REGISTROS
      getDatosEmpleados();
    },
  });
};
//FUCION ENCARGADA DE ENVIAR Y ACTUALIZAR LOS DATOS EN LA BD
var actualizarEmpleado = (formulario) => {
  $.ajax({
    url: "index.php?controller=Empleados&action=editar",
    type: "post",
    data: formulario.serialize(),
    success: (res) => {
      //ACTUALIZA LOS REGISTROS
      getDatosEmpleados();
    },
  });
};
//FUNCION 2
//FUNCION DE IMPRIMIR LOS DATOS
//FUNCION UTILIZADA PARA ACTUALIZAR LOS REGISTROS
var getDatosEmpleados = () => {
  $.get("index.php?controller=Empleados&action=consultar", (res) => {
    let tr = ``;
    if (res != "false") {
      const req = JSON.parse(res);
      req.filter((datos) => {
        const {
          id,
          cedula,
          nombres,
          apellidos,
          edad,
          nombre,
          fecha,
          sueldo,
        } = datos;

        tr += `
       <tr>
           <td>${cedula}</td>
           <td>${nombres} ${apellidos}</td>
           <td>${nombre}</td>
           <td>${edad}</td>
           <td>${sueldo}</td>
           <td>${fecha}</td>
           <td><button idEmp="${datos[0]}" class="icon-trash-empty btnDelete"></button><button idEmp="${datos[0]}" class="icon-edit btnUpdate"></button></td>
       </tr>
     `;
      });
      $("#datos_empleados").html(tr);
      getNumberData();
      eliminarDato();
      getInfoInputs();
    } else {
      $("#datos_empleados").html("");
    }
  });
};
/**************
 * DELETE
 * *************/
var eliminarDato = () => {
  for (let i = 0; i < $(".btnDelete").length; i++) {
    $(".btnDelete")
      .eq(i)
      .click((e) => {
        const el = e.target;
        const valor = el.getAttribute("idEmp");
        const verificar = confirm(
          "Desea elminar permanentemente el dato seleccionado"
        )
          ? valor
          : false;
        const fila = el.parentElement.parentElement;
        if (verificar !== false) {
          $.post("index.php?controller=Empleados&action=eliminar", {
            id: valor,
          });
          fila.parentElement.removeChild(fila);
          getNumberData();
          const el = toggleMensaje(
            "icon-ok",
            "Informacion de empleado y/o trabajador eliminado"
          );
          $("#msg_evento").html(el);
          $("#msg_evento").addClass("cl_correcto");
          $("#msg_evento").slideDown("300");
          removerMensaje();
        }
      });
  }
};
/****************
 * BUSCADOR
 * ***************/
var buscarDatos = () => {
  const datosABuscar = () => {
    if (
      $("#txtBuscar").val() &&
      $("#txtBuscar").length > 0 &&
      $("#txtDato").val()
    ) {
      const inputBuscador = {
        columna: $("#txtDato").val(),
        dato: $("#txtBuscar").val(),
      };
      let tr = ``;
      $.post(
        "index.php?controller=Empleados&action=consultar",
        inputBuscador,
        (res) => {
          if (res != "false") {
            const datos = JSON.parse(res);
            datos.filter((data) => {
              const {
                id,
                cedula,
                nombres,
                apellidos,
                edad,
                nombre,
                sueldo,
                fecha,
              } = data;
              tr += `
       <tr>
        <td>${cedula}</td>
        <td>${nombres} ${apellidos}</td>
        <td>${nombre}</td>
        <td>${edad}</td>
        <td>${sueldo}</td>
        <td>${fecha}</td>
        <td><button idEmp="${id}" class="icon-trash-empty btnDelete"></button><button idEmp="${id}" class="icon-edit btnUpdate"></button></td>
       </tr>
     `;
            });
            $("#datos_empleados").html(tr);
            getNumberData(`| encontrados ${datos.length}`);
            eliminarDato();
            getInfoInputs();
          } else {
            let tr = `<tr><td colspan="7" style="text-align:center;color:#fff;line-height:3em;">El dato ingresado no existe</td></tr>`;
            $("#datos_empleados").html(tr);
            getNumberData();
          }
        }
      );
    } else {
      getDatosEmpleados();
    }
  };
  $("#txtBuscar").keyup(datosABuscar);
};
/****************
 * FUNCIONALIDADES DE LA INTERFAZ
 * ***************/
var accionarToggleForm = () => {
  const abrirVentana = () => {
    const estilo = { "background-color": "#fff", color: "rgb(20, 71, 189)" };
    $(".box_fr").slideDown(300);
    $(".box_fr").css("opacity", 1);
    $("#btnNuevo").css(estilo);
  };
  const cerrarVentana = () => {
    $(".box_fr").slideUp(300);
    const estilo = { "background-color": "", color: "" };
    $("#btnNuevo").css(estilo);
    accionarLimpiarInputs();
    $("#nota-info").html("");
    $("#btn_registrar").text("Registrar");
    removerEstilosErrorInputs();
    removeEventListener("load", getInfoInputs);
  };
  //POR DEFECTO VENTANA OCULTA
  $(".box_fr").slideUp(300);
  //FUNCIONALIDAD QUE MUESTRA LA VENTANA
  $("#btnNuevo").click(abrirVentana);
  //FUNCIONALIDAD QUE OCULTA LA VENTANA
  $("#box-cerrar").click(cerrarVentana);
  $(window).keyup((e) => {
    if (e.keyCode == 27) cerrarVentana();
  });
};

var getCargos = () => {
  $.get("index.php?controller=Cargos&action=listar", (res) => {
    if (res != "false") {
      let opciones = ``;
      opciones += `<option value="">Seleccione un cargo de la lista</option>`;
      const datos = JSON.parse(res);
      datos.forEach((x, z) => {
        opciones += `
     <option value="${x.id}" class="txtCargos">${x.nombre}</option>
    `;
      });
      $("#cargo").html(opciones);
    }
  });
};

var getSalarioCargo = () => {
  $("#cargo").change(() => {
    const id = { id: $("#cargo").val() };
    $.post("index.php?controller=Cargos&action=consultar", id, (res) => {
      const salario = JSON.parse(res);
      salario.filter((x) => $("#sueldo").val(x.sueldo));
    });
  });
};
