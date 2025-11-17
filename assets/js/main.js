// Alternância real de tema claro/escuro usando data-theme no <html>
const modeBtn = document.getElementById('modeToggle');
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('site-theme');
if(savedTheme){ htmlEl.setAttribute('data-theme', savedTheme); }
updateModeButtonLabel();

modeBtn?.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('site-theme', next);
  updateModeButtonLabel();
});

function updateModeButtonLabel(){
  if(!modeBtn) return;
  const current = htmlEl.getAttribute('data-theme');
  modeBtn.textContent = `Tema: ${current === 'light' ? 'Claro' : 'Escuro'}`;
  // Troca classe outline conforme tema para contraste ideal
  if(current === 'light'){
    modeBtn.classList.remove('btn-outline-light');
    modeBtn.classList.add('btn-outline-dark');
  }else{
    modeBtn.classList.remove('btn-outline-dark');
    modeBtn.classList.add('btn-outline-light');
  }
}

// Ano dinâmico
const yearSpan = document.getElementById('year');
yearSpan && (yearSpan.textContent = new Date().getFullYear());

// Sugestões (Formspree)
const suggestionForm = document.getElementById('suggestionForm');
const suggestionMsg = document.getElementById('suggestionMsg');
if(suggestionForm && suggestionMsg){
  suggestionForm.addEventListener('submit', function(ev){
    ev.preventDefault();
    suggestionMsg.textContent = 'Enviando...';
    const formData = new FormData(suggestionForm);
    fetch(suggestionForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(r => r.json()).then(data => {
      if(data.ok){
        suggestionMsg.textContent = 'Sugestão enviada com sucesso! Obrigado.';
        suggestionForm.reset();
      }else{
        suggestionMsg.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
      }
    }).catch(() => {
      suggestionMsg.textContent = 'Erro ao enviar. Tente novamente mais tarde.';
    });
  });
}

// Devlog placeholder
const devlogList = document.getElementById('devlogList');
if(devlogList){
  const entries = [
    { title:'Progresso de combate', date:'2025-10-02', text:'Refinamos animações e feedback visual de impacto.' },
    { title:'Protótipo de crafting', date:'2025-09-18', text:'Sistema básico de recursos e raridades.' },
    { title:'Primeiro chefe', date:'2025-09-01', text:'Lutas multi-fase com padrões telegrafados.' }
  ];
  devlogList.innerHTML = entries.map(e => `\n    <article class="devlog-entry p-3 rounded-3 mb-2">\n      <h6 class="mb-1">${e.title}</h6>\n      <small class="text-muted">${e.date}</small>\n      <p class="mb-0 text-muted-contrast small">${e.text}</p>\n    </article>`).join('');
}

// Lazy loading improvement for non-supported browsers (fallback)
if('loading' in HTMLImageElement.prototype === false){
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    const src = img.getAttribute('data-src');
    if(src) img.src = src;
  });
}

// Suave scroll para links internos
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', ev => {
    const id = link.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    if(target){
      ev.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior:'smooth'});
    }
  });
});
