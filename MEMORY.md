# MEMORY.md

Estado persistente del proceso SDD. Registrar solo decisiones confirmadas y resultados verificados. No registrar propuestas como aprobadas.

## Estado de fases

- **Inicialización:** completada. `PROJECT_BRIEF.md` aprobado y creado.
- **Constitución:** completada. `docs/constitution.md` aprobado.
- **Especificación 001:** completada. `specs/001-portfolio/spec.md` aprobada.
- **Plan 001:** completada. `specs/001-portfolio/plan.md` aprobado.
- **Tareas 001:** completada. `specs/001-portfolio/tasks.md` aprobado (10 tareas).
- **Implementación:** T1–T10 implementadas. T1, T2 y T10 cerradas como técnicas; **T3, T4, T5, T6, T7 y T9 aceptadas** (validación manual 2026-10-30); **T8 pendiente** por H-1 (CORS).
- **Revisión integral:** completada. Hallazgos: H-1 (alto, CORS externo), H-2 (medio, `alt` incorrectos), H-3/H-4 (bajos, corregidos), H-5/H-6 (bajos, documentación).
- **Correcciones:** H-2 (`alt` de `venta.png`, `venta2.png` y `migracion2.png`), H-3 (`aria-current`) y H-4 (tipografía de "Sobre mí") aplicadas y verificadas. H-5 (documentación) actualizada.
- **CORS (H-1):** decisión del usuario = **opción b**: validar el camino feliz del formulario desde `https://gabrielaballay.github.io` tras desplegar.
- **Correcciones de UI 2026-10-30:** hero sin el nombre y con `h1` reducido a `clamp(2.25rem, 4.5vw, 3.5rem)`; "Sobre mí" al 100% del ancho; doble línea de Servicios eliminada; formulario centrado; `--padding-seccion` a `clamp(48px, 6vw, 80px)`. Build y valores computados verificados.

## Decisiones confirmadas

- Producto: portafolio profesional de Gabriel Aballay (desarrollador .NET).
- Objetivo: atraer reclutadores y clientes, con imagen moderna, minimalista y atractiva.
- Vite vanilla; sin Bootstrap; CSS propio con tokens; Archivo + Newsreader vía `@fontsource`.
- Estructura `index.html` raíz + `src/styles` + `src/js` + `public/images`.
- Proyectos: 4 fichas; proyecto 4 unificado con dos sub-bloques.
- Formulario: se conserva URL, `code` y token actuales; validación en cliente y estados accesibles.
- Footer: `aballaygabriel@gmail.com` y `https://linkedin.com/in/gabriel-aballay-a2746a164`.
- Deploy en `gabrielaballay.github.io` (raíz) → `base: '/'`.
- Sin framework de tests; validación con build/preview, checklist y Lighthouse.
- Idioma: español.

## Decisiones pendientes

- **T8:** desplegar en `https://gabrielaballay.github.io`, validar el camino feliz del formulario (H-1) y luego marcarla.

## Notas técnicas verificadas

- Node 26.3.0 / npm 11.16.0 / Vite 8.3.5.
- Build OK (12 módulos); Lighthouse móvil: LCP 1,696 s, CLS 0,00534, Performance 99, Accessibility 100, Best Practices 100, SEO 83.
- 8 imágenes en `public/images/` y `dist/images/`; `principal.jpg` en minúscula; sin referencias a `Principal.jpg` en código/build.
- Sin restos de Bootstrap, `cdn.jsdelivr.net`, carrusel ni `alert()` en `index.html`/`src/`/`dist/`.
- CORS del endpoint: `https://gabrielaballay.github.io` autorizado; `localhost:4173/5173` rechazado (preflight 400).
- No es repositorio git; no hay `git status`/`git diff`.

## Próximo paso propuesto

- T8 (post-despliegue); luego `/sdd-validate` para cerrar la spec 001.
