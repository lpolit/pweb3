## Administración de Servidores HTTPS
#### Instalación y Configuración de un Servidor HTTPS
🔹 Concepto de HTTPS y su importancia
Diferencias entre HTTP y HTTPS.
Beneficios de HTTPS: cifrado, integridad de datos y autenticación.
Funcionamiento del protocolo TLS/SSL en la seguridad web.
🔹 Configuración básica de un servidor web con HTTPS
Elección del servidor: Nginx, Apache, Caddy, Express.js.
Configuración de HTTPS en Express.js con https de Node.js.
Ejemplo de servidor HTTPS con Node.js y Express:

```js
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.get('/', (req, res) => {
  res.send('Servidor HTTPS activo');
});

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS en ejecución en el puerto 443');
});
```
#### Implementación de Certificados SSL/TLS con Let's Encrypt
🔹 ¿Qué es Let's Encrypt?
Autoridad de certificación gratuita y automatizada.
Facilita la implementación de HTTPS con certificados válidos.
Integración con Certbot para automatizar la instalación y renovación.
🔹 Generación e instalación de un certificado SSL con Certbot
Pasos para configurar Let's Encrypt en Nginx:
```sh
Instalar Certbot en Linux:
sudo apt update
sudo apt install certbot python3-certbot-nginx

Obtener un certificado para un dominio:
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

Configurar la renovación automática:
sudo certbot renew --dry-run
```
🔹 Configuración manual en Nginx
Editar la configuración del servidor en /etc/nginx/sites-available/default:

#### Configuración de Proxy Reverso con Express
🔹 ¿Qué es un Proxy Reverso y por qué usarlo?
Un proxy reverso gestiona el tráfico entrante y lo redirige a servidores internos.
Beneficios: seguridad, balanceo de carga, compresión, caching.
🔹 Configuración en Express.js para trabajar con proxy reverso
```js
const express = require('express');
const app = express();

app.set('trust proxy', true); // Reconocer el proxy reverso
app.get('/', (req, res) => {
  res.send(`Tu IP es: ${req.ip}`);
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
```
#### Bibliografía
Documentación Oficial y Artículos
| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Let's Encrypt - Documentación oficial | https://letsencrypt.org/docs/|
| 2 | Certbot - Generación automática de certificados SSL | https://certbot.eff.org/|
| 3 | NGINX - Guía oficial de Proxy Reverso | https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/| 
| 4 | Configuración de HTTPS en Express.js | 🔗 https://expressjs.com/en/advanced/best-practice-security.html| 

