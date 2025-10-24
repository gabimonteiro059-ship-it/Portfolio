const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
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

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300){
    toTop.style.display = 'flex';
  } else {
    toTop.style.display = 'none';
  }
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

document.querySelectorAll('#mobile-menu a, .main-nav a').forEach(a => {
  a.addEventListener('click', () => {
    if(!mobileMenu) return;
    mobileMenu.hidden = true;
    if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Feedback
const feedbackForm = document.getElementById('feedbackForm');
if(feedbackForm){
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const access = document.getElementById('access').value;
    const errorName = document.getElementById('error-name');
    const feedbackMsg = document.getElementById('form-feedback');

    let valid = true;

    if(name.length < 2){
      errorName.textContent("Por favor, insira seu nome.");
      valid = false;
    }

    if(!access){
      errorAccess.textContent("Selecione uma opção.");
      valid = false;
    }

    if(!valid){
      feedbackMsg.style.color = "red";
      feedbackMsg.textContent = "Por favor, corrija os erros acima.";
      return;
    }

    const formData = new FormData(feedbackForm);
    feedbackMsg.style.color = "black";
    feedbackMsg.textContent = "Enviando..."

    try {
      const response = await fetch(feedbackForm.action, {
        method: feedbackForm.method,
        body: formData,
        headers: {Accept: "application/json"},
      });

      if (response.ok) {
        feedbackMsg.style.color = "green";
        feedbackMsg.textContent = "Feedback enviado com sucesso!";
        feedbackForm.reset();
      } else {
        feedbackMsg.style.color = "red";
        feedbackMsg.textContent = "Ops, algo deu errado no envio. Tente novamente mais tarde.";
      }
    } catch (error) {
      feedbackMsg.style.color = "red";
      feedbackMsg.textContent = "Erro de conexão. Verifique sua internet e tente novamente.";
    }
  });
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => (e.textContent = " "));
  const feedbackMsg = document.getElementById("form-feedback");
  if (feedbackMsg) feedbackMsg.textContent = " ";
}
