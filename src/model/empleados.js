class Empleados {
  constructor() {
    this.xmlhttp = new XMLHttpRequest();
    this.id = [];
    this.cedula = [];
    this.nombres = [];
    this.apellidos = [];
    this.sexo = [];
    this.edad = [];
    this.cargo = [];
    this.sueldo = [];
    this.collection = {
      id: this.id,
      cedula: this.cedula,
      nombres: this.nombres,
      apellidos: this.apellidos,
      sexo: this.sexo,
      edad: this.edad,
      cargo: this.cargo,
      sueldo: this.sueldo
    }
    this.coll = [];
  }

  listar( url ) {
    this.xmlhttp.open( "get", url, true );
    this.xmlhttp.send();

    this.xmlhttp.onreadystatechange = () => {
      if ( this.xmlhttp.status == 200 && this.xmlhttp.readyState == 4 ) {
        var datos = JSON.parse( this.xmlhttp.responseText );
        this.coll.push( datos );
        datos.forEach( it => {
          this.id.push( it.id );
          this.nombres.push( it.nombres );
          this.apellidos.push( it.apellidos );
          this.sexo.push( it.sexo );
          this.edad.push( it.edad );
          this.cargo.push( it.cargo );
          this.sueldo.push( it.sueldo );
          this.cedula.push( it.cedula );
        } );
      }
    }
  }

  getResult() {
    return this.collection;
  }

  getXML() {
    return this.coll;
  }
}