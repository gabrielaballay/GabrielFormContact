# Plan 001 — Portafolio profesional con Vite y rediseño moderno
Estado: aprobada
Spec de referencia: `specs/001-portfolio/spec.md` (aprobada)
Constitución: `docs/constitution.md` (aprobada)

Leyenda de estado de cada decisión:
- [CONFIRMADO] Decisión ya aprobada por el usuario.
- [PROPUESTA] Decisión técnica propuesta en este plan; requiere aprobación.
- [SUPUESTO] Hipótesis de trabajo; si es falsa, cambia el plan.
- [PENDIENTE] Requiere decisión del usuario antes de tareas.

## 1. Contexto y alcance del plan

[CONFIRMADO] El sitio actual es un único `index.html` con Bootstrap 5 por CDN, CSS inline y un `<script>` embebido para el formulario. Se migra a Vite y se rediseña con dirección visual propia (`frontend-design`), conservando el endpoint actual de Azure Function.

**Alcance técnico de este plan**

| Incluye | No incluye |
|---|---|
| Andamiaje Vite (dev server + build) | Backend, base de datos, auth |
| Rediseño visual completo de las 6 secciones | Blog, e-commerce, CMS, app móvil |
| Sistema de tokens, tipografía y componentes | Framework de UI pesado no justificado |
| Reimplementación del formulario (mismo endpoint) | Cambios en la Azure Function |
| Corrección de rutas/case de imágenes | Renombrar o reoptimizar imágenes sin aprobación |
| Navegación, responsive, accesibilidad básica | Tests automatizados con framework nuevo (ver §8) |

**Resultado esperado:** un proyecto que se ejecuta con `npm run dev`, compila con `npm run build`, no depende de ningún CDN y cumple RF-1..RF-9 y RNF-1..RNF-7.

## 2. Arquitectura y estructura de archivos propuesta (Vite)

[CONFIRMADO] Plantilla **vanilla** de Vite (sin framework de UI). Justificación: el sitio es una página con contenido estático y dos comportamientos (navegación móvil e imágenes de proyecto) más un envío `fetch`. React/Vue/Astro añadirían runtime y toolchain sin resolver ningún problema del alcance (constitución §4: dependencias mínimas y justificadas).

```
/
├── index.html                 # marcado semántico de las 6 secciones (raíz de Vite)
├── package.json               # scripts: dev, build, preview
├── vite.config.js             # configuración mínima (base, build.target)
├── .gitignore                 # node_modules, dist (aunque hoy no sea repo git)
├── public/
│   └── images/                # 8 imágenes servidas tal cual, rutas estables
└── src/
    ├── main.js                # punto de entrada: importa CSS y módulos JS
    ├── styles/
    │   ├── tokens.css         # variables de color, tipo, espaciado, radios
    │   ├── base.css           # reset, tipografía base, utilidades, foco
    │   └── components.css     # header, secciones, proyectos, formulario, footer
    └── js/
        ├── nav.js             # menú móvil + estado activo de ancla
        ├── projects.js        # selector de imágenes por proyecto
        └── contact.js         # validación, envío y estados del formulario
```

**Decisiones de arquitectura**

1. [CONFIRMADO] `index.html` permanece en la **raíz**, no en `src/`. Es la convención de Vite para sitios de una sola página y evita configuración extra de `rollupOptions.input`.
2. [CONFIRMADO] Estilos en **3 archivos CSS** importados desde `main.js`. Se descarta un único archivo (difícil de mantener al crecer) y se descarta un archivo por sección (fragmentación excesiva que la constitución §9 desaconseja).
3. [CONFIRMADO] JavaScript en **módulos ES** separados por comportamiento, sin librerías. Estimación: < 6 KB de JS propio.
4. [CONFIRMADO] `vite.config.js` mínimo. Solo se fija `build.target: 'es2020'` y `base: '/GabrielFormContact/'` (deploy en `https://gabrielaballay.github.io/GabrielFormContact/`, [CONFIRMADO]).
5. [CONFIRMADO] Sin Bootstrap, sin jQuery, sin librería de iconos.
6. [CONFIRMADO] Sin frameworks de testing en `devDependencies`. Detalle y justificación en §8.

