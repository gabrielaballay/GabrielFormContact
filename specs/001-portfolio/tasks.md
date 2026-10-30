# Tasks 001 — Portafolio profesional con Vite y rediseño moderno
Estado: aprobada
Spec: `specs/001-portfolio/spec.md`
Plan: `specs/001-portfolio/plan.md`

## Precondiciones de ejecución

- [PENDIENTE heredado del plan §2] Confirmar Node.js ≥ 20.19 y npm disponibles. Sin esto T1 no puede empezar.
- [PENDIENTE heredado del plan §4 y §10] Aprobación del copy reescrito de "Servicios" y de la lista de `alt` por imagen **antes** de T4 y T5 respectivamente.
- Endpoint de Azure Function sin cambios; su comportamiento CORS se verifica en T8 (riesgo abierto, ver notas).

## Tareas

- [x] **T1. Andamiaje Vite y migración de assets.** RNF-5, RNF-7, RNF-3
  - Resultado esperado: proyecto Vite mínimo ejecutable (`package.json` con `dev`/`build`/`preview`, `vite.config.js` con `base: '/'` y `build.target: 'es2020'`, `.gitignore`, `index.html` en la raíz y `src/main.js`) y las 8 imágenes servidas desde `public/images/`, sin dependencias de CDN.
  - Hecho cuando: `npm install` y `npm run build` terminan sin errores ni warnings de assets faltantes; `dist/images/` contiene exactamente las 8 imágenes, incluida `principal.jpg` en minúscula; `images/Principal.jpg` ya no existe; no queda ninguna referencia a `Principal.jpg` ni a `cdn.jsdelivr.net` en `index.html`/`src/`; `npm run dev` sirve la página en `localhost:5173`.
  - Tipo: técnica.
  - Depende de: precondición de Node.js.
  - Estimación: ~25 min.
  - Resultado real (2026-10-28): Node 26.3.0 / npm 11.16.0 / Vite 8.3.5. Creados `package.json`, `vite.config.js`, `.gitignore`, `src/main.js`, `package-lock.json`; 8 imágenes movidas a `public/images/` y `Principal.jpg` → `principal.jpg`. `npm install`, `npm run build` y `npm run dev` (HTTP 200 en `localhost:5173`) ejecutados; `dist/images/` con 8 archivos; 0 referencias a `Principal.jpg`, `cdn.jsdelivr.net`, `bootstrap` y `data-bs` en `index.html`/`src/`.
  - Revisión independiente (`reviewer`): aprobada con observaciones, sin hallazgos críticos ni altos. H-2 (bloque comentado `rabbit2.png`) y H-3 (clases Bootstrap residuales en el marcado) se difieren a T5/T10; la evidencia de ejecución provista por el implementer se considera válida.
  - Corrección 2026-10-30: `base` cambiado a `/GabrielFormContact/` por despliegue en GitHub Pages de proyecto; build verificado.

- [x] **T2. Sistema visual: tokens, tipografía y base.** RNF-1, RNF-2, RNF-3, RNF-4
  - Resultado esperado: `src/styles/tokens.css` (paleta §3.2, radios, espaciado, escala tipográfica), `src/styles/base.css` (reset, escala fluida con `clamp`, contenedor 1120px, padding lateral y vertical por sección, foco `2px var(--cobalto)` con `offset 3px`, `overflow-wrap`, `prefers-reduced-motion`) y fuentes Archivo + Newsreader autoalojadas vía `@fontsource` (subconjunto latino, `font-display: swap`), importadas desde `src/main.js`.
  - Hecho cuando: `npm run build` sin errores; en `npm run preview` DevTools muestra Archivo y Newsreader realmente aplicadas (no fallback de sistema) y **cero** requests a dominios externos; al tabular el foco es visible con el anillo cobalto; los contrastes de los pares de §3.2 quedan medidos con medidor real y registrados (los valores del plan son estimaciones).
  - Tipo: técnica (su resultado visual se valida en T3/T4/T9).
  - Depende de: T1.
  - Estimación: ~30 min.
  - Resultado real (2026-10-29): `@fontsource-variable/archivo` y `@fontsource-variable/newsreader` 5.3.0; creados `src/styles/fuentes.css`, `tokens.css` y `base.css` con paleta, escala tipográfica, layout 1120px, foco cobalto y `prefers-reduced-motion`. `npm run build` OK (8 módulos, 2 woff2 latin en `dist/assets/`); `npm run preview` verificado con CDP: Archivo/Newsreader cargadas, 14 requests todos a `localhost`, foco `2px solid rgb(32,73,200)` offset 3px. Contrastes medidos: 14.17:1, 6.10:1, 7.37:1 y 6.32:1 (todos AA).
  - Revisión independiente: diferida por autorización expresa del usuario hasta finalizar todas las tareas (se hará una revisión integral al cierre).
  - Ajuste 2026-10-30: `--padding-seccion` reducido a `clamp(48px, 6vw, 80px)` por pedido de UI; build verificado.

