const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const corsOptions = require("./config/corsConfig");

const authRoutes = require("./routes/auth.routes");
const productosRoutes = require("./routes/productos.routes");
const sanitizacionRoutes = require("./routes/sanitizacion.routes");
const limitadoRoutes = require("./routes/limitado.routes");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const infoLog = fs.createWriteStream(
    path.join(__dirname, "logg.log"),
    { flags: "a" }
);
app.use(morgan("combined", { stream: infoLog }));

app.use(authRoutes);
app.use(productosRoutes);
app.use(sanitizacionRoutes);
app.use(limitadoRoutes);

module.exports = app;