**Comandos del stack (Node.js/Vite, ninguno existe hoy):**

```
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción en dist/
npm run preview    # sirve el build para validación
```

[PENDIENTE] Confirmar que existe Node.js ≥ 20.19 (requisito de las versiones actuales de Vite). **No verificado** en este entorno.

## 3. Diseño y sistema visual (según `frontend-design`)

### 3.1 Dirección: "Capas"

El sujeto no es "un portfolio genérico", es el trabajo de un desarrollador .NET que construye **capas, pipelines y contratos**: API → aplicación → dominio → infraestructura. La página toma esa gramática como material de diseño: separación clara de planos, jerarquía tipográfica fuerte, un único acento "señal" para la interacción y **un solo gesto memorable** — un diagrama de pipeline en el hero.

Se descarta deliberadamente lo que la skill identifica como salida por defecto:
- fondo crema cálido + acento terracota;
- fondo casi negro + verde ácido/vermellón;
- estética de periódico con reglas de 1px y cero radios;
- "kit SaaS": todas las secciones como tarjetas idénticas redondeadas con la misma sombra suave.

### 3.2 Paleta (tokens)

[CONFIRMADO] Base fría-verdosa tipo "hormigón", no crema; tinta con matiz azul (no negro puro); un único acento cobalto.

| Token | Hex | Uso |
|---|---|---|
| `--papel` | `#EDEEE9` | Fondo de página |
| `--papel-alto` | `#F8F8F5` | Superficies elevadas (formulario, imágenes) |
| `--tinta` | `#152029` | Texto principal, títulos |
| `--tinta-suave` | `#4C5A63` | Texto secundario, metadatos |
| `--cobalto` | `#2049C8` | Enlaces, CTA, anillo de foco |
| `--cobalto-hondo` | `#16307F` | Hover/active del CTA |
| `--linea` | `#C6CBC3` | Bordes y separadores |
| `--exito` | `#2F6B46` | Confirmación de envío |
| `--error` | `#A32B2B` | Errores de validación y de red |

Contraste estimado (a verificar con medidor en implementación, no se declara aprobado):
`--tinta`/`--papel` ≈ 13:1 · `--tinta-suave`/`--papel` ≈ 5,9:1 · blanco/`--cobalto` ≈ 7,4:1 · `--cobalto`/`--papel` ≈ 6,2:1. Todos por encima de AA para texto normal.

### 3.3 Tipografía

[CONFIRMADO] Dos familias, claramente distintas, **autoalojadas** vía `@fontsource` (npm) para no depender de Google Fonts ni de un CDN: cumple constitución §5 y el caso límite "ausencia de conexión a recursos externos".

- **Títulos y UI: Archivo** (variable, 500–800). Grotesca de ingeniería, con peso suficiente para titulares grandes; tracking `-0.02em` en tamaños display.
- **Texto corrido: Newsreader** (variable, 400/500). Serif editorial que aporta calidez y se lee bien en párrafos; `line-height 1.6`, longitud de línea máx. `68ch`.

Escala (fluida con `clamp`, ratio ~1.25):

| Rol | Tamaño | Peso |
|---|---|---|
| Display (nombre) | `clamp(2.75rem, 7vw, 4.5rem)` | 700 |
| H2 de sección | `clamp(1.9rem, 3.4vw, 2.6rem)` | 650 |
| H3 (proyecto/servicio) | `1.25rem` | 600 |
| Cuerpo | `1.0625rem` | 400 |
| Metadatos/etiquetas | `0.875rem` | 500 |

Reglas: sin versalitas decorativas, sin etiquetas "eyebrow" en mayúsculas sobre cada título, sin monoespaciada como adorno. Las tecnologías usan Archivo con `font-variant-numeric: tabular-nums`, no fuente mono.