- [x] **T3. Header sticky, navegación y hero con pipeline.** RF-1, RF-5, RNF-1, RNF-2, RNF-4
  - Resultado esperado: enlace "Saltar al contenido" como primer elemento enfocable; `header` sticky translúcido (con fallback sólido) con nombre, las 4 anclas y CTA "Hablemos"; `src/js/nav.js` con menú móvil (`aria-expanded`/`aria-controls`, cierre con `Esc` y al elegir ancla) y marca de ancla activa; sección `#inicio` con `h1` único, rol, propuesta de valor, CTA primario/secundario y diagrama SVG de 4 capas (`role="img"` + `<title>`), animación única de ~600 ms y versión simplificada en móvil; `scroll-margin-top` igual a la altura del header.
  - Hecho cuando: desde desktop y móvil cada ancla lleva a su sección y el título queda visible (no tapado por el header); el menú móvil abre y cierra con teclado y con `Esc`; hay un solo `h1` en el documento; con `prefers-reduced-motion` activo no corre la animación; el diagrama conserva su información en móvil; sin errores en consola. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T2.
  - Estimación: ~30 min.
  - Resultado real (2026-10-29): header sticky con fallback sólido, skip link, nav móvil con `aria-expanded`/`Esc`, hero `#inicio` con `h1` único, CTAs y SVG de pipeline responsive; creados `src/styles/components.css` y `src/js/nav.js`. `npm run build` OK (10 módulos); 32 comprobaciones CDP OK (anclas desktop/móvil, teclado, `prefers-reduced-motion`, consola limpia). Validación manual: aceptada (2026-10-30).
  - Revisión integral: sin hallazgos críticos ni altos; H-3 (bajo, `aria-current`) corregido y verificado.
  - Corrección 2026-10-30: `h1` del hero sin el nombre (titular "APIs y sistemas .NET con arquitectura clara") y con `font-size: clamp(2.25rem, 4.5vw, 3.5rem)`; build y valores computados verificados (36px móvil, 56px a 1280). Re-validación manual: aceptada (2026-10-30).

- [x] **T4. Secciones "Sobre mí" y "Servicios".** RF-2, RF-3, RNF-1, RNF-2, RNF-4, RNF-6
  - Resultado esperado: patrón de encabezado de sección reutilizable (título a la izquierda, línea de contexto a la derecha, regla horizontal); `#sobre-mi` con resumen profesional basado en el texto actual + 3 datos de contexto (sin inventar experiencia); `#servicios` como lista de definiciones con reglas horizontales y glifo SVG inline por servicio (`aria-hidden`), con el copy de Azure DevOps reescrito como oferta de valor.
  - Hecho cuando: ambas secciones existen con su `h2` y `aria-labelledby`, contenido en español y sin placeholders; de 3 columnas a 1 columna sin solapamientos a 360px; los glifos son decorativos para el lector de pantalla; el texto final de Servicios fue **aprobado por escrito por el usuario antes** de escribir el marcado; sin desbordes horizontales. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T2, T3 (patrón de encabezado).
  - Estimación: ~30 min.
  - Resultado real (2026-10-29): `#sobre-mi` con resumen actual + 3 datos de contexto; `#servicios` como `<dl>` con reglas, 3 glifos SVG `aria-hidden` y el copy aprobado exacto; patrón `.seccion-encabezado` reutilizable. `npm run build` OK (10 módulos); 21/21 comprobaciones CDP OK; breakpoints 768/1024 sin scroll horizontal; consola limpia. Validación manual: aceptada (2026-10-30).
  - Revisión integral: sin hallazgos críticos ni altos; H-4 (bajo, tipografía de "Sobre mí") corregido y verificado.
  - Corrección 2026-10-30: `.sobre-mi__resumen` al 100% del ancho disponible; `.servicios .servicio:first-child` sin borde superior (elimina la doble línea). Build y valores computados verificados. Re-validación manual: aceptada (2026-10-30).

