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
