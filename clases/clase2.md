## De Monolito (Express + EJS) a Frontend + Backend

### Objetivo de la clase:

- cómo funciona un monolito con renderizado en servidor
- cómo el servidor maneja vistas y lógica
- cómo separa el frontend del backend
- cómo consumir una API REST desde Javascript

#### Estructura de la clase
- Introducción(15 min,explicar monolito)
- Ejercicio 1 (60 min	crear monolito - Express + EJS)
- Break	(10 min)
- Ejercicio 2 (50 min, separar backend API)
- Ejercicio 3 (35 min, crear frontend con fetch)
- Discusión (10 min, comparar arquitecturas)


### Escenario del ejercicio
#### Van a crear una mini app de productos
Funcionalidad:
- listar productos
- agregar producto

Primero:
- Monolito con EJS

Después:
- Frontend HTML + Backend API


#### PARTE 1 — Crear monolito Express + EJS

##### Arquitectura:

Browser
   |
   v
Express Server
   |
EJS templates

##### El servidor:
- maneja rutas
- genera HTML
- maneja datos

##### Paso 1 — Crear proyecto
```
mkdir monolito-ejs
cd monolito-ejs

npm init -y
npm install express ejs
```
##### Paso 2 — estructura
monolito-ejs
│
server.js
│
views
   productos.ejs

##### Paso 3 — server.js
```
const express = require("express")

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

let productos = [
 {id:1, nombre:"Teclado"},
 {id:2, nombre:"Mouse"}
]

app.get("/", (req,res)=>{
 res.render("productos",{productos})
})

app.post("/agregar",(req,res)=>{

 const nuevo = {
   id: productos.length+1,
   nombre: req.body.nombre
 }

 productos.push(nuevo)

 res.redirect("/")
})

app.listen(3000,()=>{
 console.log("Servidor monolito en 3000")
})
```
##### Paso 4 — vista EJS

views/productos.ejs
```
<h1>Productos</h1>

<ul>
<% productos.forEach(p=>{ %>

<li><%= p.nombre %></li>

<% }) %>
</ul>

<h2>Agregar producto</h2>

<form method="POST" action="/agregar">

<input name="nombre">

<button>Agregar</button>

</form>
```

### Explicar:

- el servidor genera el HTML
- el navegador solo lo muestra
- cada acción recarga la página

##### Preguntar:
- ¿Dónde vive la lógica de la aplicación?




#### PARTE 2 — Separar backend
Ahora crean un backend API.

##### Arquitectura nueva:

Frontend
   |
   v
Backend API

El backend ya no genera HTML.
Solo devuelve JSON.

##### backend-api
```
mkdir backend-api
cd backend-api

npm init -y
npm install express cors
```
##### server.js (API)
```
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let productos = [
 {id:1,nombre:"Teclado"},
 {id:2,nombre:"Mouse"}
]

app.get("/productos",(req,res)=>{
 res.json(productos)
})

app.post("/productos",(req,res)=>{

 const nuevo={
   id:productos.length+1,
   nombre:req.body.nombre
 }

 productos.push(nuevo)

 res.json(nuevo)
})

app.listen(3001,()=>{
 console.log("API corriendo")
})
```

#### PARTE 3 — Crear frontend

##### Ahora hacen frontend independiente.

index.html
```
<h1>Productos</h1>

<button onclick="cargar()">Cargar productos</button>

<ul id="lista"></ul>

<h2>Agregar producto</h2>

<input id="nombre">

<button onclick="agregar()">Agregar</button>

<script>

function cargar(){

 fetch("http://localhost:3001/productos")
 .then(r=>r.json())
 .then(data=>{

   const lista=document.getElementById("lista")
   lista.innerHTML=""

   data.forEach(p=>{

     const li=document.createElement("li")
     li.innerText=p.nombre
     lista.appendChild(li)

   })

 })

}

function agregar(){

 const nombre=document.getElementById("nombre").value

 fetch("http://localhost:3001/productos",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({nombre})
 })

}

</script>
```

#### Momento clave de la clase
Ahora preguntar:

- ¿Dónde está el frontend?
    En el Navegador
- ¿Dónde está el backend?
    En el servidor
- ¿Qué viaja entre ellos?
    JSON

#### Comparación final

