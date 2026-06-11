const express = require("express");
const productos = require("../data/productos");
const verifyToken = require("../middleware/auth");
const authorize = require("../middleware/roles");

const router = express.Router();

router.get("/productos", verifyToken, authorize(["rol_admin"]), (req, res) => {
    res.json(productos);
});

router.post("/productos", (req, res) => {
    const nuevo = {
        id: productos.length + 1,
        descripcion: req.body.descripcion
    };
    productos.push(nuevo);
    res.json(nuevo);
});

module.exports = router;
