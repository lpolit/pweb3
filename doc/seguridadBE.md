## Seguridad en Aplicaciones Web (Backend)
#### Concepto de Seguridad en Aplicaciones Web
🔹 Importancia de la seguridad en el desarrollo web
Riesgos y amenazas en aplicaciones web
Impacto de ataques en la integridad, confidencialidad y disponibilidad de los datos
OWASP Top 10: principales vulnerabilidades en aplicaciones web


#### Implementación de JWT (JSON Web Tokens) para Sesiones Seguras
🔹 Concepto de JWT y su uso en autenticación
Diferencia entre autenticación basada en sesiones y tokens
Estructura de un JWT (Header, Payload, Signature)
Ventajas del uso de JWT en aplicaciones web
🔹 Implementación en Express.js
Generación de tokens con jsonwebtoken
Verificación y validación de JWT en middleware
Seguridad en almacenamiento de tokens (HTTP-only cookies vs. LocalStorage)

#### Protección de Rutas con Roles y Permisos (RBAC - Role-Based Access Control)
🔹 Concepto de RBAC y su aplicación en seguridad
Diferencia entre ACL (Access Control List) y RBAC
Definición de roles y permisos en Express.js
🔹 Implementación en Node.js con Express
Middleware para validar roles y permisos
Restricción de accesos a rutas específicas
Integración con JWT para gestionar permisos
Ejemplo de Middleware RBAC en Express.js:


```js
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
};
```


#### Protección contra XSS (Cross-Site Scripting) en Respuestas de la API
🔹 Concepto de XSS y sus tipos
XSS reflejado (ataques en parámetros de URL)
XSS almacenado (inyección en bases de datos)
XSS basado en DOM (manipulación del DOM en el frontend)
🔹 Medidas de prevención en Express.js
Sanitización de datos de entrada con DOMPurify o express-validator
Configuración de Content Security Policy (CSP)
Escapado de salida en respuestas JSON
Ejemplo de protección con helmet.js:

```js
const helmet = require('helmet');
app.use(helmet());
```

#### Configuración de Cabeceras HTTP Seguras
🔹 Importancia de las cabeceras HTTP en seguridad
X-Content-Type-Options: Evita ejecución de archivos maliciosos
X-Frame-Options: Previene ataques de Clickjacking
Strict-Transport-Security (HSTS): Obliga el uso de HTTPS
Referrer-Policy: Controla la información compartida en encabezados Referer
🔹 Configuración con Helmet.js en Express

```js
app.use(helmet({
    contentSecurityPolicy: false, // Personalización si es necesario
}));
```

#### Buenas Prácticas de Seguridad en APIs REST
🔹 Autenticación y autorización
Implementar OAuth 2.0 en servicios externos
Uso de Scopes en APIs protegidas
🔹 Limitación de acceso y control de tráfico
Implementación de Rate Limiting con express-rate-limit
Protección contra ataques de fuerza bruta
Ejemplo de Rate Limiting en Express:

```js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Máximo 100 peticiones por IP
});
app.use(limiter);
```

🔹 Registro y monitoreo de actividad
Logging de accesos con Winston o Morgan
Monitoreo con herramientas como Prometheus y Grafana
🔹 Uso de HTTPS y encriptación de datos sensibles
Implementación de SSL/TLS
Hashing seguro de contraseñas con bcrypt
Ejemplo de Hashing con Bcrypt:
javascript
CopiarEditar
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);


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