### 3.4 Layout

- Contenedor `max-width: 1120px`, rejilla CSS de 12 columnas, gutter `24px`, padding lateral `clamp(20px, 5vw, 48px)`.
- Espaciado vertical por sección: `padding-block: clamp(72px, 9vw, 120px)`.
- Alineación **a la izquierda** por defecto (el centrado permanente se descarta: es el aspecto genérico actual). Excepción: footer.
- Encabezado de sección en dos columnas: título a la izquierda, una línea de contexto a la derecha (`--tinta-suave`), separados por una regla horizontal fina que **codifica jerarquía**, no decora.
- Radios: `4px` en controles, `10px` solo en imágenes y en el contenedor del formulario. No hay una única sombra aplicada a todo.

### 3.5 Componentes visuales

| Componente | Tratamiento |
|---|---|
| Header | Barra sticky translúcida (`backdrop-filter` con fallback sólido), nombre + 4 anclas + botón "Hablemos" |
| Hero | Split 7/5: columna tipográfica + diagrama de pipeline SVG |
| Lista de servicios | Lista de definiciones con reglas horizontales, glifo SVG inline por servicio y texto a la derecha (no 3 tarjetas idénticas) |
| Proyecto | "Ficha técnica": imagen a un lado, contenido al otro, alternando lado en desktop; el proyecto 1 ocupa el ancho completo como destacado |
| Etiquetas de tecnología | Chips rectangulares con borde `--linea` y fondo `--papel-alto` |
| Formulario | Superficie `--papel-alto`, campos con borde inferior marcado, foco cobalto de 2px |
| Estado del envío | Región `aria-live="polite"` bajo el botón; sustituye los `alert()` actuales |

### 3.6 El gesto memorable: hero con pipeline

[CONFIRMADO] En desktop, a la derecha del titular, un diagrama SVG de 4 capas apiladas (`Api` → `Application` → `Domain` → `Infrastructure`) con las conexiones dibujadas. En la carga se ejecuta **una única secuencia** de trazo de las conexiones (~600 ms); después, al pasar el cursor sobre una capa se resalta su rol y las tecnologías asociadas. En móvil el diagrama se simplifica a una lista de 4 líneas con el mismo contenido (no se oculta la información).

Contenido del hero: nombre, rol ("Desarrollador .NET · Azure · Arquitectura limpia"), una línea de propuesta de valor, CTA primario "Hablemos de tu proyecto" y CTA secundario "Ver proyectos".

**Motion:** solo dos momentos — la secuencia de carga del hero y transiciones de 120–180 ms en estados interactivos. Sin fade-up por sección. Todo desactivado bajo `prefers-reduced-motion: reduce`.

## 4. Implementación por sección y navegación

| Sección | `id` | Contenido | Notas de implementación |
|---|---|---|---|
| Header/nav | — | Nombre, anclas, CTA | RF-5. Menú móvil con `<button aria-expanded aria-controls>`; cierre con `Esc` y al elegir ancla; `scroll-margin-top` igual a la altura del header |
| Hero | `#inicio` | RF-1 | `<h1>` único de la página; diagrama SVG con `role="img"` y `<title>` |
| Sobre mí | `#sobre-mi` | RF-2 | Párrafo + 3 datos de contexto (enfoque, dominio, forma de trabajo). Texto basado en el actual, sin inventar experiencia |
| Servicios | `#servicios` | RF-3 | Los 3 servicios actuales, con copy corregido (el de Azure DevOps hoy es una enumeración de tareas; se reescribe como oferta de valor). Texto final se muestra al usuario antes de implementar |
| Proyectos | `#proyectos` | RF-4 | 4 proyectos. Destacado: "Sistema de Gestión de Ventas". Luego 3 fichas. Título/descripción/tecnologías/imágenes |
| Contacto | `#contacto` | RF-6, RF-7, RF-8 | Ver §5 |
| Footer | — | RF-9 | Copyright con año + correo `aballaygabriel@gmail.com` + LinkedIn `https://linkedin.com/in/gabriel-aballay-a2746a164` |

