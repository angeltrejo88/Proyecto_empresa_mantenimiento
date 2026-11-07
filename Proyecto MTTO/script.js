/* ============================================
   CONFIGURACIÓN: cambia aquí los datos del negocio
   ============================================ */
const CONFIG = {
  nombre: 'Tu Nombre Aquí',        // Nombre del negocio (provisional)
  whatsapp: '526180000000',        // 52 + lada 618 + número, sin espacios ni signos
  telefono: '618 000 0000',        // Como quieres que se vea en la página
  horario: 'de lunes a sábado, de 8:00 a 19:00',
  local: 'Aún sin local: servicio a domicilio.', // Cambia por la dirección cuando tengan local
  mensajeBase: 'Hola, me gustaría pedir una cotización.',
  redes: {
    facebook: '',   // Pega aquí el enlace cuando exista
    instagram: '',
    tiktok: ''
  }
};

/* ============================================ */
const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.mensajeBase)}`;

document.querySelectorAll('[data-nombre]').forEach(el => el.textContent = CONFIG.nombre);
document.querySelectorAll('[data-telefono]').forEach(el => el.textContent = CONFIG.telefono);
document.querySelectorAll('[data-horario]').forEach(el => el.textContent = CONFIG.horario);
document.querySelectorAll('[data-local]').forEach(el => el.textContent = CONFIG.local);
document.getElementById('year').textContent = new Date().getFullYear();
document.title = `${CONFIG.nombre} | Mantenimiento del hogar en Durango`;

document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waLink(a.dataset.msg);
  a.target = '_blank';
  a.rel = 'noopener';
});

document.querySelectorAll('[data-tel]').forEach(a => {
  a.href = 'tel:+' + CONFIG.whatsapp;
});

// Redes: si aún no hay enlace, el botón avisa en lugar de llevar a ningún lado
document.querySelectorAll('[data-social]').forEach(a => {
  const url = CONFIG.redes[a.dataset.social];
  if (url) {
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
  } else {
    a.href = '#contacto';
    a.title = 'Próximamente';
  }
});

// Menú móvil
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const abierto = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', abierto);
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  })
);

// Formulario: arma el mensaje y abre WhatsApp
document.getElementById('f-send').addEventListener('click', () => {
  const nombre = document.getElementById('f-nombre').value.trim();
  const serv = document.getElementById('f-serv').value;
  const desc = document.getElementById('f-desc').value.trim();
  let msg = `Hola, soy ${nombre || 'un cliente'}. Necesito ayuda con: ${serv}.`;
  if (desc) msg += ` ${desc}`;
  msg += ' ¿Me pueden dar una cotización?';
  window.open(waLink(msg), '_blank', 'noopener');
});
