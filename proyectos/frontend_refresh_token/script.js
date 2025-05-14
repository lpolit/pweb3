// script.js - Ejemplo de uso de la API con autenticación
import apiRequest from './request.js';
import Auth from './auth.js';

async function cargarDatos() {
  try {
    const data = await apiRequest('http://localhost:3000/profile');
    console.log('Datos protegidos:', data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

document.getElementById('getDataBtn').addEventListener('click', cargarDatos);

document.getElementById("loginBtn").addEventListener("click", async () => {
  
  const user = document.getElementById("username").value
  const pass = document.getElementById("password").value

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: 'include', // Importante para que setee las cookies enviadas luego del login
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass }),
  });

  if (response.ok) {
    const data = await response.json();
    Auth.setToken(data.accessToken); // Guardar el token en memoria
    console.log("Token almacenado:", Auth.getToken());
  } else {
    console.error("Error en el login");
  }
});
