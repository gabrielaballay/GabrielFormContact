# Constitución del Proyecto — Portafolio Profesional

Esta constitución define los principios, límites y criterios de calidad que gobiernan el desarrollo del portafolio. Toda especificación, plan, tarea e implementación debe respetarla. Si una decisión entra en conflicto con ella, debe resolverse antes de continuar.

## 1. Propósito

El proyecto es un portafolio profesional estático cuyo objetivo es atraer reclutadores y clientes potenciales mostrando experiencia, servicios y proyectos con una imagen moderna, minimalista y atractiva.

## 2. Principios rectores

1. **La especificación gobierna el código.** No se implementa nada fuera de una especificación aprobada.
2. **No se inventan requisitos.** Las decisiones de negocio y de alcance corresponden al usuario; ante una duda relevante, se pregunta.
3. **Proceso por fases con aprobación explícita.** No se avanza de fase sin autorización.
4. **Trabajo una tarea por vez.** Cada tarea se implementa, verifica y cierra antes de iniciar la siguiente.
5. **Preservar lo existente.** No se sobrescribe trabajo válido sin autorización.
6. **Trazabilidad.** Cada requisito debe vincularse con su plan, tarea, código y validación.

## 3. Diseño y experiencia de usuario

- El diseño debe ser **moderno, minimalista y atractivo**, alineado con la skill `frontend-design`.
- La jerarquía visual, tipografía, espaciado y paleta deben ser intencionales y coherentes.
- La interfaz debe verse correctamente en móvil, tablet y desktop.
- Se prioriza la claridad del mensaje: perfil, servicios y proyectos deben identificarse rápido.

## 4. Stack y tecnología

- El sitio se migrará a **Vite** como herramienta de desarrollo y build.
- Se usará la habilidad **`frontend-design`** como guía de dirección visual.
- No se impone un framework de UI específico; cualquier adición debe justificarse y aprobarse.
- No se ejecutan comandos de otros ecosistemas (por ejemplo `.NET`) que no correspondan al proyecto.
- Las dependencias deben ser mínimas y justificadas; se evita el peso innecesario.

## 5. Accesibilidad y rendimiento

- Accesibilidad básica: contraste suficiente, etiquetas semánticas correctas, navegación por teclado y textos alternativos en imágenes.
- Rendimiento: carga rápida, imágenes optimizadas y ausencia de recursos bloqueantes innecesarios.
- El sitio debe funcionar sin conexión a CDN solo si el recurso es imprescindible; se preferirá empaquetar o degradar con elegancia cuando aplique.

## 6. Contenido e idioma

- El idioma de la interfaz y de los documentos del proyecto es **español**.
- El contenido debe ser veraz y coherente con la trayectoria real del profesional.
- Los textos deben ser claros, breves y orientados a reclutadores y clientes.

## 7. Seguridad y privacidad

- El formulario de contacto no debe exponer secretos en el cliente más allá de lo ya existente y aprobado.
- El token y el código de la Azure Function deben tratarse con cuidado: no se cambia un lado sin actualizar el otro.
- No se recopilan datos del visitante más allá de lo necesario para el contacto.

## 8. Pruebas y validación

- Toda tarea funcional debe tener criterios de aceptación verificables.
- Mientras no exista una herramienta de pruebas configurada, la validación principal es la inspección manual en navegador (responsive incluido).
- No se declara una validación como exitosa sin evidencia real.
- Se distingue entre validaciones ejecutadas, pendientes, fallidas y no aplicables.

## 9. Convenciones de desarrollo

- Mantener HTML semántico y estructura comprensible.
- Estilos y scripts organizados de forma mantenible (no mezclar indiscriminadamente si el proyecto crece).
- Nombres de archivos y rutas coherentes, evitando inconsistencias de mayúsculas/minúsculas.
- Los cambios deben ser acotados y revisables; se evita la fragmentación excesiva y los cambios masivos no justificados.

## 10. Gestión de cambios y trazabilidad

- Todo cambio de alcance o de requisito se evalúa, se explica y se aprueba antes de implementarse.
- No se modifica retrospectivamente una especificación para justificar una desviación de la implementación.
- Las decisiones confirmadas y el estado del proceso se registran en `MEMORY.md`.
