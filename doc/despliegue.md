## Despliegue Avanzado
#### Concepto de Despliegue Avanzado
🔹 Definición y objetivos
El despliegue avanzado busca automatizar, optimizar y escalar aplicaciones web en entornos de producción.
Se centra en herramientas de orquestación, integración continua y despliegue continuo.
🔹 Diferencias entre despliegue manual y automatizado
Característica
Despliegue Manual
Despliegue Automatizado
Control
Alto, pero propenso a errores
Automatizado y confiable
Tiempo
Requiere intervención humana
Más rápido y eficiente
Escalabilidad
Difícil de mantener en grandes infraestructuras
Fácilmente escalable


#### Introducción a DevOps y CI/CD
🔹 ¿Qué es DevOps?
Cultura de colaboración entre desarrollo (Dev) y operaciones (Ops).
Su objetivo es entregar software de manera rápida y confiable.
Principales prácticas: Automatización, Monitoreo, CI/CD, Contenedores, Infraestructura como Código (IaC).
🔹 Concepto de CI/CD (Integración y Despliegue Continuo)
CI (Continuous Integration): Automatiza pruebas y validación del código antes de su integración.
CD (Continuous Deployment/Delivery): Automatiza el despliegue en entornos de prueba o producción.
Ejemplo de flujo CI/CD:
Un desarrollador sube código a GitHub/GitLab.
Un sistema CI ejecuta pruebas y validaciones.
Si todo es correcto, el código se despliega automáticamente.

#### Automatización del Despliegue con GitHub Actions y GitLab CI/CD
🔹 GitHub Actions
Permite automatizar flujos de trabajo (build, test, deploy) dentro de GitHub.
Se configura con archivos YAML en .github/workflows/.
Ejemplo de GitHub Actions para desplegar en un servidor:
yaml
CopiarEditar
name: Deploy App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instalar dependencias
        run: npm install
      - name: Construir aplicación
        run: npm run build
      - name: Desplegar en el servidor
        run: rsync -avz ./dist/ user@server:/var/www/app
🔹 GitLab CI/CD
Proporciona pipelines para la integración y despliegue continuo en GitLab.
Se configura en .gitlab-ci.yml.
Ejemplo de GitLab CI/CD para desplegar en Docker:
yaml
CopiarEditar
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t miapp .

deploy:
  stage: deploy
  script:
    - docker run -d -p 80:80 miapp

#### Contenedores Avanzados: Docker Compose y Kubernetes en Producción
🔹 Docker Compose
Permite definir y ejecutar múltiples contenedores con un solo archivo docker-compose.yml.
Ejemplo de Docker Compose con Nginx y Node.js:
```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: miapp
 ```     
Ejecutar con:
```sh
docker-compose up -d
```
🔹 Kubernetes en Producción
Kubernetes es un orquestador de contenedores para administrar despliegues en escala.
Utiliza Pods, Deployments, Services e Ingress.
Ejemplo de Deployment en Kubernetes:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: miapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: miapp
  template:
    metadata:
      labels:
        app: miapp
    spec:
      containers:
        - name: miapp
          image: miapp:latest
          ports:
            - containerPort: 3000
```
Ejecutar en Kubernetes:
```sh
kubectl apply -f deployment.yaml
```

#### Bibliografía
Documentación Oficial y Artículos

| # | Tema | Fuentes |
| -- | ----------- | ------------ |
| 1 | Docker - Documentación Oficial | https://docs.docker.com/ |
| 2 | Docker Compose - Guía Oficial | https://docs.docker.com/compose/|
| 3 |Kubernetes - Guía Oficial | https://kubernetes.io/docs/home/|
| 4 |GitHub Actions - Documentación Oficial| https://docs.github.com/en/actions
| 5 |GitLab CI/CD - Documentación Oficial|https://docs.gitlab.com/ee/ci/
