# Spec 001 — Portafolio profesional con Vite y rediseño moderno
Estado: aprobada

## Contexto y objetivo

El sitio actual es una única página HTML estática (Bootstrap por CDN, estilos inline) que presenta a Gabriel Aballay como desarrollador .NET. Se busca migrarlo a un proyecto Vite y rediseñarlo con una estética moderna, minimalista y atractiva, manteniendo su función de atraer reclutadores y clientes.

Objetivo: ofrecer una experiencia profesional, responsive y rápida que comunique perfil, servicios, proyectos y medios de contacto.

## Usuarios

- Reclutadores y equipos de contratación.
- Clientes potenciales.
- Visitantes generales (desktop y móvil).

## Historias de usuario

- HU-1. Como reclutador, quiero identificar rápidamente el perfil, stack y experiencia para evaluar al profesional.
- HU-2. Como cliente potencial, quiero conocer los servicios y proyectos para decidir si contactar.
- HU-3. Como visitante, quiero contactar al profesional mediante un formulario claro y funcional.
- HU-4. Como visitante móvil, quiero navegar el sitio cómodamente desde mi dispositivo.

## Requisitos funcionales

- **RF-1.** EL SISTEMA debe mostrar una sección inicial (hero) con nombre, rol, stack principal y un llamado a la acción hacia el contacto.
- **RF-2.** EL SISTEMA debe mostrar una sección "Sobre mí" con un resumen profesional.
- **RF-3.** EL SISTEMA debe mostrar una sección de servicios con las principales ofertas de valor.
- **RF-4.** EL SISTEMA debe mostrar una sección de proyectos destacados con, al menos, título, descripción, tecnologías e imágenes.
- **RF-5.** EL SISTEMA debe ofrecer navegación hacia las secciones principales (menú o anclas).
- **RF-6.** EL SISTEMA debe mostrar un formulario de contacto con campos de nombre, correo y mensaje, con validación básica de campos requeridos.
- **RF-7.** CUANDO el visitante envíe el formulario con datos válidos, EL SISTEMA debe enviar los datos al endpoint actual de Azure Function y mostrar una confirmación.
- **RF-8.** SI el envío del formulario falla, ENTONCES EL SISTEMA debe mostrar un mensaje de error comprensible.
- **RF-9.** EL SISTEMA debe mostrar un footer con copyright y datos de contacto secundarios.

## Requisitos no funcionales

- **RNF-1.** EL SISTEMA debe presentar un diseño moderno, minimalista y atractivo, coherente con la guía `frontend-design`.
- **RNF-2.** EL SISTEMA debe ser responsive y verse correctamente en móvil, tablet y desktop.
- **RNF-3.** EL SISTEMA debe cargar de forma ágil, con imágenes optimizadas y sin dependencias innecesarias.
- **RNF-4.** EL SISTEMA debe cumplir accesibilidad básica: HTML semántico, textos alternativos, contraste suficiente y navegación por teclado.
- **RNF-5.** EL PROYECTO debe construirse y ejecutarse con **Vite** (servidor de desarrollo y build de producción).
- **RNF-6.** El contenido y los documentos del proyecto deben estar en **español**.
- **RNF-7.** Las rutas de recursos (imágenes) deben ser coherentes y funcionar en sistemas de archivos sensibles a mayúsculas/minúsculas.

## Casos límite

- Imagen que no carga: debe mostrarse el texto alternativo sin romper el layout.
- Envío de formulario con campos vacíos o correo inválido: debe impedirse y señalarse.
- Error de red o respuesta no exitosa del endpoint: mensaje de error visible.
- Pantallas muy pequeñas: el contenido no debe desbordarse horizontalmente.
- Ausencia de conexión a recursos externos: el sitio debe mantener su estructura y legibilidad.

## Supuestos

- Se conservan los 4 proyectos actuales como base; su selección y textos pueden ajustarse sin cambiar el alcance funcional.
- La decisión de conservar Bootstrap o adoptar estilos propios se define en el plan técnico.
- La paleta de colores y la tipografía se definen en el plan/diseño con la guía `frontend-design`.

## Fuera de alcance

- Backend propio, base de datos o panel de administración.
- Autenticación de usuarios.
- Blog, e-commerce o pagos.
- CMS o edición de contenido en tiempo real.
- Aplicación móvil nativa.

## Criterios de finalización

- Todas las secciones (hero, sobre mí, servicios, proyectos, contacto, footer) están presentes y navegables.
- El diseño cumple la dirección moderno/minimalista/atractiva y se ve correctamente en tres tamaños de pantalla.
- El formulario envía datos al endpoint actual y muestra confirmación o error según corresponda.
- El build de producción con Vite finaliza sin errores.
- Se verifican accesibilidad básica y consistencia de rutas de imágenes.
- La validación queda documentada con evidencia real.

## Dudas abiertas

- Ninguna duda bloqueante.
