CLASE PRACTICA JMETER - ARTILLERY - K6

## JMETER
### INSTALACION
- Descargamos Jmeter de https://jmeter.apache.org/download_jmeter.cgi (BINARIES)
- Descomprimimos el .zip en la ubicacion que querramos que quede el programa
- PRECONDICION: Tener JAVA instalado.(https://www.java.com/es/download/manual.jsp)
- Iniciamos Jmeter del .bat que esta dentro de "bin".

### PRIMEROS PASOS
#### Dentro del TestPlan creamos un "Thread Group"
- Name: Nombre

- Number of Threads (Users): Es el total de usuarios virtuales que quiere enviar durante la prueba.

- Ramp-up Period: Es una rampa que determina en cuánto tiempo se ha enviado el total de usuarios virtuales al servicio que se está probando, ejemplo: si establecemos un Number of Threads de 100 y un Ramp-up Period de 60 segundos, entonces se estará enviando 100/60=1.66667 usuarios virtuales por segundo y al ajustar un tiempo de ejecución de 60 segundos, se han enviado los 100.

#### Agregamos un HTTP Request para LOGIN
- Sobre el ThreadGroup -> add -> Sampler -> Http Request.
- Configuramos: Protocolo (http) - ServerName(localhost) - Port Number(3000) - Metodo(POST) - Path(/login)
- Destildamos todos los checksbox
- Completamos body data {"username": "admin","password": "1234"} 

#### Agregamos un Header al request LOGIN
- Sobre el Http Request (LOGIN) add -> Config Element -> Http Header Manager
- Agregamos los headers necesarios, en este caso Content-Type:application/json

#### Agregamos un Assert
- Sobre el Http Request (LOGIN) add -> Assertions -> Response Assertion
- Name: Nombre de la prueba (TestAccessToken)
- FieldToText: Chequeamos "Text Response"
- Pattern Maching Rules "Substring"
- Pattern To Test "accessToken" (Probamos accessTokencito para que falle)
- Custom Failure message "NO DEVUELVE ACCESS TOKEN"

#### GUARDAMOS EL TOKEN PARA PROXIMOS REQUEST
- Sobre el Http Request (LOGIN) add -> Post Processors -> JSON Extractor
- Name: Nombre del extractor: "EXTRAER TOKEN" 
- Names of created variables: "token"
- JSON Path Expressions: $.accessToken

#### OPCIONAL DEBUG SAMPLER (Permite visualizar todas las variables guardadas)
- Sobre el ThreadGroup -> add -> Sampler -> Debug Sampler 

#### VISUALIZAR RESULTADOS
- Sobre el ThreadGroup -> add -> Listener -> View Results Tree
- Sobre el ThreadGroup -> add -> Listener -> Summary Report

#### SUMMARY REPORT
- Label (Etiqueta): El nombre de la solicitud HTTP que se está analizando. 
- Samples (Muestras): La cantidad de veces que se ejecutó la solicitud. 
- Average (Promedio): El tiempo promedio de respuesta en milisegundos. 
- Min (Mínimo): El tiempo de respuesta mínimo. 
- Max (Máximo): El tiempo de respuesta máximo. 
- Std. Dev. (Desviación Estándar): La medida de la dispersión de los tiempos de respuesta con respecto al promedio. 
- Error % (Porcentaje de Error): El porcentaje de muestras que resultaron en un error. 
- Throughput (Rendimiento): La cantidad de solicitudes procesadas por unidad de tiempo (por ejemplo, solicitudes por segundo)


#### Agregamos un HTTP Request para PROFILE
- Sobre el ThreadGroup -> add -> Sampler -> Http Request.
- Configuramos: Protocolo (http) - ServerName(localhost) - Port Number(3000) - Metodo(GET) - Path(/profile)
- Destildamos todos los checksbox

#### Agregamos un Header al request PROFILE
- Sobre el Http Request (PROFILE) add -> Config Element -> Http Header Manager
- Agregamos los headers necesarios, en este caso 
	- Content-Type: application/json
	- Authorization: Bearer ${token}

#### Agregamos un Assert
- Sobre el Http Request (PERFIL) add -> Assertions -> Response Assertion
- Name: Nombre de la prueba (TestPerfil)
- FieldToText: Chequeamos "Text Response"
- Pattern Maching Rules "Substring"
- Pattern To Test "Perfil autorizado" (Probamos con algo erroneo para que falle)
- Custom Failure message "PERFIL INVALIDO"

#### AUMENTAMOS PARA VER COMO SE COMPORTA

#### AGREGAMOS UN REQUEST PESADO PARA MOSTRAR ERRORES
- Sobre el ThreadGroup -> add -> Sampler -> Http Request.
- Configuramos: Protocolo (http) - ServerName(localhost) - Port Number(3000) - Metodo(GET) - Path(/pesado)

### ANALIZAMOS RESULTADOS EN REPORT


## ARTILLERY

### INSTALACION DE ARTILLERY
```bash
npm install -g artillery
```

### PRUEBA RAPIDA A UNA URL 

La herramienta tiene el comando «quick» que nos permite lanzar un test rápido contra la URL que definamos.
Si queremos simular 10 usuarios enviando 20 peticiones cada uno
```bash
artillery quick --count 10 -n 20 url_deseada
```

### CREAMOS UN ARCHIVO DE CONFIGURACION DE LAS PRUEBAS (test.yml)

```yml
config:
  target: "http://localhost:3000"  # HOST
  phases: #  Etapas de la prueba (cuántos usuarios simular y por cuánto tiempo).
    - duration: 60  # Duración total de la prueba (en segundos)
      arrivalRate: 5  # Usuarios virtuales por segundo
  defaults: #Cabeceras HTTP comunes para todas las peticiones
    headers:
      Content-Type: "application/json"

scenarios:
  - name: Login and access profile
    flow:
      - post:
          url: "/login"
          json:
            username: "admin"
            password: "1234"
          capture:
            - json: accessToken
              as: token
      - get:
          url: "/profile"
          headers:
            Authorization: "Bearer {{ token }}"

```


### EJECUTAMOS LA PRUEBA

```bash
artillery run test.yml
```

### Para simular más carga, ajusta en el YAML:

```yml
phases:
  - duration: 60
    arrivalRate: 20 
```

### O agrega fases en escalada:

```yml
phases:
  - duration: 30
    arrivalRate: 5
  - duration: 30
    arrivalRate: 10
  - duration: 30
    arrivalRate: 20
```




## K6

### INSTALACION
Requisito: https://chocolatey.org/
```bash
choco install k6
```

### REPORTE
```bash
k6 run --out json=resultado.json test.js
```