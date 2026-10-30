# PROJECT_BRIEF.md — Portafolio Profesional de Gabriel Aballay

## 1. Descripción y objetivos del producto

Sitio web estático de portafolio profesional destinado a presentar la trayectoria, habilidades y proyectos de Gabriel Aballay como desarrollador .NET.

**Objetivos principales:**
- Atraer reclutadores técnicos y de talento.
- Conseguir clientes para proyectos de desarrollo de software.
- Transmitir una imagen profesional, moderna y atractiva a primera vista.

## 2. Usuarios y necesidades

| Usuario | Necesidad |
|---------|-----------|
| Reclutadores y equipos de contratación | Identificar rápido el perfil técnico, stack, experiencia y proyectos relevantes. |
| Clientes potenciales | Evaluar capacidades, especialidades (.NET, Azure, arquitectura limpia, integraciones) y medios de contacto. |
| Visitantes generales | Navegar el sitio sin fricciones, en dispositivos móviles y desktop, con tiempos de carga bajos. |

## 3. Alcance funcional general

El sitio debe permitir al visitante:

- Conocer quién es el profesional y su propuesta de valor (sección de presentación / "Sobre mí").
- Ver los servicios ofrecidos, con énfasis en tecnologías y dominios (.NET 8, APIs REST, integraciones, Azure DevOps, etc.).
- Explorar proyectos destacados con descripción, tecnologías utilizadas y evidencia visual.
- Contactar al profesional mediante un formulario funcional.

## 4. Módulos y etapas funcionales previstas

1. **Hero / Presentación:** nombre, rol, stack principal y llamado a la acción (contacto).
2. **Sobre mí:** resumen profesional, experiencia y filosofía de trabajo.
3. **Servicios:** tarjetas o bloques con las principales ofertas de valor.
4. **Proyectos destacados:** galería o listado con imágenes, descripción, tecnologías y, opcionalmente, enlaces externos.
5. **Contacto:** formulario de envío de mensaje con validación básica y confirmación de envío.
6. **Footer:** copyright y datos de contacto secundarios.

## 5. Requisitos no funcionales relevantes

- **Diseño moderno, minimalista y atractivo**, aplicando la skill `frontend-design`.
- **Responsivo:** uso correcto en móvil, tablet y desktop.
- **Rendimiento:** carga rápida, imágenes optimizadas, sin dependencias pesadas innecesarias.
- **Mantenibilidad:** estructura clara que permita actualizar proyectos y contacto sin reescribir el sitio.
- **Accesibilidad básica:** contraste suficiente, navegación por teclado y etiquetas semánticas.

## 6. Restricciones y criterios generales de calidad

- El sitio se migrará de HTML puro estático a un proyecto construido con **Vite**.
- Se utilizará la habilidad **`frontend-design`** para definir la dirección visual (tipografía, paleta de colores, espaciado, componentes).
- No se impone un framework de UI específico; la decisión queda abierta a lo que determine la skill y el diseño aprobado.
- El formulario de contacto debe seguir funcionando (o reemplazarse por una alternativa equivalente aprobada).

## 7. Supuestos, riesgos y decisiones pendientes

**Supuestos:**
- El contenido actual (texto de proyectos, servicios, imagen de perfil) se conserva o se reescribe ligeramente sin cambio de sentido.
- Las imágenes existentes en `images/` son reutilizables, aunque algunos nombres de archivo tengan inconsistencia de mayúsculas/minúsculas.

**Decisiones pendientes:**
- Definición final de la paleta de colores y tipografía (a determinar con la skill `frontend-design`).
- Si se conserva el endpoint actual de Azure Function para el formulario o se adopta otro mecanismo.
- Qué proyectos destacados se mantienen, se actualizan o se agregan.
- Nombre y orden final de las secciones (se autorizó al asistente proponer cambios).

**Riesgos:**
- Perder referencias a imágenes si se renombran archivos sin actualizar el HTML.
- Que el formulario de contacto deje de funcionar si se cambia su integración sin coordinación con el backend de Azure.

## 8. Fuera de alcance

- Backend propio o base de datos.
- Autenticación de usuarios.
- Área de blog o publicaciones periódicas.
- E-commerce o pasarelas de pago.
- Aplicación móvil nativa.
