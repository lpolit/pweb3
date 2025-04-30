

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
    
    // Guardar datos
    localStorage.setItem("token_local", data.accessToken);
    sessionStorage.setItem("token_session", data.accessToken);
    // Leer datos
    const token_l = localStorage.getItem("token_local");
    const token_s = sessionStorage.getItem("token_session");
    console.log("Token_local de usuario guardado en localStorage:", token_l);
    console.log("Token_sesion de usuario guardado en sessionStorage:", token_s);

  
  } else {
    console.error("Error en el login");
  }
});


////    CON API PROTEGIDA   ///
document.getElementById("getDataBtn").addEventListener("click", async () => {
  const token = localStorage.getItem("token_local");
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
  // Eliminar un valor
  localStorage.removeItem("token_local");
  sessionStorage.removeItem("token_session");
  //Limpiar todo
  localStorage.clear();
  console.log("Sesión cerrada");
});