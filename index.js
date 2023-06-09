let datos = [];
function enviarDatos(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const empresa = document.getElementById('empresa').value;
    const sueldo = document.getElementById('sueldo').value;

    if (sueldo < 10000) {
        alert('No se puede ingresar un monto menor a 10000');
        return;
    }

    var regex = /^[a-zA-Z\s]+$/;

    if (!regex.test(nombre) || !regex.test(apellido) || !regex.test(empresa)) {
        alert('Por favor, ingresa un nombre/apellido o empresa válido sin números.');
        return;
    }
    console.log('Datos enviados:');
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Empresa:', empresa);
    console.log('Correo electrónico:', correo);
    console.log('Sueldo mínimo:', sueldo);
    sueldoUsd = sueldo / 480;
    sueldoEuro = sueldo / 260;
    datos.push({ nombre, apellido, empresa, correo, sueldo, sueldoUsd, sueldoEuro });
    mostrarResultados();

    document.getElementById("formulario").reset();
}
function mostrarResultados() {
    const propuestas = document.getElementById('resultados');
    const tbody = propuestas.querySelector('tbody');
    tbody.innerHTML = '';

    for (const dato of datos) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${dato.nombre}</td>
        <td>${dato.apellido}</td>
        <td>${dato.empresa}</td>
        <td>${dato.correo}</td>
        <td>${dato.sueldo} ARS </td>
        <td>${dato.sueldoUsd.toFixed(2)} USD</td>
        <td>${dato.sueldoEuro.toFixed(2)} EUR</td>
      `;
        tbody.appendChild(fila);
    }
}
function ordenarTabla() {
    let tabla = document.getElementById("resultados");
    let filas = Array.from(tabla.getElementsByTagName("tr"));

    filas.shift();

    var ordenSeleccionado = document.getElementById("orden").value;

    filas.sort(function(a, b) {
        var valorA, valorB;
  
        if (ordenSeleccionado === "sueldo_min") {
            valorA = parseInt(a.cells[4].innerText);
            valorB = parseInt(b.cells[4].innerText);
            return valorA - valorB;
          } else if (ordenSeleccionado === "sueldo_max") {
            valorA = parseInt(a.cells[4].innerText);
            valorB = parseInt(b.cells[4].innerText);
            return valorB - valorA;
          }
      });

    while (tabla.tBodies[0].firstChild) {
      tabla.tBodies[0].removeChild(tabla.tBodies[0].firstChild);
    }


    for (var i = 0; i < filas.length; i++) {
      tabla.tBodies[0].appendChild(filas[i]);
    }
  }
