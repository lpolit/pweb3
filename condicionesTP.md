## Trabajo Práctico 
### Entrega 1 (Backend)
### Objetivo

Desarrollar una API backend aplicando conceptos de seguridad, control de acceso y buenas prácticas vistas en la materia.

### Alcance de la Entrega

La entrega debe incluir un backend funcional que contemple:

#### Autenticación con JWT
Implementación de autenticación basada en JSON Web Tokens.
Endpoint de login que genere el token.
Protección de rutas mediante middleware.
Manejo correcto de expiración de tokens.
#### Autorización con RBAC (Role-Based Access Control)
Definición de al menos 2 roles (ej: admin, user).
Restricción de acceso a endpoints según el rol.
Middleware o lógica que valide permisos.
#### Buenas Prácticas de Seguridad

Se deberá aplicar obligatoriamente:

- Sanitización de datos
- Evitar inyección de código (XSS, etc).
- Validación de datos
- Verificación de tipos, campos obligatorios y formatos.
- Registro de logs
- Límite de peticiones (Rate Limiting)
-----------------------------------------------------------------
### Entrega Final (Full Stack)
#### Objetivo

Completar la aplicación incorporando un frontend funcional y aplicando buenas prácticas de seguridad tanto en cliente como en servidor.
### Alcance de la Entrega

La entrega final debe incluir todo lo solicitado en la Entrega 1 (Backend) y además:

### Frontend (FE)

Se deberá desarrollar una interfaz de usuario que consuma las APIs creadas previamente.

### Seguridad en Frontend

Se deberá aplicar obligatoriamente:

#### Prevención de XSS
 - Evitar el uso de innerHTML con contenido dinámico no controlado.
 - Sanitizar cualquier dato mostrado que provenga del usuario o del backend.
 - Uso seguro del DOM 
#### No exposición de datos sensibles
- No hardcodear:
 - Tokens
 - Claves
 - URLs sensibles
- No mostrar información sensible en consola.
- Manejo adecuado de errores (no exponer stack traces ni detalles internos).
####  Validación de datos (Frontend)
Validaciones del lado del cliente
#### Almacenamiento de tokens
- Implementación de almacenamiento de JWT en el frontend.
- Justificación de la estrategia utilizada(localStorage, sessionStorage o cookies)
- Considerar implicancias de seguridad (XSS, CSRF, etc).
#### Integración con Backend
- Consumo de endpoints protegidos con JWT.
- Envío correcto del token en cada request.
- Manejo de estados de autenticación (login/logout).

### Requisitos Técnicos
Frontend en HTML + CSS + JavaScript o framework (ej: Vue.js)
Código organizado y modular
Separación clara entre lógica y presentación

## Entrega
- 2 Repositorios, uno para el Backend  y otro para el Frontend
- README.md actualizado en cada uno con:
  - Instrucciones completas de ejecución
  