**Navegación:** orden actual conservado (hero → sobre mí → servicios → proyectos → contacto). [CONFIRMADO] Es el orden correcto para el recorrido de un reclutador; no hay renumeración ni marcadores tipo "01/02/03" porque las secciones no son una secuencia.

**Proyectos — selector de imágenes en lugar de carrusel.** [CONFIRMADO] Se elimina el carrusel de Bootstrap (auto-rotación, controles poco accesibles) y se reemplaza por una imagen principal + una tira de miniaturas cuando hay más de una. Razones: comportamiento predecible, navegable por teclado, sin JS de animación y mejor para `prefers-reduced-motion`. Mapeo verificado:

| Proyecto | Imágenes | Cantidad |
|---|---|---|
| Sistema de Gestión de Ventas | `principal.jpg`, `venta.png`, `venta2.png` | 3 |
| Migrador Oracle → PostgreSQL | `migracion1.png`, `migracion2.png` | 2 |
| Integración con RabbitMQ | `rabbit1.png` | 1 (sin miniaturas) |
| Paquetes NuGet (mapeador + filtros) | `mapping.png`, `filter.png` | 2 |

[CONFIRMADO] El proyecto 4 se mantiene como **un solo proyecto con dos sub-bloques** (mapeador de objetos y constructor de filtros dinámicos), cada uno con su descripción e imagen.

## 5. Integración del formulario con el endpoint actual

[CONFIRMADO] Se conserva el endpoint, la URL, el parámetro `code` y el token exactamente como están hoy. La migración **no cambia** el contrato con la Azure Function.

```js
// src/js/contact.js — contrato preservado
const ENDPOINT = "https://formcontact-dwc8g7cgh8a8gded.brazilsouth-01.azurewebsites.net/api/SendContactEmail?code=qx_xHYiK9TF1JHYNlH4nnDxK9idXbXvG-SQ87HzJL4i2AzFuhZR_JA==";

const payload = {
  Name: nombre,
  Email: correo,
  Message: mensaje,
  Token: "MI_TOKEN_SECRETO_123"
};
// POST, Content-Type: application/json
```

**Comportamiento propuesto**

1. **Validación en cliente antes del envío.** `required` en los tres campos, `type="email"` con `inputmode="email"` y `autocomplete` (`name`, `email`). Mensajes de error propios en español, asociados con `aria-describedby` y `aria-invalid` (no se depende solo de los globos nativos del navegador). `novalidate` en el `<form>` para controlar los mensajes.
2. **Estados explícitos** en una región `aria-live="polite"`:

| Estado | UI |
|---|---|
| Reposo | Botón "Enviar mensaje" habilitado |
| Validación fallida | Errores por campo + foco en el primer campo inválido. Sin request |
| Enviando | Botón deshabilitado, texto "Enviando…", `aria-busy="true"` |
| Éxito (`response.ok`) | Mensaje de confirmación en `--exito`, formulario limpiado |
| Error HTTP (`!response.ok`) | "No pudimos enviar el mensaje. Probá de nuevo en unos minutos." en `--error`; datos conservados |
| Error de red (`catch`) | "No hay conexión con el servicio. Revisá tu conexión e intentá otra vez." en `--error`; datos conservados |

3. Se eliminan los `alert()`. Cumple RF-7 ("mostrar una confirmación") y RF-8 ("mensaje de error comprensible") con mejor accesibilidad y sin bloquear el hilo de UI.
4. `AbortController` con timeout de 15 s para que un cuelgue del endpoint no deje el botón bloqueado indefinidamente.
5. Doble envío impedido: guardia de estado + botón deshabilitado.

**Seguridad (sin cambios de alcance).** El `code` y el token siguen en el cliente, igual que hoy; Vite los incluirá en el bundle. No se propone moverlos a variables de entorno porque eso no los oculta y exigiría cambiar el backend (fuera de alcance). Se deja constancia del estado actual, no se empeora.

