// script.js - Ejemplo de uso de la API con autenticación
import apiRequest from './request.js';

async function cargarDatos() {
  try {
    const data = await apiRequest('http://localhost:3000/profile');
    console.log('Datos protegidos:', data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

document.getElementById('load-data-btn').addEventListener('click', cargarDatos);
