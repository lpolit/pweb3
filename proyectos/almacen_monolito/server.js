const express = require("express")
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: true }))

//BASE DE DATOS
let productos = [
    {id:1, descripcion:"fideos"},
    {id:2, descripcion:"arroz"}
]

app.get("/", (req,res)=>{
    res.render("productos", {productos})
})

app.post("/agregar", (req, res)=>{
    const nuevo = {
        id: productos.length+1,
        descripcion: req.body.descripcion
    }

    productos.push(nuevo)


    res.redirect("/")

})

app.listen(3000, ()=>{
        console.log("Servidor almacen_monolito en 3000")
})