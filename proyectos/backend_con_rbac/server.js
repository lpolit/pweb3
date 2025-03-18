require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

app.use(cors()); // Permite conexiones desde el frontend
app.use(express.json()); // Middleware para recibir JSON


// Base de datos simulada de usuarios
const users = [
  { id: 1, username: 'admin',  password: "1234",  role: 'admin' },
  { id: 2, username: 'manager', password: "1234" , role: 'manager' },
  { id: 3, username: 'employee', password: "1234" , role: 'employee' }
];


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


// Middleware para verificar roles
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
};


// Ruta de login (genera el token)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulación de usuario (deberías validar en una base de datos)
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ error: 'Usuario o clave invalida' });
  
  // Generar Token
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
  
});

// Ruta protegida solo para administradores
app.get('/admin', verifyToken, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'Bienvenido, administrador' });
});

// Ruta protegida para gerentes y administradores
app.get('/manager', verifyToken, authorizeRole(['manager', 'admin']), (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username} al endpoint de generente` });
});

// Ruta accesible para cualquier usuario autenticado
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Hola ${req.user.username}, este es tu perfil` });
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
