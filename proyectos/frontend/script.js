  fetch('http://localhost:3000/info')
   .then(response => response.json())
   .then(data => {
    document.getElementById("titulo").textContent = data.titulo;
  })
   .catch(error => console.error("Error al obtener datos:", error));