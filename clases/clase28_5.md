TEMAS

### REPASO DE CLASE ANTERIOR.
- Creamos imagenes docker para front y back
- las levantamos con docker local y vimos que se comunicaron ok
- docker-compose para definicion de mas de 1 contenedor


### DEPLOYAMOS BACK EN RENDER (https://render.com/)
- Deployamos Backend desde repo git
Name
Runtime: NODE
Root Directory: src
Build Command: "npm install"
Start Command: "node server.js"
Option FREE


### Provamos de acceder via web 

### DEPLOYAMOS FRONT EN RENDER (https://render.com/)
- Creamos un branch prod para poder editar la url de las apis
REPO:
ROOT DIRECTORY: public
BRANCH: prod
PUBLISH DIRECTORY: .

### Provamos de acceder via web 
- Vemos que falla por cors
- vamos a editar la variable de entorno  del back 

### Testing de rendimiento y estrés

#### Conceptos de rendimiento, carga y estrés
Rendimiento: Capacidad de una aplicación para responder eficientemente a las peticiones de los usuarios.
Carga: Número de usuarios o peticiones concurrentes que una aplicación puede manejar correctamente.
Estrés: Situación en la que la aplicación se somete a más carga de la que puede manejar para detectar su punto de quiebre.
Relación con la experiencia de usuario y la disponibilidad del sistema.


#### Tipos de pruebas: carga, estrés, escalabilidad, duración
Prueba de carga: Verifica cómo se comporta la app bajo un volumen normal o creciente de usuarios.
Prueba de estrés: Evalúa el comportamiento bajo sobrecarga, hasta que falle.
Prueba de escalabilidad: Evalúa cómo responde la app al aumentar recursos o instancias.
Prueba de duración (soak testing): Verifica la estabilidad durante un período largo de tiempo.


#### Métricas clave

Tiempo de respuesta (Response Time): Tiempo desde que el usuario hace una solicitud hasta recibir una respuesta.
Throughput: Número de peticiones procesadas por segundo (RPS - requests per second).
Errores: Códigos 4xx, 5xx u otros fallos.
Disponibilidad: Porcentaje del tiempo que el sistema está operativo.

#### Herramientas populares
- Artillery (Node.js) ✅ recomendada
	Instalación: npm install -g artillery

- Apache JMeter
	Interfaz gráfica, ideal para principiantes.
	Requiere Java.
	Muy configurable.
- K6
	Moderno y orientado a desarrolladores.
	Scripting con JavaScript.
	Comando básico: k6 run script.js

#### Cómo simular usuarios concurrentes
Usuarios concurrentes = usuarios activos al mismo tiempo.
En herramientas como Artillery: arrivalRate.
En K6: vus (virtual users).


Actividades sugeridas
Crear servidor Express -> Probar con Artillery -> Crear archivo test.yml con distintos niveles de carga. -> Ejecutar varias veces y comparar.

Comparar mejoras
Agregar middleware de caché con node-cache.



## LINKS DE REFERENCIA:

### REPOSITORIOS DE EJEMPLOS:
https://github.com/lpolit/lpolitano-front
https://github.com/lpolit/lpolitano-back

#### DOCKER ONLINE
https://app.codeanywhere.com/

#### DOCUMENTACION DE PROGRAMACION WEB 2
https://github.com/ppandomail/pweb/blob/main/doc/deploy.md