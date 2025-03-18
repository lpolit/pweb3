## Seguridad en Aplicaciones Web (Backend)
#### Concepto de Seguridad en Aplicaciones Web
🔹 Importancia de la seguridad en el desarrollo web
Riesgos y amenazas en aplicaciones web
Impacto de ataques en la integridad, confidencialidad y disponibilidad de los datos
OWASP Top 10: principales vulnerabilidades en aplicaciones web

#### INFORMACION COMPLEMENTARIA

OWASP Top 10 - Principales Vulnerabilidades en Aplicaciones Web (2021)
1. Broken Access Control (Control de Acceso Roto)
    Permite que los usuarios accedan a recursos o realicen acciones fuera de sus permisos.
    Ejemplo: Un usuario normal accede a un panel de administrador modificando la URL.
    Solución: Implementar controles de acceso estrictos en el backend y validar roles correctamente.

2. Cryptographic Failures (Fallas Criptográficas)
    Uso incorrecto o insuficiente de cifrado, exponiendo datos sensibles.
    Ejemplo: Transmisión de contraseñas en texto plano o almacenamiento sin cifrado.
    Solución: Usar TLS para comunicaciones seguras y cifrar datos sensibles en reposo y en tránsito.

3. Injection (Inyección de Código)
    Un atacante inyecta código malicioso en una consulta o script.
    Ejemplo: SQL Injection, XSS (Cross-Site Scripting), LDAP Injection.
    Solución: Usar consultas parametrizadas y sanitizar entradas de usuario.

4. Insecure Design (Diseño Inseguro)
    Falta de enfoque en la seguridad desde el diseño de la aplicación.
    Ejemplo: No definir requisitos de seguridad en las primeras fases del desarrollo.
    Solución: Implementar principios de Security by Design y modelos de amenazas.

5. Security Misconfiguration (Configuración Incorrecta de Seguridad)
    Uso de configuraciones predeterminadas o mal gestionadas.
    Ejemplo: Servidor con directorios expuestos, errores detallados visibles al usuario.
    Solución: Deshabilitar configuraciones innecesarias, restringir accesos y aplicar parches.

6. Vulnerable and Outdated Components (Componentes Vulnerables y Desactualizados)
    Uso de bibliotecas, frameworks o sistemas sin actualizar con vulnerabilidades conocidas.
    Ejemplo: Uso de una versión antigua de Log4j con vulnerabilidades críticas.
    Solución: Mantener dependencias actualizadas y aplicar parches de seguridad.

7. Identification and Authentication Failures (Fallos en Identificación y Autenticación)
    Fallos en mecanismos de autenticación y gestión de sesiones.
    Ejemplo: Uso de contraseñas débiles, tokens inseguros o sesión sin expiración.
    Solución: Implementar MFA, hashes seguros (bcrypt, Argon2) y limitar intentos de login.

8. Software and Data Integrity Failures (Fallas de Integridad en Software y Datos)
    Uso de software sin verificar su autenticidad o sin proteger su integridad.
    Ejemplo: Descarga de actualizaciones no firmadas, vulnerabilidades en CI/CD.
    Solución: Usar firmas digitales, verificar fuentes de software y restringir acceso a pipelines.

9. Security Logging and Monitoring Failures (Fallos en Registro y Monitoreo de Seguridad)
    Falta de logs y monitoreo que permitan detectar ataques o actividad sospechosa.
    Ejemplo: No registrar intentos fallidos de autenticación o accesos sospechosos.
    Solución: Implementar registros detallados, alertas y auditorías periódicas.

10. Server-Side Request Forgery (SSRF – Falsificación de Petición del Lado del Servidor)
    Un atacante hace que el servidor realice solicitudes no autorizadas.
    Ejemplo: Un atacante usa una entrada mal validada para acceder a recursos internos.
    Solución: Restringir solicitudes a direcciones internas y validar URLs de entrada.

#### Implementación de JWT (JSON Web Tokens) para Sesiones Seguras
🔹 Concepto de JWT y su uso en autenticación
Diferencia entre autenticación basada en sesiones y tokens
Estructura de un JWT (Header, Payload, Signature)
Ventajas del uso de JWT en aplicaciones web
🔹 Implementación en Express.js
Generación de tokens con jsonwebtoken
Verificación y validación de JWT en middleware

