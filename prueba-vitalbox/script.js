// Obtener elementos del DOM
const formulario = document.getElementById('formulario');
const buscar = document.getElementById('buscar');
const tbody = document.querySelector('tbody');

// Función para listar personas
function listarPersonas() {
  fetch('/personas')
    .then(response => response.json())
    .then(personas => {
      tbody.innerHTML = '';
      personas.forEach(persona => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${persona.nombre}</td>
          <td>${persona.tipo_identificacion}</td>
          <td>${persona.numero_identificacion}</td>
          <td>${persona.fecha_nacimiento}</td>
          <td>${persona.peso}</td>
          <td>${persona.talla}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// Función para buscar personas
function buscarPersonas() {
  const termino = buscar.value.trim().toLowerCase();
  if (termino !== '') {
    fetch(`/personas?termino=${termino}`)
      .then(response => response.json())
      .then(personas => {
        tbody.innerHTML = '';
        personas.forEach(persona => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${persona.nombre}</td>
            <td>${persona.tipo_identificacion}</td>
            <td>${persona.numero_identificacion}</td
            <td>${persona.fecha_nacimiento}</td>
            <td>${persona.peso}</td>
            <td>${persona.talla}</td>
          `;
          tbody.appendChild(tr);
        });
      });
  } else {
    listarPersonas();
  }
}

// Event listeners
formulario.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(formulario);
  const persona = {
    nombre: formData.get('nombre'),
    tipo_identificacion: formData.get('tipo_identificacion'),
    numero_identificacion: formData.get('numero_identificacion'),
    fecha_nacimiento: formData.get('fecha_nacimiento'),
    peso: formData.get('peso'),
    talla: formData.get('talla')
  };
  fetch('/personas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(persona)
  })
    .then(() => {
      formulario.reset();
      listarPersonas();
    });
});

buscar.addEventListener('input', buscarPersonas);

// Listar personas al cargar la página
listarPersonas();
