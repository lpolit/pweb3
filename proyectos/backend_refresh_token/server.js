require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;
const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET || "secretkey";
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "secretkey";

let refreshTokens = [];


app.use(express.json()); // Middleware para recibir JSON
app.use(cors());

app.get("/", (req, res) => {
  const umTitulo = "Estoy en la raiz del backend";
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
    const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(user, REFRESH_SECRET_KEY);
    // Guardar el refresh token (en un entorno real, usar BD)
    refreshTokens.push(refreshToken);

    // Enviar el Refresh Token en una cookie HTTP-only
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //secure: true, // Solo en HTTPS en producción
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.json({ accessToken:accessToken });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token.split(" ")[1], ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    req.user = decoded; // Guarda la info del usuario en la request
    next();
  });
};

// Ruta protegida
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Perfil autorizado", user: req.user });
});

app.get("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No autorizado" });

  // Verificar si el refresh token es válido
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Refresh Token inválido" });
  }

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    // Generar un nuevo Access Token
    const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    res.json({ accessToken:accessToken });
  });
});


app.post("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No autorizado" });

  // Eliminar el token de la "base de datos"
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  // Eliminar la cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.json({ message: "Sesión cerrada" });
});



app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