- [x] **T5. Sección "Proyectos": fichas, imágenes y miniaturas (marcado + estilos).** RF-4, RNF-2, RNF-3, RNF-4, RNF-7
  - Resultado esperado: `#proyectos` con 4 fichas "técnica" (título, descripción, chips de tecnologías, imágenes), proyecto 1 ("Sistema de Gestión de Ventas") a ancho completo como destacado y alternancia de lado en desktop; proyecto 4 como un único proyecto con dos sub-bloques (mapeador y filtros dinámicos); imagen principal + tira de miniaturas en `<button>` cuando hay más de una; `loading="lazy"`, `decoding="async"`, dimensiones/`aspect-ratio` reservadas y fallback del `alt` visible sobre `--papel-alto` si la imagen no carga.
  - Hecho cuando: las 4 fichas muestran los campos de RF-4 con rutas `/images/...` todas en minúscula; a 360px no hay scroll horizontal y la tira de miniaturas se contiene con scroll propio; ninguna imagen provoca salto de layout al cargar; cada `alt` corresponde a lo que muestra la captura y fue **aprobado por el usuario antes** de escribirse; el proyecto con una sola imagen no muestra tira de miniaturas. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T1 (assets), T2, T4 (patrón de encabezado y chips).
  - Estimación: ~30 min.
  - Resultado real (2026-10-30): `#proyectos` con 4 fichas, proyecto 1 destacado a ancho completo, proyecto 4 con dos sub-bloques, imagen principal + miniaturas `<button>` (sin tira en `rabbit1.png`), 8 `alt` aprobados exactos, `loading`/`decoding`/dimensiones y fallback del `alt`. Se corrigió el recorte del foco en las miniaturas (`components.css`). 360px sin overflow; CLS 0,00065; build OK; consola limpia; 13/13 recursos locales. Validación manual: aceptada (2026-10-30).
  - Corrección H-2 (2026-10-30): `alt`/`data-alt` de `venta.png`, `venta2.png` y `migracion2.png` actualizados a la descripción real aprobada; build OK y sin textos antiguos.
  - Revisión integral: sin hallazgos críticos ni altos; H-2 (medio, `alt`) corregido y verificado.

- [x] **T6. Selector de imágenes de proyectos (`projects.js`).** RF-4, RNF-4
  - Resultado esperado: módulo que, al activar una miniatura, actualiza la imagen principal, su `alt` y el estado de la miniatura activa (`aria-pressed` o `aria-current`), sin carrusel ni auto-rotación.
  - Hecho cuando: cada miniatura cambia la imagen principal y el `alt` correspondiente; la miniatura activa queda marcada de forma perceptible y anunciada al lector de pantalla; funciona con Tab + Enter/Espacio; sin JS el HTML sigue mostrando la imagen principal (mejora progresiva); sin errores en consola. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T5.
  - Estimación: ~20 min.
  - Resultado real (2026-10-30): creado `src/js/projects.js` e importado en `main.js`; cada miniatura actualiza `src`/`alt` y `aria-pressed`; sin carrusel ni auto-rotación; mejora progresiva sin JS. 16/16 comprobaciones CDP OK (ratón, Tab, Enter, Espacio, lector de pantalla, consola limpia); build OK (11 módulos). Validación manual: aceptada (2026-10-30).
  - Revisión integral: sin hallazgos críticos ni altos.

- [x] **T7. Formulario de contacto: marcado, estilos y validación en cliente.** RF-6, RNF-2, RNF-4, RNF-6
  - Resultado esperado: `#contacto` con formulario en superficie `--papel-alto`, labels visibles y asociados, `required`, `type="email"` + `inputmode="email"`, `autocomplete` (`name`, `email`), `novalidate`, región de mensajes y `aria-describedby`/`aria-invalid` por campo; validación propia en español que impide el envío con campos vacíos o correo inválido y mueve el foco al primer campo inválido.
  - Hecho cuando: enviar vacío o con correo inválido **no genera request** (Network vacío) y muestra mensajes por campo en español; el foco pasa al primer campo inválido; los errores se anuncian en el árbol de accesibilidad; a 360px el formulario no desborda; no queda ningún `alert()`. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T2.
  - Estimación: ~30 min.
  - Resultado real (2026-10-30): `#contacto` reescrito con labels, `novalidate`, `required`, `type=email`, `inputmode`, `autocomplete`, errores por campo con `aria-invalid`/`aria-describedby` y región `aria-live`; creado `src/js/contact.js` con validación en español y foco al primer inválido; eliminado el `<script>` inline con `alert()`. 42/42 comprobaciones CDP OK (sin request inválido, errores, foco, aria, 360px, sin `alert`, consola limpia); build OK (12 módulos). Validación manual: aceptada (2026-10-30).
  - Revisión integral: sin hallazgos críticos ni altos.
  - Corrección 2026-10-30: `.contacto__formulario` con `margin-inline: auto` (centrado); build y márgenes computados verificados. Re-validación manual: aceptada (2026-10-30).

