import Auth from './auth.js';

document.getElementById("loginBtn").addEventListener("click", async () => {
  
  const user = document.getElementById("username").value
  const pass = document.getElementById("password").value

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
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


////    CON API PROTEGIDA   ///
document.getElementById("getDataBtn").addEventListener("click", async () => {
  const token = Auth.getToken();
  if (!token) {
    console.error("No hay token disponible");
    return;
  }

  const response = await fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Datos protegidos:", data);
  } else {
    console.error("No autorizado");
  }
});

// LOGOUT - LIMPIAR TOKEN 
document.getElementById("logoutBtn").addEventListener("click", async () => {
  Auth.clearToken(); // Borrar token de memoria
  await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
  console.log("Sesión cerrada");
});