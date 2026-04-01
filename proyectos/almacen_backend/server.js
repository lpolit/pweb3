const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

//BASE DE DATOS
let productos = [
    {id:1, descripcion:"fideos"},
    {id:2, descripcion:"arroz"}
]

app.get("/productos", (req,res)=>{
    res.json(productos)
})

app.post("/productos", (req, res)=>{
    const nuevo = {
        id: productos.length+1,
        descripcion: req.body.descripcion
    }

    productos.push(nuevo)

    res.json(nuevo)
})

app.listen(3001, ()=>{
    console.log("Servidor almacen_backend en 3001")
})