## 6. Manejo de imágenes y corrección del case

[CONFIRMADO] Las 8 imágenes se mueven a `public/images/` **sin transformarlas**. Vite copia `public/` tal cual a `dist/`, por lo que las rutas siguen siendo `/images/<archivo>` y no requieren `import` ni hashing. Es la opción más simple y evita reescribir referencias del HTML.

**Corrección de la inconsistencia de case (RNF-7):** renombrar `images/Principal.jpg` → `images/principal.jpg` (minúscula). Se elige minúscula porque las otras 7 ya lo están y así la convención queda homogénea. La referencia en el HTML ya es `images/principal.jpg`, así que el resultado es coherente en Windows, Linux y en CI. No hay ninguna otra referencia al archivo en el proyecto.

**Carga y estabilidad del layout**

- `loading="lazy"` y `decoding="async"` en todas las imágenes; la primera imagen visible del hero, si la hubiera, no se difiere.
- `width`/`height` o `aspect-ratio` declarados por CSS en el contenedor para evitar CLS. Las dimensiones reales de cada archivo **[no verificadas]** y deben medirse en implementación.
- `alt` descriptivos por imagen (los actuales son genéricos y repetidos). El texto final de cada `alt` se muestra al usuario antes de implementar; se requiere saber qué muestra cada captura.
- Fallback del caso límite "imagen que no carga": el contenedor mantiene el `aspect-ratio` y el `alt` se muestra sobre `--papel-alto`, sin romper el layout.
- Se descarta (por ahora) convertir a WebP/AVIF: mejora potencial de peso, pero exige tooling adicional y no hay medición previa. Queda como mejora opcional.

## 7. Requisitos no funcionales: responsive, accesibilidad, rendimiento

### Responsive (RNF-2)

Breakpoints: `480px`, `768px`, `1024px` (mobile-first con `min-width`).
- Hero: split 7/5 → apilado con diagrama simplificado.
- Servicios: 3 columnas → 1 columna con reglas.
- Proyectos: alternancia izquierda/derecha → una columna; miniaturas en scroll horizontal contenido.
- Header: menú hamburguesa por debajo de `768px`.
- Sin `overflow-x`: `min-width: 0` en hijos de grid y `overflow-wrap: anywhere` en textos largos (URLs, nombres de tecnología).

### Accesibilidad (RNF-4)

