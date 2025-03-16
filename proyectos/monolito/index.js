const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const umTitulo = "Estoy en la raiz";
  // Se le pasan datos desde el servidor al html
  res.render("index", { titulo: umTitulo });
});


app.get("/info", (req, res) => {
  const umTitulo = "Meu página criada desde Express";
  // Se le pasan datos desde el servidor al html
  res.render("index", { titulo: umTitulo });
});

app.get("/nuevo", (req, res) => {
  const umTitulo = "Este es mi nuevo endpoint";
  // Se le pasan datos desde el servidor al html
  res.render("index", { titulo: umTitulo });
});


app.listen(port);
console.log("Servidor no porto " + port);
