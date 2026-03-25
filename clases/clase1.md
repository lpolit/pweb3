

## Actividad en clase (30 min)
### Actividad 1 – Clasificación (ideal en grupos)

Decidir ¿Monolito o microservicios?

Ejemplos:

- Sistema de turnos para una veterinaria
- Ecommerce tipo MercadoLibre
- Sistema interno de una escuela
- App bancaria
- Startup con 2 programadores

justificar, no solo responder.

### Actividad 2 – Pensar evolución

Caso: “Arrancaste con un monolito. El proyecto creció.”

- ¿Qué módulo separarías primero?
- ¿Por qué auth suele ser el primero?
- ¿Se puede mezclar monolito + microservicios?




## RESPUESTAS 

🧪 Actividad 1 – ¿Monolito o Microservicios?
1️⃣ Sistema de turnos para una veterinaria

👉 Monolito

Justificación:

Alcance chico

Pocos usuarios concurrentes

Equipo reducido (probablemente 1–2 devs)

No requiere alta escalabilidad ni alta disponibilidad

💡 Microservicios acá sería sobreingeniería.

2️⃣ Ecommerce tipo MercadoLibre

👉 Microservicios

Justificación:

Altísimo volumen de usuarios

Múltiples dominios bien definidos:

usuarios

pagos

publicaciones

envíos

Necesidad de escalar módulos de forma independiente

Equipos grandes trabajando en paralelo

💡 Un fallo en pagos no debería tumbar todo el sistema.

3️⃣ Sistema interno de una escuela

👉 Monolito (con posible evolución futura)

Justificación:

Uso interno

Tráfico predecible

Reglas de negocio simples

Bajo presupuesto

📌 Puede empezar como monolito y, si crece mucho, migrar parcialmente.

4️⃣ App bancaria

👉 Microservicios (con arquitectura híbrida)

Justificación:

Alta disponibilidad obligatoria

Seguridad crítica

Múltiples sistemas integrados

Auditoría y trazabilidad

Escalado independiente (transferencias ≠ consultas)

⚠️ Suele haber microservicios + sistemas legacy.

5️⃣ Startup con 2 programadores

👉 Monolito

Justificación:

Time-to-market rápido

Menos carga operativa

Infraestructura simple

Menos costos

💡 El objetivo es validar la idea, no escalar desde el día uno.

🧪 Actividad 2 – Evolución del Monolito
Caso:

“Arrancaste con un monolito. El proyecto creció.”

🔹 ¿Qué módulo separarías primero?

👉 Autenticación / Autorización

Motivos:

Es transversal a todo el sistema

Suele reutilizarse en otros proyectos

Tiene reglas claras y bien definidas

Permite centralizar seguridad (JWT, RBAC)

🔹 ¿Por qué Auth suele ser el primero?

Escala distinto al resto

Permite independencia tecnológica

Reduce acoplamiento

Facilita integración con terceros (OAuth, SSO)

📌 Excelente excusa para introducir JWT y seguridad más adelante.

🔹 ¿Se puede mezclar monolito + microservicios?

👉 Sí, totalmente (arquitectura híbrida)

Ejemplo típico:

Core del negocio → Monolito

Auth → Microservicio

Pagos → Microservicio

Notificaciones → Microservicio

💡 La mayoría de los sistemas reales funcionan así.