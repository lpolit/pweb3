document.addEventListener("DOMContentLoaded", () => {
  // Obtener referencia al botón y los inputs
  const boton = document.getElementById("enviarBtn");
  const inputNombre = document.getElementById("nombre");
  const inputMensaje = document.getElementById("mensaje");
  const respuestaTexto = document.getElementById("respuesta");

  // Agregar evento de click al botón
  boton.addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const mensaje = inputMensaje.value.trim();

    if (!nombre || !mensaje) {
      respuestaTexto.textContent = "Por favor, llena todos los campos.";
      return;
    }

    // Datos a enviar al backend
    const data = { nombre, mensaje };

    // Hacer la petición POST al backend
    fetch("http://localhost:3000/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => {
        console.log("Respuesta del backend:", data);
        respuestaTexto.textContent = data.mensaje + " \n NOMBRE:"+ data.datos.nombre + " \n MENSAJE:"+ data.datos.mensaje;
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        respuestaTexto.textContent = "Error al enviar datos.";
      });
  });
});