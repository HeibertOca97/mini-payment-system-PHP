//FUNCION QUE OBTIENE EL NUMERO DE REGISTROS DE LA TABLA
//IMPRIME LOS VALORES EN LA PAGINA
const obtenerNumeroRegistros = (controlador, accion, el) => {
  const url = `index.php?controller=${controlador}&action=${accion}`;
  $.get(url, (res) => {
    if (res == "false") {
      $(el).html("0");
    } else {
      const resultados = JSON.parse(res);
      $(el).html(resultados.length);
    }
  });
};

const listarCargos = () => {
  const url = `index.php?controller=Cargos&action=listar`;
  $.get(url, (res) => {
    if (res == "false") {
      $("#lista_cargos").html(
        "<p style='color:#fff;padding:10px 5px;box-sizing:border-box;'><strong>Por el momento no ha ningun registro</strong></p>"
      );
    } else {
      const datos = JSON.parse(res);
      let el = ``;
      datos.filter((cargo) => {
        el += `
     <strong class="elem-cargos" idcargo="${cargo.id}" sueldo="${cargo.sueldo}" estado="false">${cargo.nombre}</strong>
    `;
      });
      $("#lista_cargos").html(el);
    }
    editar();
  });
};

const crearCargos = () => {
  const url = `index.php?controller=Cargos&action=crear`;
  const objeto = {
    nombre: $("#txtCargo").val(),
    sueldo: $("#txtSueldo").val(),
  };

  if (objeto.nombre && objeto.sueldo) {
    $.post(url, objeto, (res) => res);
    listarCargos();
    $("#txtCargo").val("");
    $("#txtSueldo").val("");
    const el = toggleMensaje("icon-ok", "Registro exitoso");
    $("#msg_evento").addClass("cl_correcto");
    $("#msg_evento").html(el);
    $("#msg_evento").slideDown("300");
  } else {
    const el = toggleMensaje(
      "icon-attention",
      "Invalido, por favor verifique los campo requeridos."
    );
    $("#msg_evento").addClass("cl_atencion");
    $("#msg_evento").html(el);
    $("#msg_evento").slideDown("300");
  }
  removerMensaje();
};

const actualizarCargos = () => {
  const url = `index.php?controller=Cargos&action=editar`;
  const objeto = {
    id: $("#crearCargos").attr("idcar"),
    nombre: $("#txtCargo").val(),
    sueldo: $("#txtSueldo").val(),
  };
  $.post(url, objeto, (res) => res);
  listarCargos();
  $("#crearCargos").attr("idcar", "");
  $("#crearCargos").text("Crear");
  $("#txtCargo").val("");
  $("#txtSueldo").val("");
  const el = toggleMensaje("icon-ok", "Actualizacion exitoso");
  $("#msg_evento").addClass("cl_correcto");
  $("#msg_evento").html(el);
  $("#msg_evento").slideDown("300");
  removerMensaje();
};

const editar = () => {
  for (let i = 0; i < $(".elem-cargos").length; i++) {
    $(".elem-cargos")
      .eq(i)
      .click(() => {
        var attr = {
            id: $(".elem-cargos").eq(i).attr("idcargo"),
            cargo: $(".elem-cargos").eq(i).text(),
            sueldo: $(".elem-cargos").eq(i).attr("sueldo"),
            accion: "Actualizar",
            color: "rgb(6, 12, 102)",
            estado: "true",
          },
          attrdefault = {
            id: " ",
            cargo: " ",
            sueldo: " ",
            accion: "Crear",
            color: "",
            estado: "false",
          };
        const verificar =
          $("#txtCargo").val() !== $(".elem-cargos").eq(i).text() &&
          $(".elem-cargos").eq(i).attr("estado") == "false"
            ? attr
            : attrdefault;
        $("#txtCargo").val(verificar.cargo);
        $("#txtSueldo").val(verificar.sueldo);
        $("#crearCargos").attr("idcar", verificar.id);
        $("#crearCargos").text(verificar.accion);
        $(".elem-cargos").eq(i).css("background", verificar.color);
        $(".elem-cargos").eq(i).attr("estado", verificar.estado);
      });
  }
};

$(document).ready(() => {
  obtenerNumeroRegistros("Usuarios", "listar", "#numUsuarios");
  obtenerNumeroRegistros("Empleados", "listar", "#numEmpleados");
  obtenerNumeroRegistros("Cargos", "listar", "#numCargos");

  listarCargos();
  $("#crearCargos").click(() => {
    const lanzarAccion =
      $("#crearCargos").text() == "Crear" ? crearCargos : actualizarCargos;
    lanzarAccion();
  });
});
