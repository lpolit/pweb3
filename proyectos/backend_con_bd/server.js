const express = require("express");
const cors = require("cors");
const { getAllUsers, getUser } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Middleware para recibir JSON


app.get("/", (req, res) => {
  const umTitulo = "Estoy en la raiz del backend";
  res.json({ titulo: umTitulo });
});


app.get("/info", (req, res) => {
  const umTitulo = "Meu página criada desde Express";
  res.json({ titulo: umTitulo });
});

app.get("/nuevo", (req, res) => {
  const umTitulo = "Este es mi nuevo endpoint";
  res.json({ titulo: umTitulo });
});

//////// PARA LA BASE DE DATOS
app.get("/usuarios", async (req, res) => {
  res.json({
    usuarios: await getAllUsers(),
  });
});

app.post("/usuario", async (req, res) => {
  res.json({
    persona: await getUser(req.body.usuario),
  });
});

//////////////////////////////

app.post("/enviar", (req, res) => {
  const { nombre, mensaje } = req.body;

  if (!nombre || !mensaje) {
    return res.status(400).json({ error: "Faltan datos en la solicitud" });
  }

  res.json({
    mensaje: "Los Datos enviados al Backend fueron: ",
    datos: { nombre, mensaje }
  });
});

///// EJEMPLO DE COMO INVOCAR A LA BASE SI ESTA EN OTRO COMPONENTE /////
// Obtener mensajes (Llama al servicio de base de datos)
app.get("/mensajes", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4000/mensajes");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
});




app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
