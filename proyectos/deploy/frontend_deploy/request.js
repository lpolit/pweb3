// request.js - Manejador de solicitudes con lógica de Refresh Token
import Auth from './auth.js';

async function apiRequest(url, options = {}) {
  // Agregar el token al encabezado
  if (!options.headers) options.headers = {};
  const token = Auth.getToken();
  console.log(`Invoncando con Token ${token}`);
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(url, options);

  // Si el token expira, intentamos refrescarlo
  if (response.status === 401) {
    console.log('Token expirado, intentando refrescar...');

    const newToken = await Auth.refreshToken();
    if (newToken) {
      options.headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, options); // Reintentar la solicitud con el nuevo token
    } else {
      console.log('Sesión expirada, redirigiendo al login...');
      //window.location.href = '/login.html'; // Redirigir a la página de login si falla
    }
  }

  return response.json();
}


export default apiRequest;