- Enlace "Saltar al contenido" como primer elemento enfocable.
- Landmarks: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`.
- Jerarquía de encabezados: un solo `h1`; `h2` por sección; `h3` en ítems.
- Foco visible propio (`outline: 2px solid var(--cobalto); outline-offset: 3px`), nunca `outline: none` sin reemplazo.
- Contraste verificado con medidor en implementación (valores de §3.2 son estimaciones).
- Formulario: `<label>` visible y asociado, `aria-describedby` para ayudas y errores, `aria-invalid`, `aria-live`.
- Selector de imágenes: `<button>` reales, `aria-pressed`/`aria-current`, `alt` significativos.
- Menú móvil operable por teclado, `aria-expanded`, cierre con `Esc`.
- `prefers-reduced-motion` respetado.

### Rendimiento (RNF-3)

- **Cero recursos de CDN.** Todo empaquetado o autoalojado. Resuelve de raíz el caso límite "ausencia de conexión a recursos externos".
- Fuentes: solo subconjunto latino, `font-display: swap`, como máximo 2 familias y los pesos realmente usados.
- JS propio < 6 KB; sin librerías de UI ni de iconos (SVG inline).
- CSS en un bundle único (Vite lo genera) — sin `@import` en cascada.
- Imágenes con `lazy` + dimensiones reservadas.
- Metas verificables con Lighthouse en `npm run preview` (móvil simulado): LCP < 2,5 s, CLS < 0,1, sin errores en consola. Son **objetivos a medir**, no resultados afirmados.

## 8. Estrategia de pruebas y validación

No existe framework de tests y este plan **no propone instalar uno**. Justificación: el sitio es una página estática sin lógica de negocio; el valor de un runner (Vitest + jsdom) sería bajo frente al costo de tooling nuevo en un proyecto sin CI. La validación se apoya en el build real y la inspección en navegador, como indica la constitución §8.

**Validaciones automáticas disponibles (una vez exista el proyecto):**

| Comando | Qué valida | Criterio |
|---|---|---|
| `npm run build` | Compilación y resolución de assets | Termina sin errores ni warnings de assets faltantes. RNF-5 |
| `npm run preview` | Build servido correctamente | Rutas de imagen resuelven; el formulario apunta al endpoint correcto |

**Validación manual (checklist ejecutable, con evidencia registrada):**

1. **Secciones (RF-1..RF-4, RF-9):** las 6 secciones presentes, contenido correcto en español, ningún placeholder.
2. **Navegación (RF-5):** clic en cada ancla desde desktop y móvil; el destino queda bajo el header sticky; menú móvil abre/cierra por teclado.
3. **Formulario — camino feliz (RF-7):** completar los 3 campos y enviar; confirmación visible; verificar en la pestaña Network que la request sale al endpoint con `Name`, `Email`, `Message`, `Token`.
4. **Formulario — validación (RF-6):** enviar vacío y con correo inválido; sin request en Network; errores visibles y foco en el primer campo inválido.
5. **Formulario — error (RF-8):** con DevTools en "Offline", enviar; mensaje de error de red legible, datos conservados, botón rehabilitado. Repetir forzando una respuesta 500 si es posible.
6. **Responsive (RNF-2):** 360 px, 768 px, 1280 px, 1920 px; sin scroll horizontal; sin solapamientos.
7. **Accesibilidad (RNF-4):** recorrido completo solo con teclado; foco siempre visible; formulario usable con lector de pantalla básico (o árbol de accesibilidad de DevTools); contraste medido.
8. **Movimiento reducido:** activar `prefers-reduced-motion` en el SO/DevTools y confirmar que no hay animación de carga.
9. **Sin red externa:** bloquear dominios externos en DevTools → el sitio mantiene estructura, tipografía y legibilidad.
10. **Imágenes (RNF-7):** confirmar en `dist/images/` que el archivo es `principal.jpg` y que no queda ninguna referencia a `Principal.jpg`.
11. **Lighthouse** en `npm run preview`: objetivos de §7.

**Distinción de estados:** cada ítem se registra como ejecutado/aprobado, ejecutado/fallido, no ejecutado, bloqueado o no aplicable, con la evidencia real (captura o nota). No se marca nada como aprobado sin haberlo ejecutado.

## 9. Trazabilidad: requisitos → plan

| Requisito | Dónde se resuelve |
|---|---|
| RF-1 Hero | §3.6 (contenido y diagrama), §4 Hero, §7 responsive |
| RF-2 Sobre mí | §4 Sobre mí |
| RF-3 Servicios | §3.5 (lista de servicios), §4 Servicios |
| RF-4 Proyectos | §3.5 (ficha), §4 Proyectos + selector de imágenes, §6 imágenes |
| RF-5 Navegación | §4 Header/nav (`nav.js`, anclas, menú móvil) |
| RF-6 Validación del formulario | §5 (validación y estados) |
| RF-7 Envío al endpoint actual | §5 (contrato preservado), validación manual 3 |
| RF-8 Mensaje de error | §5 (tabla de estados, `--error`), validación manual 5 |
| RF-9 Footer | §4 Footer (correo y LinkedIn) |
| RNF-1 Diseño moderno | §3 completo (dirección, paleta, tipografía, layout, motion) |
| RNF-2 Responsive | §7 Responsive, validación manual 6 |
| RNF-3 Rendimiento | §7 Rendimiento, §2 (sin CDN, JS mínimo), validación manual 11 |
| RNF-4 Accesibilidad | §7 Accesibilidad, validación manual 7–8 |
| RNF-5 Vite | §2 (estructura, `vite.config.js`, scripts), validación `npm run build` |
| RNF-6 Español | Contenido de §4 y §3.3; todo el copy en español |
| RNF-7 Rutas de imagen | §6 (renombrado `Principal.jpg` → `principal.jpg`), validación manual 10 |

Sin requisitos huérfanos y sin componentes del plan que no respondan a un RF/RNF.

## 10. Riesgos, supuestos y decisiones cerradas

### Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| CORS del endpoint no permite el nuevo origen (`localhost:5173` en dev o `gabrielaballay.github.io`) | El formulario falla aunque el código sea correcto; afecta RF-7/RF-8 | Verificar temprano con una request real desde `npm run dev`; si falla, requiere coordinación con el backend de Azure (**fuera del alcance de este plan**) |
| Node.js/npm ausente o con versión < 20.19 | No se puede instalar ni construir | Verificar antes de la primera tarea; **no confirmado** |
| Renombrar `Principal.jpg` rompe alguna referencia oculta | Imagen rota | Solo hay una referencia, en `index.html`; se verifica con `grep` antes y después, y en `dist/` |
| El build copia `public/` sin hashing y el CDN/cache sirve versiones viejas | Imágenes desactualizadas en producción | Convención de nombres y cache-busting solo si el hosting lo exige; se documenta al desplegar |
| Si `@fontsource` no instalara las fuentes correctamente, la identidad tipográfica se degrada a fuentes de sistema | Pierde RNF-1 | Verificar en `npm run build` y en `preview` |
| Copys reescritos cambian el sentido de la experiencia real | Contenido inexacto (constitución §6 "contenido veraz") | Toda reescritura de copy se propone para aprobación; no se inventan logros |
| `alt` genéricos existentes no describen las capturas | RNF-4 incompleto | Requiere que el usuario confirme qué muestra cada imagen |

### Supuestos

- [SUPUESTO] Se conservan los 4 proyectos y sus imágenes; solo se ajustan textos.
- [CONFIRMADO] El sitio se despliega en `https://gabrielaballay.github.io/GabrielFormContact/` (GitHub Pages de proyecto), por lo que `base: '/GabrielFormContact/'`; el workflow `.github/workflows/deploy.yml` publica `dist/` desde `main`.
- [SUPUESTO] El endpoint funciona igual desde un origen `http://localhost` y desde el dominio final.
- [SUPUESTO] No hay requisitos de analítica ni cookies.

