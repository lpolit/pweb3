const express = require("express");
const cors = require("cors");

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

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
