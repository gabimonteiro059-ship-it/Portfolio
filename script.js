// script.js

// Simple DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if(navToggle){
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    if(open){
      mobileMenu.hidden = true;
    } else {
      mobileMenu.hidden = false;
    }
  });
}

// Back to top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    toTop.style.display = 'flex';
  } else {
    toTop.style.display = 'none';
  }
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Smoothly close mobile menu on link click
document.querySelectorAll('#mobile-menu a, .main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    if(!mobileMenu) return;
    mobileMenu.hidden = true;
    if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Contact form validation (client-side)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();

    let valid = true;

    if(name.length < 2){
      showError('name', 'Insira seu nome completo.');
      valid = false;
    }

    if(!validateEmail(email)){
      showError('email', 'Insira um e-mail válido.');
      valid = false;
    }

    if(message.length < 6){
      showError('message', 'A mensagem é muito curta.');
      valid = false;
    }

    if(!valid) return;

    // Simular envio (substitua por integração real: e-mail, Netlify Forms, API)
    const feedback = $('#form-feedback');
    feedback.style.color = 'green';
    feedback.textContent = 'Mensagem enviada com sucesso! Obrigada pelo contato. (isso é uma simulação)';
    contactForm.reset();

    // Opcional: remover mensagem após alguns segundos
    setTimeout(()=> feedback.textContent = '', 6000);
  });
}

function showError(field, msg){
  const el = document.getElementById('error-' + field);
  if(el) el.textContent = msg;
}

function clearErrors(){
  $$('.error').forEach(e => e.textContent = '');
  const fb = $('#form-feedback');
  if(fb) fb.textContent = '';
}

function validateEmail(email){
  // simples regex para e-mail
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}