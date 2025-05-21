const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Servidor HTTPS funcionando!');
});

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

https.createServer(options, app).listen(8443, () => {
  console.log('Servidor HTTPS corriendo en puerto 8443');
});