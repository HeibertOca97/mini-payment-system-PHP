var generarRolPago = () => {
  for (let b = 0; b < $(".btnGenerar").length; b++) {
    $(".btnGenerar")
      .eq(b)
      .click((e) => {
        //CALCULOS OPERACIONES
        const hr_ext = !$("#txt_horas").val()
          ? 0
          : parseInt($("#txt_horas").val());
        const pre_recargo = parseInt($("#txt_recargo").val());
        const sueldo = parseFloat(
          $(".btnGenerar").eq(b).parent().parent().children().eq(3).text()
        );
        const prestamo = !$("#txt_prestamo").val()
          ? 0
          : parseFloat($("#txt_prestamo").val());
        const fecha_emision = $("#txt_fecha").val();
        //CALCULOS
        const aporte = aporteIEES(sueldo);
        const h_extra = horasExtras(sueldo, pre_recargo, hr_ext);
        const t_ingresos = totalIngreso(sueldo, h_extra);
        const t_descuento = totalDesc(aporte, prestamo);
        const t_salario = totalNeto(t_ingresos, t_descuento);
        //ID DEL EMPLEADO
        const el = e.target;
        const ids = el.getAttribute("ids");
        const datos = {
          id: ids,
          aporte: aporte,
          horasExtras: h_extra,
          prestamos: prestamo,
          ingresos: t_ingresos,
          descuentos: t_descuento,
          salario: t_salario,
          fecha: fecha_emision,
        };
        if (parseInt($("#txt_fecha").val()) > parseInt("0000-00-00")) {
          $.post("index.php?controller=Reportes&action=crear", datos, (res) => {
            if (res == "creado") {
              console.log("Crear");
              $("#txt_prestamo").val("");
              const el = toggleMensaje("icon-ok", "Rol de pago generado");
              $("#msg_evento").html(el);
              $("#msg_evento").addClass("cl_correcto");
              $("#msg_evento").slideDown("300");
            } else if (res == "existente") {
              const el = toggleMensaje(
                "icon-attention",
                "Ya se le ha generado un reporte con la misma fecha"
              );
              $("#msg_evento").html(el);
              $("#msg_evento").addClass("cl_atencion");
              $("#msg_evento").slideDown("300");
            }
          });
        } else {
          const el = toggleMensaje("icon-attention", "Escoga una fecha valida");
          $("#msg_evento").html(el);
          $("#msg_evento").addClass("cl_atencion");
          $("#msg_evento").slideDown("300");
        }
        removerMensaje();
      });
  }
};

//FUNCIONES ARITMETICAS
function totalIngreso(sueldo, valorExtra) {
  const ingresos = sueldo + valorExtra;
  return ingresos;
}

function totalDesc(aporte, prestamos) {
  const desc = aporte + prestamos;
  return desc;
}

function totalNeto(ingresos, descuentos) {
  const salario = ingresos - descuentos;
  return salario;
}

function calcularSalarioPorHoras(sueldo) {
  const sueldoPorHoras = sueldo / 20 / 8;
  return sueldoPorHoras;
}

function calcularHorasExtra(sueldoPorHoras, recargo) {
  const sueldoHorasExtras = (sueldoPorHoras * recargo) / 100 + sueldoPorHoras;
  return sueldoHorasExtras;
}

function horasExtras(sueldo, recargo, dias) {
  const sueldoSalarioHoras = calcularSalarioPorHoras(sueldo);

  const sueldoHorasExtras = calcularHorasExtra(sueldoSalarioHoras, recargo);

  const totalHorasExtras = sueldoHorasExtras * dias;
  return totalHorasExtras;
}

function aporteIEES(sueldo) {
  const aporte = (sueldo * 9.45) / 100;
  return aporte;
}

/****************
 * BUSCADOR
 * ***************/
var buscarEmpleado = () => {
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
              const { cedula, nombres, apellidos, nombre, sueldo } = data;
              tr += `
       <tr>
        <td>${cedula}</td>
        <td>${nombres} ${apellidos}</td>
        <td>${nombre}</td>
        <td>${sueldo}</td>
        <td><button ids="${data[0]}" class="btnGenerar">Generar</button></td>
       </tr>
     `;
            });
            $("#datos_pagos_empleados").html(tr);
            // getNumberData(`| encontrados ${datos.length}`);
            generarRolPago();
          } else {
            let tr = `<tr><td colspan="7" style="text-align:center;color:#fff;line-height:3em;">El dato ingresado no existe</td></tr>`;
            $("#datos_pagos_empleados").html(tr);
          }
        }
      );
    } else {
      getDatosEmpleados();
    }
  };
  $("#txtBuscar").keyup(datosABuscar);
};

var buscarReporte = () => {
  const datosABuscar = () => {
    if (
      $("#txtBuscar2").val() &&
      $("#txtBuscar2").length > 0 &&
      $("#txtDato2").val()
    ) {
      const inputBuscador = {
        columna: $("#txtDato2").val(),
        dato: $("#txtBuscar2").val(),
      };
      let box = ``;
      $.post(
        "index.php?controller=Reportes&action=consultarReportes",
        inputBuscador,
        (res) => {
          if (res != "false") {
            const datos = JSON.parse(res);
            datos.filter((data) => {
              const { id_emp, nombres, apellidos, fecha_emision } = data;
              box += `
       <div id="card-rolpagos">
        <p>${nombres} ${apellidos}</p>
        <p>${fecha_emision}</p>
        <div><a href="index.php?controller=Reportes&action=reporteGenerado&id=${id_emp}&fecha=${fecha_emision}" target="_blank"><i class="icon-upload-cloud"></i> Abrir y descargar</a></div>
       </div>
      `;
            });
            $("#card-datos").html(box);
          } else {
            $("#card-datos").html(
              '<p style="text-align:center;color:#fff;line-height:3em;">El dato ingresado no existe o es incorrecto, intente de nuevamente</p>'
            );
          }
        }
      );
    } else {
      $("#card-datos").html("");
    }
  };
  $("#txtBuscar2").keyup(datosABuscar);
};

//FUNCION DE IMPRIMIR LOS DATOS
//FUNCION UTILIZADA PARA ACTUALIZAR LOS REGISTROS
var getDatosEmpleados = () => {
  $.get("index.php?controller=Empleados&action=consultar", (res) => {
    let tr = ``;
    if (res != "false") {
      const req = JSON.parse(res);
      req.filter((datos) => {
        const { cedula, nombres, apellidos, nombre, sueldo } = datos;
        tr += `
       <tr>
        <td>${cedula}</td>
        <td>${nombres} ${apellidos}</td>
        <td>${nombre}</td>
        <td>${sueldo}</td>
        <td><button ids="${datos[0]}" class="btnGenerar">Generar</button></td>
       </tr>
     `;
      });
      $("#datos_pagos_empleados").html(tr);
      generarRolPago();
    } else {
      $("#datos_pagos_empleados").html("");
    }
  });
};

$(document).ready(() => {
  regresarAtraz();
  buscarEmpleado();
  getDatosEmpleados();
  buscarReporte();
});
