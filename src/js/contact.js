// Formulario de contacto: validación en cliente (T7), envío al endpoint actual
// y estados explícitos del envío (T8, plan §5). Sin diálogos nativos: todo se
// anuncia en la región `role="status"` con `aria-live="polite"` y en los
// errores asociados a cada campo.

// Contrato preservado del endpoint de Azure Functions (plan §5): URL, `code`
// y token son los mismos que usa el sitio actual. No cambiar uno sin el otro.
const ENDPOINT =
  'https://formcontact-dwc8g7cgh8a8gded.brazilsouth-01.azurewebsites.net/api/SendContactEmail?code=qx_xHYiK9TF1JHYNlH4nnDxK9idXbXvG-SQ87HzJL4i2AzFuhZR_JA==';
const TOKEN = 'MI_TOKEN_SECRETO_123';
const TIEMPO_LIMITE_MS = 15000;

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MENSAJES = {
  enviando: 'Enviando tu mensaje…',
  exito: 'Mensaje enviado. Gracias por escribirme; te responderé a la brevedad.',
  errorHttp:
    'No pudimos enviar el mensaje. Probá de nuevo en unos minutos.',
  errorRed:
    'No hay conexión con el servicio. Revisá tu conexión e intentá otra vez.',
};

const iniciarContacto = () => {
  const formulario = document.getElementById('contact-form');

  if (!formulario) {
    return;
  }

  const campos = [
    {
      control: document.getElementById('name'),
      validar: (valor) =>
        valor.trim() === '' ? 'Ingresá tu nombre.' : '',
    },
    {
      control: document.getElementById('email'),
      validar: (valor) => {
        const correo = valor.trim();

        if (correo === '') {
          return 'Ingresá tu correo.';
        }

        return PATRON_CORREO.test(correo)
          ? ''
          : 'Ingresá un correo válido, por ejemplo nombre@dominio.com.';
      },
    },
    {
      control: document.getElementById('message'),
      validar: (valor) =>
        valor.trim() === '' ? 'Escribí tu mensaje.' : '',
    },
  ].filter((campo) => campo.control);

  const estado = formulario.querySelector('#contact-status');
  const boton = formulario.querySelector('button[type="submit"]');
  const textoBoton = boton ? boton.textContent.trim() : '';

  // Guardia de estado: mientras un envío está en curso no se acepta otro.
  let enviando = false;

  const errorDe = (campo) => document.getElementById(`${campo.control.id}-error`);

  const mostrarError = (campo, mensaje) => {
    const error = errorDe(campo);
    const invalido = mensaje !== '';

    campo.control.setAttribute('aria-invalid', String(invalido));

    if (!error) {
      return;
    }

    if (invalido) {
      error.textContent = mensaje;
      error.hidden = false;
      campo.control.setAttribute('aria-describedby', error.id);
    } else {
      error.textContent = '';
      error.hidden = true;
      campo.control.removeAttribute('aria-describedby');
    }
  };

  const validarCampo = (campo) => {
    const mensaje = campo.validar(campo.control.value);
    mostrarError(campo, mensaje);
    return mensaje === '';
  };

  const limpiarEstado = () => {
    if (!estado) {
      return;
    }

    estado.textContent = '';
    delete estado.dataset.estado;
  };

  const anunciar = (tipo, mensaje) => {
    if (!estado) {
      return;
    }

    estado.dataset.estado = tipo;
    estado.textContent = mensaje;
  };

  // Estado "enviando": botón deshabilitado con su texto, y el formulario
  // marcado como ocupado para el árbol de accesibilidad.
  const marcarEnviando = (activo) => {
    if (activo) {
      formulario.setAttribute('aria-busy', 'true');
    } else {
      formulario.removeAttribute('aria-busy');
    }

    if (!boton) {
      return;
    }

    boton.disabled = activo;
    boton.textContent = activo ? 'Enviando…' : textoBoton;
  };

  const limpiarErrores = () => {
    campos.forEach((campo) => mostrarError(campo, ''));
  };

  // Si un campo ya marcado como inválido se corrige, el error desaparece sin
  // esperar a un nuevo envío.
  campos.forEach((campo) => {
    campo.control.addEventListener('input', () => {
      if (campo.control.getAttribute('aria-invalid') === 'true') {
        validarCampo(campo);
      }
    });
  });

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    if (enviando) {
      return;
    }

    limpiarEstado();

    const invalidos = campos.filter((campo) => !validarCampo(campo));

    if (invalidos.length > 0) {
      // El foco en el primer campo inválido hace que el lector de pantalla
      // anuncie su etiqueta, el estado `aria-invalid` y el error asociado.
      invalidos[0].control.focus();
      return;
    }

    const datos = {
      Name: (document.getElementById('name')?.value ?? '').trim(),
      Email: (document.getElementById('email')?.value ?? '').trim(),
      Message: (document.getElementById('message')?.value ?? '').trim(),
      Token: TOKEN,
    };

    enviando = true;
    marcarEnviando(true);
    anunciar('enviando', MENSAJES.enviando);

    const controlador = new AbortController();
    const temporizador = setTimeout(
      () => controlador.abort(),
      TIEMPO_LIMITE_MS,
    );

    let respuesta;

    try {
      respuesta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
        signal: controlador.signal,
      });
    } catch {
      // Red caída, bloqueo de CORS, timeout o aborto: no hay respuesta que
      // leer. Los datos escritos se conservan para reintentar.
      clearTimeout(temporizador);
      enviando = false;
      marcarEnviando(false);
      anunciar('error', MENSAJES.errorRed);
      return;
    }

    clearTimeout(temporizador);
    enviando = false;
    marcarEnviando(false);

    if (!respuesta.ok) {
      // Error HTTP: se conservan los datos para que el visitante reintente.
      anunciar('error', MENSAJES.errorHttp);
      return;
    }

    formulario.reset();
    limpiarErrores();
    anunciar('exito', MENSAJES.exito);
  });
};

iniciarContacto();
