  fetch("http://localhost:3000/")
   .then(response => response.json())
   .then(data => {
    document.getElementById("titulo").textContent = data.titulo;
  })
   .catch(error => console.error("Error al obtener datos:", error));