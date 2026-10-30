// Año actual del copyright del footer (RF-9).
// El HTML trae el año de referencia como fallback sin JS.

const actualizarAnioActual = () => {
  const destino = document.querySelector('[data-anio-actual]');

  if (!destino) {
    return;
  }

  destino.textContent = String(new Date().getFullYear());
};

actualizarAnioActual();
