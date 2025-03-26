require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
//const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Middleware para recibir JSON


app.get("/", (req, res) => {
  const umTitulo = "Estoy en la raiz del backend";
  res.json({ titulo: umTitulo });
});


app.get("/info", (req, res) => {
  const umTitulo = "Pagina de Info sin proteccion";
  res.json({ titulo: umTitulo });
});


////////////////// USO DE JWT ///////////////////////////
// Ruta de login (genera el token)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulación de usuario (deberías validar en una base de datos)
  const user = { id: 1, username: "admin", password: "1234" };

  if (username === user.username && password === user.password) {
    // Generar Token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ accessToken:token });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    req.user = decoded; // Guarda la info del usuario en la request
    next();
  });
};

// Ruta protegida
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Perfil autorizado", user: req.user });
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
