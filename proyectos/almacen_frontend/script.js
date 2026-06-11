
function cargar(){
    fetch(`${window.CONFIG.API_URL}/productos`)
    .then(r=> r.json())
    .then(data=>{
        const  lista = document.getElementById("lista")

        lista.innerHTML=""
        
        data.forEach(p => {
            const li = document.createElement("li")
            li.innerText = p.descripcion
            lista.appendChild(li)
        });
    })
}

function agregar(){
    const descripcion = document.getElementById("descripcion").value

    fetch(`${window.CONFIG.API_URL}/productos`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({descripcion})
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnCargar")
        .addEventListener("click", cargar);

    document.getElementById("btnAgregar")
        .addEventListener("click", agregar);
});

