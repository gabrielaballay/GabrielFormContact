// Menú móvil y ancla activa del header (plan §4 y §7).
// Sin dependencias: mejora progresiva sobre el HTML.

const CONSULTA_ESCRITORIO = window.matchMedia('(min-width: 768px)');

const iniciarNavegacion = () => {
  const header = document.querySelector('.site-header');
  const boton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu-principal');

  if (!header || !boton || !menu) {
    return;
  }

  // Solo los enlaces de la lista: el CTA también apunta a #contacto y no debe
  // quedar como ancla activa (aria-current es para la navegación, no para CTAs).
  const enlaces = Array.from(
    menu.querySelectorAll('.nav-principal__lista a[href^="#"]')
  ).filter((enlace) => enlace.hash && enlace.hash.length > 1);

  let menuAbierto = false;

  const pintarEstadoMenu = () => {
    boton.setAttribute('aria-expanded', String(menuAbierto));
    boton.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('abierto', menuAbierto);
  };

  const cerrarMenu = ({ enfocarBoton = false } = {}) => {
    if (!menuAbierto) {
      return;
    }

    menuAbierto = false;
    pintarEstadoMenu();

    if (enfocarBoton) {
      boton.focus();
    }
  };

  const alternarMenu = () => {
    if (CONSULTA_ESCRITORIO.matches) {
      return;
    }

    menuAbierto = !menuAbierto;
    pintarEstadoMenu();
  };

  boton.addEventListener('click', alternarMenu);

  // Cierre al elegir un ancla (la navegación nativa sigue su curso).
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      cerrarMenu();
    }
  });

  // Cierre con Esc y foco de vuelta en el botón.
  document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') {
      return;
    }

    cerrarMenu({ enfocarBoton: true });
  });

  // Al volver a escritorio el botón desaparece: se limpia el estado móvil.
  CONSULTA_ESCRITORIO.addEventListener('change', (evento) => {
    if (evento.matches) {
      cerrarMenu();
    }
  });

  // --- Marca de ancla activa ---------------------------------------------
  const destinos = new Map();

  enlaces.forEach((enlace) => {
    const destino = document.querySelector(enlace.hash);

    if (destino) {
      destinos.set(destino, enlace);
    }
  });

  const marcarActivo = (destino) => {
    destinos.forEach((enlace, seccion) => {
      if (seccion === destino) {
        enlace.setAttribute('aria-current', 'location');
      } else {
        enlace.removeAttribute('aria-current');
      }
    });
  };

  let pendiente = false;

  const actualizarAnclaActiva = () => {
    const limite = header.getBoundingClientRect().height + 8;
    const alFinal =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    let activa = null;

    if (alFinal) {
      // En el fondo del documento la última sección no puede alcanzar el
      // header; se marca igualmente como activa.
      const secciones = Array.from(destinos.keys());
      activa = secciones[secciones.length - 1] ?? null;
    } else {
      // El mapa respeta el orden del menú, que coincide con el del documento.
      destinos.forEach((_, seccion) => {
        if (seccion.getBoundingClientRect().top <= limite) {
          activa = seccion;
        }
      });
    }

    marcarActivo(activa);
  };

  const programarActualizacion = () => {
    if (pendiente) {
      return;
    }

    pendiente = true;
    window.requestAnimationFrame(() => {
      actualizarAnclaActiva();
      pendiente = false;
    });
  };

  window.addEventListener('scroll', programarActualizacion, { passive: true });
  window.addEventListener('resize', programarActualizacion);
  actualizarAnclaActiva();
};

iniciarNavegacion();
