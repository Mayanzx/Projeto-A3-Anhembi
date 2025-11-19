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

// Lazy loading polyfill para navegadores antigos
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

// Lista de participantes no modal (aceita objetos {name, photo, role})
const defaultParticipants = [
  { name:'Mayan',    role:'Site',              photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Tirone',   role:'Desenvolvedor',  photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Lucas',    role:'Desenvolvedor',  photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Heitor',   role:'Desenvolvedor',  photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Eduarda',  role:'Desenvolvedor',  photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Gabriel',  role:'Testes',            photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Theo',     role:'UX',                photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Luiz',     role:'UX',                photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Sabrina',  role:'UX',                photo:'assets/img/team/avatar-placeholder.svg' },
  { name:'Adrielle', role:'Documentação',      photo:'assets/img/team/avatar-placeholder.svg' }
];
const participants = (Array.isArray(window.PROJECT_PARTICIPANTS) && window.PROJECT_PARTICIPANTS.length === 10)
  ? window.PROJECT_PARTICIPANTS.map(p => ({ name: p.name || p, role: p.role || 'Membro da equipe', photo: p.photo || 'assets/img/team/avatar-placeholder.svg' }))
  : defaultParticipants;

function populateTeamList(){
  const teamList = document.getElementById('teamList');
  if(!teamList) return;
  teamList.innerHTML = participants.map((p, idx) => `
    <li class="list-group-item">
      <div class="d-flex align-items-center gap-3">
        <img class="team-avatar" src="${p.photo}" alt="Foto de ${p.name}">
        <div>
          <div class="team-name">${p.name}</div>
          <div class="small text-muted-contrast team-role">${p.role || 'Membro da equipe'}</div>
        </div>
      </div>
    </li>
  `).join('');
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', populateTeamList);
}else{
  populateTeamList();
}
