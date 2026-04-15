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

//Simulacion de base de datos de usuarios
    const users = [
        {id:1, username:"admin", password:"1234", role:"rol_admin"},
        {id:2, username:"jefe", password:"1234", role:"rol_jefe"},
        {id:3, username:"empleado", password:"1234", role:"rol_empleado"}
    ]


//Post de logueo(generamos un token)
app.post("/login", (req,res)=>{
    const {username, password} = req.body;

    const user = users.find(u => u.username==username && u.password==password )

    if (user){
        //generar un token
        const token = jwt.sign({id:user.id, username:user.username, role:user.role},"123456",{expiresIn:"1h"});
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

//Middleware para verificar que el usuario tiene el rol permitido
const authorizationRole = (roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({error:"Aceeso no autorizado"})
        }    
        next()
    }
}



app.get("/productos",verifyToken, authorizationRole(["rol_admin"]), (req,res)=>{
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
    console.log("Servidor almacen_backend_jwt_rbac en 3001")
})