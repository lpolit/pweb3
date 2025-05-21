TEMAS

REPASO - DOCKER

	BACKEND
	 - Creamos dockerFile
	 - Generamos imagen backened
	 - Levantamos imagen backened en puerto 5000:3000 (mostramos que ya no esta mas en el 3000) 
	 - LO DEJAMOS LEVANTADO
	 
	FRONTEND
	 - Creamos dockerFile
	 - Generamos imagen backened
	 - Levantamos imagen backened en puerto 8080:80
	 - Mostramos que no responde el backend porque esta el 3000
	 
	DOCKER COMPOSE
	
	- Creamos de manera simple con HTTP
		*********************************
		services:
		  frontend:
			image: lpolitano-front:0.0.1
			ports:
			  - "8080:80"

		  backend:
			image: lpolitano-back:0.0.1
			ports:
			  - "3000:3000"	
			environment:
				CORS_ORIGIN: "http://localhost:8080"
		*********************************
	
	- AGREGAMOS HTTPS local usando caddy
		services:
			frontend:
			  image: lpolitano-front::0.0.2
			  expose:
				- "80"  # solo dentro de la red Docker

			backend:
			  image: lpolitano-back:0.0.1
			  expose:
				- "3000"
			  environment:
				CORS_ORIGIN: "https://localhost:8080"

			caddy:
			  image: caddy:alpine
			  ports:
				- "8080:443"  # HTTPS
				- "3000:3000"
			  volumes:
				- ./Caddyfile:/etc/caddy/Caddyfile
			  depends_on:
				- frontend
				- backend
	
			
## LINKS DE REFERENCIA:

### REPOSITORIOS DE EJEMPLOS:
https://github.com/lpolit/lpolitano-front
https://github.com/lpolit/lpolitano-back

#### DOCKER ONLINE
https://app.codeanywhere.com/

#### DOCUMENTACION DE PROGRAMACION WEB 2
https://github.com/ppandomail/pweb/blob/main/doc/deploy.md