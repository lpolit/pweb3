const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

//Para probar con el front en server usar:
//http-server . en la raiz del frontend donde esta el index.html

const cors_options = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Solo si usás cookies o headers de autenticación
};

app.use(cors(cors_options)); 

app.use(express.json()); // Middleware para recibir JSON


///// LOGS EN ARCHIVO /////
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' } // 'a' = append
);

app.use(morgan('combined', { stream: accessLogStream }));

////// LOGS EN CONSOLA //////
app.use(morgan('dev'))








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
