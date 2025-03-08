## Seguridad en Aplicaciones Web (Frontend)
#### Concepto de Seguridad en el Frontend
🔹 Diferencias entre seguridad en frontend y backend
El frontend es la primera línea de defensa, pero no puede confiar en el cliente
La validación en frontend mejora la experiencia de usuario, pero la validación final debe realizarse en el backend
Principales amenazas en el frontend: XSS, CSRF, exposición de credenciales, manipulación del DOM
🔹 Buenas prácticas generales en seguridad para aplicaciones frontend
Implementación de principios Zero Trust
Evitar exponer datos sensibles en el frontend
Uso de Content Security Policy (CSP) para proteger la aplicación

#### Almacenamiento Seguro de JWT
🔹 ¿Dónde almacenar los tokens en el frontend?
localStorage: Persistente, pero vulnerable a XSS
sessionStorage: Similar a localStorage, pero se borra al cerrar la pestaña
HTTP-only Cookies: Más seguro contra XSS, pero requiere configuración en el backend
🔹 Mejor práctica recomendada
Almacenar Access Tokens en memoria (evita ataques XSS)
Almacenar Refresh Tokens en HTTP-only cookies (protección contra XSS y CSRF)
Ejemplo en Vue.js:
```js
import axios from 'axios';

// Guardar token en memoria
let accessToken = '';

export function setAccessToken(token) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

// Enviar token en encabezado Authorization
axios.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});
```

#### Renovación de Tokens y Manejo de Sesiones Caducadas
🔹 Concepto de Refresh Token y por qué es importante
Evita que el usuario tenga que iniciar sesión constantemente
Reduce la exposición de credenciales
🔹 Implementación de renovación automática en Vue.js
Usar axios con interceptors para manejar respuestas con 401 Unauthorized
Si el accessToken caduca, solicitar un nuevo token con el refreshToken
Ejemplo de interceptor en Vue:
```js
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            await refreshAccessToken();
            return axios(error.config); // Reintenta la petición con el nuevo token
        }
        return Promise.reject(error);
    }
);
```
#### Prevención de XSS (Cross-Site Scripting) con Directivas Vue
🔹 ¿Qué es un ataque XSS y cómo afecta al frontend?
Inyección de scripts maliciosos en una aplicación
Robo de cookies, tokens o ejecución de acciones en nombre del usuario
🔹 Medidas de prevención en Vue.js
Evitar v-html en Vue, ya que permite inyección de código
Escapado automático de Vue en interpolaciones ({{ userInput }})
Uso de CSP (Content Security Policy) para restringir scripts externos
Ejemplo de mala práctica con v-html:
```html
<p v-html="mensaje"></p> <!-- 🚨 Peligroso, permite XSS -->
Alternativa segura:
```
```html
<p>{{ mensaje }}</p> <!-- ✅ Vue escapa el contenido automáticamente -->
```
#### Validación de Formularios Antes de Enviar Datos al Backend
🔹 Razones para validar en el frontend
Mejora la experiencia del usuario
Reduce la carga en el backend
🔹 Validaciones con Vue.js y VeeValidate
Ejemplo de validación de email en Vue con VeeValidate:
```html
<template>
  <form @submit.prevent="submitForm">
    <input v-model="email" v-bind="emailField" />
    <span>{{ errors.email }}</span>
    <button type="submit">Enviar</button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Email inválido').required('Campo requerido')
      })
    });

    const emailField = useField('email');

    const submitForm = handleSubmit(values => {
      console.log('Formulario enviado:', values);
    });

    return { emailField, submitForm };
  }
};
</script>
```
#### Evitar la Inyección de Datos Maliciosos en Componentes
🔹 Principales riesgos
Inyección de datos en eventos o atributos HTML
Uso de eval() en JavaScript (evitarlo a toda costa)
🔹 Buenas prácticas en Vue.js
Usar directivas seguras (v-bind en vez de :style con valores no controlados)
Evitar eval() y setTimeout() con datos dinámicos
Ejemplo seguro de inyección de clases en Vue.js:
```html
<div :class="{'active': isActive}"></div> <!-- ✅ Seguro -->
Ejemplo inseguro (evitar):
```
```html
<div :class="userInput"></div> <!-- 🚨 Vulnerable a XSS -->
```
#### Uso de Variables de Entorno (.env) para Ocultar Credenciales
🔹 Por qué es importante usar variables de entorno
Evita exponer claves API en el código fuente
Facilita la configuración entre entornos de desarrollo y producción
🔹 Cómo configurar variables de entorno en Vue.js
Crear un archivo .env en la raíz del proyecto:
```js
VITE_API_URL=https://api.miapp.com
//Acceder a la variable en el código:
console.log(import.meta.env.VITE_API_URL);
```
### Bibliografía

Documentación Oficial y Artículos
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | OWASP XSS Prevention Cheat Sheet|https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html| 
| 2 | Vue.js Security Best Practices| https://vuejs.org/guide/best-practices/security.html| 
| 3 | Autenticación con JWT en Vue.js| https://auth0.com/blog/vue-authentication-tutorial/| 
| 4 | Validación en formularios con VeeValidate| https://vee-validate.logaretm.com/v4/| 