#### Protección de Rutas con Roles y Permisos (RBAC - Role-Based Access Control)
🔹 Concepto de RBAC y su aplicación en seguridad
Diferencia entre ACL (Access Control List) y RBAC


#### Protección contra XSS (Cross-Site Scripting) en Respuestas de la API
🔹 Concepto de XSS y sus tipos
XSS reflejado (ataques en parámetros de URL)
XSS almacenado (inyección en bases de datos)
XSS basado en DOM (manipulación del DOM en el frontend)
🔹 Medidas de prevención en Express.js
Sanitización de datos de entrada con DOMPurify o express-validator
Configuración de Content Security Policy (CSP)
Escapado de salida en respuestas JSON


#### Configuración de Cabeceras HTTP Seguras
🔹 Importancia de las cabeceras HTTP en seguridad
X-Content-Type-Options: Evita ejecución de archivos maliciosos
X-Frame-Options: Previene ataques de Clickjacking
Strict-Transport-Security (HSTS): Obliga el uso de HTTPS
Referrer-Policy: Controla la información compartida en encabezados Referer
🔹 Configuración con Helmet.js en Express


#### Buenas Prácticas de Seguridad en APIs REST
1- Usa Autenticación Segura (JWT, OAuth, API Keys)
    JWT para autenticación sin estado
    JSON Web Tokens (JWT) es una forma segura y escalable de autenticar usuarios sin necesidad de sesiones en el servidor.

2-Usa HTTPS para Cifrar Datos

Siempre usa HTTPS para proteger los datos en tránsito con TLS.

forza HTTPS con middleware:

```js
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

 3- Implementa Autorización con RBAC o ACL
    Ejemplo en  el repo [backend_con_rbac](/proyectos/backend_con_rbac/server.js)
 
 4- Limita Peticiones para Prevenir Ataques de Fuerza Bruta

```SH
    npm install express-rate-limit
```
```js
    const rateLimit = require('express-rate-limit');

    const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo 100 peticiones por IP
    message: "Demasiadas solicitudes, intenta más tarde",
    });

    app.use('/login', limiter);
```

5- Implementa CORS Seguro

```js
const cors = require('cors');

const corsOptions = {
  origin: ['https://tu-sitio.com'], // Dominios permitidos
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

6- Protege Contra Cross-Site Scripting (XSS)

7- Usa Headers de Seguridad con Helmet

8- Valida y Sanitiza JSON de Entradas

9- Registra Logs y Monitorea Actividad
```sh
npm install morgan
```
```js
const morgan = require('morgan');
app.use(morgan('combined')); // Registra todas las peticiones
```

#### Bibliografia
Documentación Oficial
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Principales amenazas de seguridad web | https://owasp.org/www-project-top-ten/ |
| 2 | Documentación de JSON Web Tokens (JWT) | https://jwt.io/introduction/ |
| 3 | Middleware Helmet.js para seguridad en Express | https://helmetjs.github.io/|
| 4 | Express.js Security Best Practices|https://expressjs.com/en/advanced/best-practice-security.html| 
| 5 | Rate Limiting en APIs con Express | https://www.npmjs.com/package/express-rate-limit|
| 6 | Validación y sanitización de datos en Express con Express-Validator| https://express-validator.github.io/docs/| 
| 7 | OAuth 2.0 y OpenID Connect: Autenticación Segura| https://oauth.net/2/  https://openid.net/connect/| 
| 8 | Prevención de SQL Injection con ORM en Node.js (Sequelize y Mongoose)| https://sequelize.org/docs/v6/core-concepts/raw-queries/
| 9 | parameter-binding | https://mongoosejs.com/docs/queries.html| 
| 10 | XSS Prevention Cheat Sheet (OWASP) | https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
| 11 | Rate Limiting y Protección contra ataques de fuerza bruta en Node.js| https://blog.logrocket.com/rate-limiting-node-js| 
| 12 | Configuración de HTTPS y TLS en Express con Let's Encrypt| https://letsencrypt.org/getting-started/| 
| 13 | Seguridad en APIs RESTful con Express y JWT | https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

