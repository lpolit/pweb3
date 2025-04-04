require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "secretkey";

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Base de datos simulada de usuarios
const users = [
  { id: 1, username: 'admin',  password: "1234",  role: 'admin' },
  { id: 2, username: 'manager', password: "1234" , role: 'manager' },
  { id: 3, username: 'employee', password: "1234" , role: 'employee' }
];


// Middleware para redirigir HTTP a HTTPS
app.use((req, res, next) => {
  if (!req.secure && req.headers.host !== 'localhost:3000') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

//IMPLEMENTACION DE CORS SEGURO
const cors_options = {
  origin: "http://127.0.0.1:8080", // Permite solo este origen
  methods: "GET,POST,PUT,DELETE", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization" // Headers permitidos
}

app.use(cors(cors_options));
app.use(express.json()); // Middleware para recibir JSON


///// LOGS EN ARCHIVO /////
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' } // 'a' = append
);

//app.use(morgan('combined', { stream: accessLogStream }));

////// LOGS EN CONSOLA //////
//app.use(morgan('combined'))


////////// SANITIZAR ////////////

const {body, validationResult} = require('express-validator')
const sanitizeHtml = require ('sanitize-html')

app.post('/sanitizado', body('comment').isString().trim(), //verifica que comment sea un string, elimina espacios y caracteres peligrosos
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

  const safeComment = sanitizeHtml(req.body.comment); // Limpiar HTML peligroso

  res.send({message: "Comentario Seguro", safeComment})
})

app.post('/sinsanitizar', body('comment'),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

  const Comment = req.body.comment // Limpiar HTML peligroso
  res.send({message: "Comentario Sin Filtro", Comment})
})


// VALIDAR CARACTERES A MANO
app.post('/validarcaracteres', (req,res)=>{
  const query = req.body.query;

  if(!/^[a-zA-A0-9\s]+$/.test(query)){
    return res.status(400).send("Entrada Invalida")
  }

  res.send({message: "Entrada Valida", query})
})

////////////  LIMITADOR  ////////////
const limiter = rateLimit({
  windowMs: 15*60*1000, // 15min
  max: 3, // maximo 100 peticiones por IP
  message: "Demasiadas solicitudes, intente mas tarde"
})

app.use('/limitado', limiter)

app.get("/limitado", (req, res) => {
  res.json({ titulo: "soy un endpoint limitado" });
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


// Middleware para verificar roles
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    next();
  };
};


app.get("/info", (req, res) => {
  const titulo = "PAGINA DE PRUEBA";
  res.json({ titulo: titulo });
});

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



const options = {
  key: fs.readFileSync('C:/Repositorios/pweb3/proyectos/backend_buenas_practicas/server.key'),
  cert: fs.readFileSync('C:/Repositorios/pweb3/proyectos/backend_buenas_practicas/server.cert')
};

// Servidor HTTP que solo redirige a HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://localhost:3001${req.url}` });
  res.end();
}).listen(3000, () => {
  console.log('Servidor HTTP en http://localhost:3000 redirigiendo a HTTPS');
});

// Servidor HTTPS real
https.createServer(options, app).listen(3001, () => {
  console.log('Servidor HTTPS corriendo en https://localhost:3001');
});