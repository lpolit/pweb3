## Optimización y Rendimiento
#### Concepto de Optimización y Rendimiento en Aplicaciones Web
🔹 ¿Qué es la optimización de rendimiento en aplicaciones web?
Optimización implica mejorar el tiempo de respuesta y la eficiencia de una aplicación web, reduciendo latencias, optimizando recursos y asegurando un uso eficiente de las infraestructuras.
El rendimiento se mide a través de la velocidad de carga, la capacidad de respuesta del servidor y la experiencia del usuario.
🔹 Factores que afectan el rendimiento en aplicaciones web
Tiempo de respuesta del servidor: Un servidor lento o sobrecargado puede aumentar la latencia.
Tamaño de los recursos: Archivos grandes (imágenes, scripts, hojas de estilo) pueden afectar los tiempos de carga.
Carga de la base de datos: Consultas no optimizadas pueden generar cuellos de botella.
Uso de CDN (Content Delivery Network): Ayuda a reducir la latencia al distribuir el contenido de manera eficiente.

#### Técnicas de Optimización de Backend
🔹 Caching con Redis
Redis es una base de datos en memoria usada principalmente para caching, lo que mejora la rapidez de las aplicaciones web al almacenar temporalmente los resultados de consultas repetitivas.
Cacheo de resultados frecuentes:
Ejemplo de cacheo con Redis en Node.js (Express):
```js
const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();

client.on('connect', () => {
  console.log('Conectado a Redis');
});

app.get('/data', (req, res) => {
  const key = 'someDataKey';
  
  client.get(key, (err, data) => {
    if (data) {
      return res.json(JSON.parse(data));  // Si está en caché, responder con los datos
    } else {
      const result = { message: 'Datos nuevos' };
      client.setex(key, 3600, JSON.stringify(result));  // Cachear los datos por 1 hora
      return res.json(result);
    }
  });
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
```

🔹 Compresión de Datos
La compresión reduce el tamaño de las respuestas HTTP, mejorando los tiempos de carga.
Herramientas comunes: Gzip y Brotli.
Ejemplo en Express.js:
```js
const compression = require('compression');
const app = express();

app.use(compression());  // Habilitar compresión Gzip
```

🔹 Paginación en Base de Datos
La paginación permite dividir grandes conjuntos de datos en partes más pequeñas, evitando la sobrecarga en el servidor y en la base de datos.
SQL (MySQL/PostgreSQL):
```sql
SELECT * FROM products LIMIT 20 OFFSET 40;
```
NoSQL (MongoDB):
```js
db.collection.find().skip(40).limit(20);
```
#### Monitoreo y Logging
🔹 Monitoreo de Aplicaciones con Prometheus
Prometheus es una herramienta de monitoreo que recopila métricas de tiempo de ejecución de la aplicación (uso de CPU, memoria, solicitudes HTTP).
Configuración básica:
Instalar Prometheus en el servidor, configurar el archivo prometheus.yml para recolectar métricas de la aplicación y visualizarlas en Grafana.
Ejemplo de configuración de Prometheus:
```yaml
scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['localhost:3000']
```

🔹 Visualización de Métricas con Grafana
Grafana se usa para visualizar los datos recolectados por Prometheus.
Con Grafana, se pueden crear dashboards que muestran la salud de la aplicación, el tiempo de respuesta de las solicitudes, la utilización de recursos, etc.
Ejemplo de panel en Grafana:
Crear gráficos para representar el tiempo de respuesta promedio de las solicitudes o el uso de la CPU a lo largo del tiempo.
🔹 Logging con Herramientas como Winston o Bunyan
Winston y Bunyan son bibliotecas de Node.js utilizadas para manejar registros (logs) en aplicaciones.
Permiten registrar eventos y errores, facilitando el diagnóstico de problemas y el análisis de desempeño.
Ejemplo con Winston:
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

logger.info('Aplicación iniciada');
logger.error('Error en la conexión');
```

#### Bibliografía
Documentación Oficial y Artículos
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Redis - Documentación Oficial | https://redis.io/documentation |
| 2 |Prometheus - Guía Oficial | https://prometheus.io/docs/|
| 3 |Grafana - Documentación Oficial | https://grafana.com/docs/|
| 4 |Express.js - Caching con Redis| https://expressjs.com/en/advanced/best-practice-performance.html
| 5 |Node.js - Logging with Winston|https://www.npmjs.com/package/winston

