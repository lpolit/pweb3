## Arquitectura Web Avanzada
#### Arquitecturas Monolíticas vs. Microservicios
🔹 Arquitectura Monolítica
Definición y características
Ventajas (simplicidad, menor latencia en comunicación interna, fácil desarrollo y despliegue)
Desventajas (dificultad en escalabilidad, dependencia entre módulos, actualizaciones complejas)
Casos de uso donde sigue siendo viable

🔹 Arquitectura de Microservicios
Definición y características
Ventajas (escalabilidad independiente, facilidad de mantenimiento, mayor resiliencia)
Desafíos (complejidad en la comunicación, debugging más difícil, gestión de múltiples bases de datos)
Implementación de microservicios con Express.js
Comunicación entre microservicios (REST, gRPC, Mensajería con Kafka o RabbitMQ)
Despliegue en contenedores con Docker y Kubernetes


#### Separación de Responsabilidades en Backend y Frontend
🔹 Backend (Express.js)
Encargado de lógica de negocio, validaciones, seguridad, persistencia de datos
Creación de APIs REST/GraphQL eficientes
Implementación de servicios desacoplados
🔹 Frontend (Vue.js)
Consumo de APIs de manera óptima
Gestión del estado con Vuex/Pinia
Diferencias entre CSR (Client-Side Rendering), SSR (Server-Side Rendering) y SSG (Static Site Generation)

#### Implementación de Middlewares en Express para Modularidad
🔹 Concepto de Middleware en Express.js
Tipos de middlewares (de aplicación, de terceros, de error)
Uso de app.use() para configuración global
🔹 Ejemplos de Middlewares Comunes
Autenticación y autorización: Middleware con JWT
Logging y monitoreo: Uso de morgan y winston
Manejo de errores centralizado
Validación de datos con Joi o Express-validator
CORS y protección con Helmet.js

#### Comunicación entre Capas con Eventos
🔹 Event-Driven Architecture (EDA)
Definición y ventajas frente a enfoques tradicionales
Implementación de eventos con EventEmitter en Node.js
Uso de Redis Pub/Sub o RabbitMQ para comunicación entre microservicios
Aplicación de WebSockets para notificaciones en tiempo real

#### BIBLIOGRAFIA: 
Comparación entre la arquitectura monolítica y la arquitectura de microservicios 
https://www.atlassian.com/es/microservices/microservices-architecture/microservices-vs-monolith

Middleware in Express.js (MDN Web Docs)
https://developer.mozilla.org/en-US/docs/Learn/Server-side/

Express_Nodejs/middleware
Event-Driven Architecture (AWS Whitepaper)
https://d1.awsstatic.com/whitepapers/event-driven-architecture.pdf

Server-Sent Events vs. WebSockets: A Comparison (Smashing Magazine)
https://www.smashingmagazine.com/2018/02/
sse-websockets-data-flow-http2/

Patterns for Distributed Systems (Microsoft Azure)
https://learn.microsoft.com/en-us/azure/architecture/patterns/

#### Documentación Oficial
Documentación Oficial y Artículos
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Express.js - Documentación Oficial | https://expressjs.com/ |
| 3 | Node.js - Documentación Oficial | https://nodejs.org/en/docs/ |
| 4 | REST API Design Guide (Microsoft)|https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design |

