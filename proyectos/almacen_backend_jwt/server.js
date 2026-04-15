const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

//BASE DE DATOS
let productos = [
    {id:1, descripcion:"fideos"},
    {id:2, descripcion:"arroz"}
]



//Post de logueo(generamos un token)
app.post("/login", (req,res)=>{
    const {username, password} = req.body;

    //Simulacion de base de datos de usuario
    const user = {id:1, username:"admin", password:"1234"}

    if (username== user.username && password==user.password){
        //generar un token
        const token = jwt.sign({id:user.id, username:user.username},"123456",{expiresIn:"1h"});

        res.json({accessToken:token})
    }else{
        res.status(401).json({message:"Credenciales Incorrectas"})
    }
})

//Middleware(funcion) para verificar token
const verifyToken =(req,res,next) => {
    const token= req.headers["authorization"]

    if(!token) return res.status(403).json({message:"Token Requerido"})

    jwt.verify(token.split(" ")[1], "123456",(err,decoded) =>{
        if (err) return res.status(401).json({message:"Token Invalido"})
        req.user = decoded //guardamos la informacion del usuario en el request
        next()    
    })
}



app.get("/productos",verifyToken, (req,res)=>{
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
    console.log("Servidor almacen_backend_jwt en 3001")
})