- [ ] **T8. Envío al endpoint actual y estados del formulario (`contact.js`).** RF-7, RF-8, RNF-4
  - Resultado esperado: POST JSON al endpoint actual conservando URL, `code` y token exactamente como hoy, con payload `Name`/`Email`/`Message`/`Token`; estados explícitos en región `aria-live="polite"` (reposo, enviando con botón deshabilitado y `aria-busy`, éxito con formulario limpio, error HTTP y error de red con datos conservados); `AbortController` con timeout de 15 s; doble envío impedido.
  - Hecho cuando: la pestaña Network muestra la request real al endpoint con los 4 campos y `Content-Type: application/json`; una respuesta OK muestra confirmación y limpia el formulario; con DevTools en "Offline" aparece el mensaje de error de red, los datos se conservan y el botón se rehabilita; una respuesta no-2xx muestra el mensaje de error HTTP; dos clics rápidos producen un solo request. **Requiere aceptación explícita del usuario** (incluye verificar el riesgo CORS).
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T7.
  - Estimación: ~30 min.
  - Resultado real (2026-10-30): `src/js/contact.js` envía POST al endpoint actual con `Name`/`Email`/`Message`/`Token` y `Content-Type: application/json`; estados reposo/enviando/éxito/error HTTP/error de red, `aria-live`, `aria-busy`, `AbortController` 15 s y guardia de doble envío; sin `alert()`. 39/39 comprobaciones CDP OK (offline, error 500 interceptado, timeout, doble clic). **Limitación real:** CORS solo autoriza `https://gabrielaballay.github.io`; desde `localhost:4173/5173` el preflight devuelve 400 y el envío real queda bloqueado (éxito verificado con 200 interceptado). Pendiente: aceptación manual y validación del camino feliz desde el origen permitido. Decisión del usuario (2026-10-30): opción b — validar tras desplegar en `https://gabrielaballay.github.io`.
  - Validación de la URL pública (2026-10-30): la Function App respondió **503 “Function host is not running”**; el backend debe arrancarse antes de validar el envío real.
  - Revisión integral: **H-1 (alto) abierto** — CORS del endpoint; no aceptable hasta validar el camino feliz desde el origen autorizado.

- [x] **T9. Footer, responsive transversal y accesibilidad.** RF-9, RNF-2, RNF-4, RNF-6
  - Resultado esperado: footer con copyright (año actual), correo `aballaygabriel@gmail.com` (como `mailto:`) y LinkedIn `https://linkedin.com/in/gabriel-aballay-a2746a164`; ajustes finales de responsive en 480/768/1024 y de accesibilidad en todo el documento (landmarks `header`/`nav`/`main`/`footer`, jerarquía de encabezados, `scroll-margin-top`, foco, `prefers-reduced-motion`, `overflow-wrap`).
  - Hecho cuando: el footer muestra el año actual y ambos datos de contacto con el `href` exacto aprobado; a 360, 768, 1280 y 1920 px no hay scroll horizontal ni solapamientos; el sitio completo se recorre con teclado sin perder el foco de vista; no hay saltos en la jerarquía de encabezados y cada `section` tiene `aria-labelledby`; con movimiento reducido activo no hay animaciones; contraste medido ≥ 4,5:1 en texto normal; todo el texto visible está en español. **Requiere aceptación explícita del usuario.**
  - Tipo: funcional (requiere validación manual del usuario).
  - Depende de: T3, T4, T5, T6, T7, T8.
  - Estimación: ~30 min.
  - Resultado real (2026-10-30): footer con año actual (`footer.js`), `mailto:aballaygabriel@gmail.com` y LinkedIn exacto; landmarks, un `h1`, `aria-labelledby` en 5/5 secciones, `scroll-margin-top` 68/60px, foco visible, `prefers-reduced-motion`, contraste mínimo 6,10:1. 41/41 comprobaciones CDP OK en 360/480/768/1024/1280/1920; build OK (12 módulos). Validación manual: aceptada (2026-10-30).
  - Revisión integral: sin hallazgos críticos ni altos; H-2 (medio), H-3 y H-4 (bajos) corregidos y verificados.

