# AGENTS.md

Portafolio profesional de Gabriel Aballay. Proyecto **Vite vanilla** (HTML/CSS/JS, sin framework de UI). Documentación SDD en `docs/`, `specs/001-portfolio/`.

## Comandos

```
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173/GabrielFormContact/)
npm run build    # build de producción en dist/
npm run preview  # sirve el build
```

No hay framework de tests. Validar con `build`/`preview`, checklist manual y Lighthouse (ver `specs/001-portfolio/plan.md` §8).

## Estructura

- `index.html` — marcado semántico de las secciones (raíz de Vite).
- `src/main.js` — entry; importa estilos y módulos.
- `src/styles/` — `fuentes.css`, `tokens.css`, `base.css`, `components.css`.
- `src/js/` — `nav.js`, `projects.js`, `contact.js`, `footer.js`.
- `public/images/` — 8 imágenes; `dist/` — build.
- `docs/constitution.md`, `PROJECT_BRIEF.md`, `MEMORY.md`, `specs/001-portfolio/{spec,plan,tasks}.md`.

## Puntos que un agente debe tener en cuenta

1. **Formulario de contacto:** POST a una Azure Function con `code` y token hardcodeados en `src/js/contact.js`; no cambiar un lado sin el otro. **CORS solo permite `https://gabrielaballay.github.io`**: desde `localhost` el envío real falla (preflight 400). El camino feliz debe validarse desde el origen permitido o modificando el backend (fuera de alcance).
2. **Imágenes:** rutas `/images/...` en minúscula; el archivo es `principal.jpg` (no `Principal.jpg`).
3. **Diseño:** usar los tokens de `src/styles/tokens.css`; fuentes autoalojadas con `@fontsource` (Archivo + Newsreader), sin CDN ni Bootstrap.
4. **Idioma:** documentos y UI en **español**.
5. **SDD:** no avanzar de fase sin aprobación explícita; la spec aprobada gobierna el código. Estado y decisiones en `MEMORY.md`.
6. **Despliegue:** GitHub Pages de proyecto en `https://gabrielaballay.github.io/GabrielFormContact/`; `base: '/GabrielFormContact/'` en `vite.config.js`. El workflow `.github/workflows/deploy.yml` publica `dist/`; Pages debe estar en modo **GitHub Actions**.
