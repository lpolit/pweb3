### Introducción
- ¿Qué es HTTPS y por qué es importante?
- Diferencias entre HTTP y HTTPS.
- Conceptos básicos de seguridad: TLS/SSL, certificados, cifrado.

### ¿Cómo funciona HTTPS?
- Handshake TLS (de forma simplificada).
- Certificados digitales y autoridades certificadoras (CA).
- Claves públicas y privadas.

### Configurar un servidor HTTPS con Node.js y Express
- Requisitos previos: certificado SSL y clave privada.
- Uso de certificados autofirmados para pruebas.
- Código ejemplo básico:


```js
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Servidor HTTPS funcionando!');
});

const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS corriendo en puerto 443');
});

```

### Generar certificados autofirmados (para desarrollo)
#### INSTALAR OPENSSL
https://slproweb.com/products/Win32OpenSSL.html

Descargar el instalador
Instalar todo siguiente
En variables de entorno, agregar la ruta /bin de la instalacion al path.

Comando con OpenSSL:
```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.crt -days 365
```
- Explicación de cada parámetro.
- Ubicación segura de los certificados.

### Uso de certificados válidos en producción
- Let's Encrypt: cómo funciona y por qué es gratis.
- Uso de herramientas como Certbot.
- Renovación automática de certificados.

### Seguridad adicional
- Redirección de HTTP a HTTPS.
- Políticas de seguridad HTTP (HSTS).
- Uso de middlewares como helmet en Express.

### Buenas prácticas en la administración de servidores HTTPS
- Renovación y monitoreo de certificados.
- No exponer archivos privados.
- Control de logs sensibles.

#### Bibliografía
Documentación Oficial y Artículos
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Let's Encrypt - Documentación oficial | https://letsencrypt.org/docs/|
| 2 | Certbot - Generación automática de certificados SSL | https://certbot.eff.org/|
| 3 | NGINX - Guía oficial de Proxy Reverso | https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/| 
| 4 | Configuración de HTTPS en Express.js | 🔗 https://expressjs.com/en/advanced/best-practice-security.html| 