- [x] **T10. Validación integral y registro de evidencia.** RNF-1, RNF-2, RNF-3, RNF-4, RNF-5, RNF-7
  - Resultado esperado: ejecución completa del checklist de plan §8 (ítems 1–11) sobre `npm run preview`, más Lighthouse móvil simulado y verificación de assets y de eliminación de Bootstrap/carrusel/`alert()`.
  - Hecho cuando: `npm run build` termina sin errores ni warnings de assets faltantes; `npm run preview` sirve el sitio y todas las rutas de imagen resuelven; los 11 ítems del checklist quedan registrados con estado real (aprobado / fallido / no ejecutado / bloqueado) y evidencia; Lighthouse móvil reporta LCP < 2,5 s, CLS < 0,1 y sin errores en consola, o la desviación queda documentada con causa; `grep` de `cdn.jsdelivr.net`, `bootstrap` y `alert(` no devuelve resultados en `index.html`, `src/` ni `dist/`; `dist/images/principal.jpg` existe y no hay referencias a `Principal.jpg`.
  - Tipo: técnica.
  - Depende de: T1–T9.
  - Estimación: ~30 min.
  - Resultado real (2026-10-30): checklist §8 ejecutado sobre `npm run preview` (puerto 4317). 10/11 ítems aprobados; ítem 3 (camino feliz del formulario) **bloqueado por CORS externo** (preflight 400; solo `https://gabrielaballay.github.io` autorizado). Lighthouse móvil: LCP 1,696 s, CLS 0,00534, 0 errores de consola; Performance 99, Accessibility 100, Best Practices 100, SEO 83. Build OK (12 módulos); 8 imágenes en `dist/images/` con `principal.jpg`; 0 referencias a `Principal.jpg`, `cdn.jsdelivr.net`, `bootstrap`, `data-bs`, `alert(` o `carousel` en `index.html`/`src/`/`dist/`.
  - Revisión independiente integral: se ejecuta a continuación sobre T1–T10.
  - Corrección de despliegue 2026-10-30: `base` `/GabrielFormContact/`, workflow `.github/workflows/deploy.yml` desde `main`, `public/.nojekyll` y `data-src` relativos; validación de la URL pública pendiente.

## Cobertura

| Requisito | Tareas |
|---|---|
| RF-1 Hero | T3 |
| RF-2 Sobre mí | T4 |
| RF-3 Servicios | T4 |
| RF-4 Proyectos (campos e imágenes) | T5, T6 |
| RF-5 Navegación | T3 |
| RF-6 Formulario y validación | T7 |
| RF-7 Envío al endpoint y confirmación | T8 |
| RF-8 Mensaje de error | T8 |
| RF-9 Footer | T9 |
| RNF-1 Diseño moderno | T2, T3, T4, T5, T9 |
| RNF-2 Responsive | T2, T3, T4, T5, T7, T9 |
| RNF-3 Rendimiento | T1, T2, T5, T10 |
| RNF-4 Accesibilidad | T2, T3, T4, T5, T6, T7, T9 |
| RNF-5 Vite | T1, T10 |
| RNF-6 Español | T3, T4, T5, T7, T9 |
| RNF-7 Rutas de imágenes | T1, T5, T10 |

RF-1..RF-9 y RNF-1..RNF-7 quedan cubiertos por al menos una tarea. **Requisitos sin cobertura: ninguno.** No hay tareas sin requisito aprobado: cada una se remite a RF/RNF de la spec y a una sección del plan (§2, §3, §4, §5, §6, §7 u §8).

## Notas de ejecución, riesgos y pendientes

- **Límite de 10 tareas:** el alcance cabe exactamente en 10. Estimación total ≈ 285 min de implementación + validaciones. Si el usuario prefiere granularidad menor, la división natural es (a) T5+T6 como una sola tarea de ~45 min, liberando un cupo para separar footer (T9a) de responsive/accesibilidad (T9b). No se propone superar el límite.
- **Dependencias externas al código:** confirmar Node.js ≥ 20.19 (bloquea T1); aprobar copy de Servicios antes de T4; aprobar los `alt` antes de T5 (requiere saber qué muestra cada captura, dato [no verificado] en el plan).
- **Riesgo CORS del endpoint:** se detecta en T8. Si el endpoint rechaza `localhost:5173` o el dominio final, T8 queda bloqueada y la solución implica cambiar el backend de Azure, **fuera del alcance** de esta spec → gestión de cambios.
- **Tareas funcionales:** T3, T4, T5, T6, T7, T8 y T9 solo se cierran con aceptación explícita del usuario sobre el sitio servido en local. T1, T2 y T10 se cierran con sus verificaciones técnicas.
- **T10 es consolidación de validación:** si el coordinador prefiere tratarla como fase 7 separada, T1–T9 cubren igualmente todos los RF; los RNF quedarían verificados en esa fase de validación.
- **No verificado en este análisis:** versión de Node/npm, dimensiones y peso de las imágenes, comportamiento CORS del endpoint, contenido exacto de cada captura para los `alt`.