### Información no verificada

- Versión de Node.js/npm instalada.
- Dimensiones y peso de las 8 imágenes.
- Comportamiento CORS del endpoint de Azure Function.
- Qué muestra exactamente cada captura (para los `alt`).

### Decisiones cerradas

1. **Bootstrap:** eliminarlo; CSS propio con el sistema de tokens de §3.
2. **Paleta y tipografía** concretas de §3.2 y §3.3 (Archivo + Newsreader vía `@fontsource`).
3. **Estructura de archivos** de §2 (`public/images/`, `src/styles/`, `src/js/`).
4. **Carruseles → selector de miniaturas** en la sección Proyectos.
5. **Proyecto 4:** un solo proyecto con dos sub-bloques (mapeador y filtros).
6. **Footer:** correo `aballaygabriel@gmail.com` + LinkedIn `https://linkedin.com/in/gabriel-aballay-a2746a164`.
7. **Validación:** sin framework de tests; checklist manual + `npm run build`/`preview` + Lighthouse.
8. **Copy:** reescrituras de "Servicios" y de los `alt` de imágenes (texto final con revisión previa del usuario).
9. **Despliegue:** `https://gabrielaballay.github.io/GabrielFormContact/` (Pages de proyecto) → `base: '/GabrielFormContact/'`; workflow `.github/workflows/deploy.yml` desde `main`.
