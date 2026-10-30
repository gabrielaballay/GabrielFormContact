// Selector de imágenes de los proyectos (plan §4 y §7).
// Mejora progresiva: sin JS la imagen principal ya está en el HTML.
// Sin carrusel, temporizadores ni auto-rotación: solo activación explícita.

const iniciarProyectos = () => {
  const grupos = document.querySelectorAll('.proyecto__miniaturas');

  grupos.forEach((grupo) => {
    const miniaturas = Array.from(grupo.querySelectorAll('.miniatura'));

    if (miniaturas.length === 0) {
      return;
    }

    // La imagen principal se resuelve con `aria-controls` (contrato del
    // marcado); si faltara, se usa la imagen del propio proyecto.
    const imagenPrincipal = (() => {
      const id = miniaturas[0].getAttribute('aria-controls');
      const porId = id ? document.getElementById(id) : null;

      if (porId) {
        return porId;
      }

      const proyecto = grupo.closest('.proyecto');
      return proyecto ? proyecto.querySelector('.proyecto__imagen') : null;
    })();

    if (!imagenPrincipal) {
      return;
    }

    const activar = (miniatura) => {
      const src = miniatura.dataset.src;
      const alt = miniatura.dataset.alt;

      if (src && imagenPrincipal.getAttribute('src') !== src) {
        imagenPrincipal.setAttribute('src', src);
      }

      if (typeof alt === 'string') {
        imagenPrincipal.setAttribute('alt', alt);
      }

      miniaturas.forEach((otra) => {
        otra.setAttribute('aria-pressed', String(otra === miniatura));
      });
    };

    // Un `<button>` nativo emite `click` con Enter y con Espacio, por lo que
    // un único listener cubre ratón, toque y teclado sin doble activación.
    grupo.addEventListener('click', (evento) => {
      const miniatura = evento.target.closest('.miniatura');

      if (miniatura && grupo.contains(miniatura)) {
        activar(miniatura);
      }
    });
  });
};

iniciarProyectos();
