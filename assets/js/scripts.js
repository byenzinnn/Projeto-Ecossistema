document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (!btn || !menu || !window.anime) return;
  
    let isAnimating = false;
  
    const openMenu = () => {
      if (isAnimating || menu.classList.contains('open')) return;
      isAnimating = true;
  
      menu.classList.add('open');                 // garante display visível no mobile
      document.body.classList.add('no-scroll');
  
      anime.set(menu, { opacity: 0 });
      anime({
        targets: menu,
        opacity: 1,
        duration: 180,
        easing: 'easeOutQuad'
      });
  
      anime({
        targets: '.menu.open a',
        translateY: [12, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        duration: 240,
        easing: 'easeOutQuad',
        complete: () => { isAnimating = false; }  // NÃO remove .open
      });

      
      btn.setAttribute('aria-expanded', 'true');
    };
  
    const closeMenu = () => {
      if (isAnimating || !menu.classList.contains('open')) return;
      isAnimating = true;
  
      const tl = anime.timeline({ easing: 'easeInQuad' });
      tl.add({
        targets: '.menu a',
        translateY: [0, -8],
        opacity: [1, 0],
        delay: anime.stagger(30),
        duration: 140
      }).add({
        targets: menu,
        opacity: 0,
        duration: 120,
        complete: () => {
          menu.classList.remove('open');          // só aqui some de fato
          document.body.classList.remove('no-scroll');
          btn.setAttribute('aria-expanded', 'false');
          isAnimating = false;
        }
      });
    };
  
    // Evita “duplo clique” em mobile (toque rápido)
    const onToggle = (e) => {
      e.preventDefault();
      if (menu.classList.contains('open')) closeMenu();
      else openMenu();
    };
    btn.addEventListener('click', onToggle, { passive: false });
  
    // Fecha ao clicar em um link
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
  });
  
// requer anime.js já carregado
document.addEventListener('DOMContentLoaded', () => {
  const h = document.querySelector('.hero-title');
  if (!h) return;

  // 1) Transformar quebras <br> em spans animáveis (uma span por linha)
  const parts = h.innerHTML.split('<br>');
  h.innerHTML = parts.map(p => `<span class="line">${p.trim()}</span>`).join('<br>');

  // 2) estados iniciais
  const lines = h.querySelectorAll('.line');
  lines.forEach(el => {
    el.style.display = 'inline-block';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
  });

  // 3) animação com pequeno delay entre as linhas
  anime({
    targets: '.hero-title .line',
    translateY: [10, 0],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(120, { start: 150 }), // atraso entre linhas
    easing: 'easeOutQuad'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ===== HERO TITLE =====
  const h = document.querySelector('.hero-title');
  if (h) {
    const parts = h.innerHTML.split('<br>');
    h.innerHTML = parts.map(p => `<span class="line">${p.trim()}</span>`).join('<br>');

    const lines = h.querySelectorAll('.line');
    lines.forEach(el => {
      el.style.display = 'inline-block';
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
    });

    anime({
      targets: '.hero-title .line',
      translateY: [10, 0],
      opacity: [0, 1],
      duration: 400,
      delay: anime.stagger(120, { start: 200 }),
      easing: 'easeOutQuad'
    });
  }

  // ===== NAVBAR LINKS =====
  const navLinks = document.querySelectorAll('.menu a');
  navLinks.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
  });

  anime({
    targets: '.menu a',
    translateY: [10, 0],
    opacity: [0, 1],
    duration: 400,
    delay: anime.stagger(100, { start: 400 }), // atraso entre cada link
    easing: 'easeOutQuad'
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let index = 0;

  function showSlide(i){
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    index = i;
  }

  setInterval(() => {
    let next = (index + 1) % slides.length;
    showSlide(next);
  }, 6000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const projectImage = document.querySelector('.project-image');
  const dots = document.querySelectorAll('.dot');

  // lista de imagens do carrossel
  const images = [
    '/assets/img/Fotospaquistão.png',
    '/assets/img/Fotos paquistão 3.png',
    '/assets/img/Fotos paquistão2.png'
  ];

  let index = 0;

  function showSlide(i) {
    projectImage.style.backgroundImage = `url('${images[i]}')`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    index = i;
  }

  // inicia com a primeira
  showSlide(0);

  // troca automática a cada 6s
  setInterval(() => {
    let next = (index + 1) % images.length;
    showSlide(next);
  }, 6000);

  // clique nos dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // função auxiliar para animar linhas
  function animateLines(containerSelector, delayStart = 200) {
    const el = document.querySelector(containerSelector);
    if (!el) return;

    // só processa 1x
    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    const parts = el.innerHTML.split('<br>');
    el.innerHTML = parts.map(p => `<span class="line">${p.trim()}</span>`).join('<br>');

    const lines = el.querySelectorAll('.line');
    lines.forEach(line => {
      line.style.display = 'inline-block';
      line.style.opacity = '0';
      line.style.transform = 'translateY(10px)';
    });

    anime({
      targets: `${containerSelector} .line`,
      translateY: [10, 0],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(150, { start: delayStart }),
      easing: 'easeOutQuad'
    });
  }

  function animateSubtitle(selector, delay = 200) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';

    anime({
      targets: el,
      translateY: [10, 0],
      opacity: [0, 1],
      duration: 400,
      delay,
      easing: 'easeOutQuad'
    });
  }

  // Observer para rodar a animação quando a seção entrar na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSubtitle('.subtitle', 100);
        animateLines('.projects-title', 300);
      }
    });
  }, { threshold: 0.3 }); // dispara quando 30% da seção estiver visível

  const target = document.querySelector('.projects');
  if (target) observer.observe(target);
});

document.addEventListener('DOMContentLoaded', () => {
  // helper p/ animar linhas por <br> (aqui o título não tem <br>, mas mantém padrão)
  function splitLines(el){
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';
    const parts = el.innerHTML.split('<br>');
    el.innerHTML = parts.map(p => `<span class="line">${p.trim()}</span>`).join('<br>');
    el.querySelectorAll('.line').forEach(s => {
      s.style.display='inline-block';
      s.style.opacity='0';
      s.style.transform='translateY(10px)';
    });
  }

  const title = document.querySelector('[data-anim="mission-title"]');
  const copy  = document.querySelector('[data-anim="mission-copy"]');

  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;

      // título (pode ter ou não <br>)
      splitLines(title);
      anime({
        targets: '.mission-title .line',
        translateY:[10,0],
        opacity:[0,1],
        duration:500,
        delay: anime.stagger(120,{start:150}),
        easing:'easeOutQuad'
      });

      // parágrafos (stagger por parágrafo)
      const paras = copy.querySelectorAll('p');
      paras.forEach(p=>{
        p.style.opacity='0';
        p.style.transform='translateY(10px)';
      });
      anime({
        targets: paras,
        translateY:[10,0],
        opacity:[0,1],
        duration:450,
        delay: anime.stagger(120,{start:300}),
        easing:'easeOutQuad'
      });

      obs.disconnect(); // roda só uma vez
    });
  }, { threshold: 0.25 });

  const mission = document.querySelector('.mission');
  if (mission) obs.observe(mission);
});

document.addEventListener('DOMContentLoaded', () => {
  const acc = document.querySelector('[data-acc]');
  if (!acc) return;

  const items = [...acc.querySelectorAll('.acc-item')];

  // prepara alturas (abre o que tem .open)
  items.forEach(it => {
    const panel = it.querySelector('.acc-panel');
    const inner = it.querySelector('.acc-inner');
    panel.style.height = it.classList.contains('open') ? `${inner.scrollHeight}px` : '0px';
  });

  function closeItem(it){
    const panel = it.querySelector('.acc-panel');
    anime({
      targets: panel,
      height: 0,
      duration: 260,
      easing: 'easeInOutQuad'
    });
    it.classList.remove('open');
    it.querySelector('.acc-head').setAttribute('aria-expanded','false');
  }
  function openItem(it){
    const panel = it.querySelector('.acc-panel');
    const inner = it.querySelector('.acc-inner');

    // mede altura atual do conteúdo
    const h = inner.scrollHeight;
    anime({
      targets: panel,
      height: h,
      duration: 320,
      easing: 'easeInOutQuad'
    });
    it.classList.add('open');
    it.querySelector('.acc-head').setAttribute('aria-expanded','true');

    // leve entrada do texto
    anime.set(inner, { opacity: 0, translateY: 8 });
    anime({ targets: inner, opacity: 1, translateY: 0, duration: 260, easing: 'easeOutQuad' });
  }

  // clique
  acc.addEventListener('click', (e) => {
    const head = e.target.closest('.acc-head');
    if (!head) return;
    const item = head.parentElement;

    // fecha outros
    items.forEach(it => { if (it !== item && it.classList.contains('open')) closeItem(it); });
    // toggle atual
    item.classList.contains('open') ? closeItem(item) : openItem(item);
  });

  // anima abrir o 3º ao entrar na viewport (como o mock mostra aberto)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const already = acc.dataset.shown === '1';
      if (!already) {
        const opened = acc.querySelector('.acc-item.open');
        if (opened) openItem(opened); // garante animado
        acc.dataset.shown = '1';
      }
    });
  }, { threshold: 0.25 });
  observer.observe(acc);
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    let idx = 0;

    // garante que apenas o primeiro comece visível
    slides.forEach((s,i)=> s.classList.toggle('active', i===0));

    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 4000);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.scroll-anim');

  // garante que todos comecem ocultos
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
  });

  function animate(el){
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    anime({
      targets: el,
      translateY: [20,0],
      opacity: [0,1],
      duration: 500,
      delay: anime.stagger(120,{start:150}),
      easing: 'easeOutQuad'
    });
  }

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.2});

  els.forEach(el=>obs.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {

  // ---- animação dos CARDS ----
  const cards = document.querySelectorAll('.cards-grid .card');
  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
  });

  const cardsObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      anime({
        targets: cards,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(120, { start: 150 }), // delay em cascata
        easing: 'easeOutQuad'
      });

      obs.disconnect(); // roda 1x
    });
  }, { threshold: 0.2 });

  const cardsWrap = document.querySelector('.cards-wrapper');
  if (cardsWrap) cardsObs.observe(cardsWrap);


  // ---- animação do ACCORDION (bloco inteiro) ----
  const accSection = document.querySelector('.accordion-section');
  if (accSection) {
    accSection.style.opacity = '0';
    accSection.style.transform = 'translateY(20px)';

    const accObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;

        anime({
          targets: accSection,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutQuad'
        });

        obs.disconnect();
      });
    }, { threshold: 0.2 });

    accObs.observe(accSection);
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-app');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.slide');
  const dots   = carousel.querySelectorAll('.dot');
  let idx = 0;

  function showSlide(i){
    slides.forEach((s,k)=> s.classList.toggle('active', k===i));
    dots.forEach((d,k)=> d.classList.toggle('active', k===i));
    idx = i;
  }

  setInterval(()=>{
    showSlide((idx + 1) % slides.length);
  }, 5000);

  dots.forEach((dot,i)=> dot.addEventListener('click', ()=> showSlide(i)));
});

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-app');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dots .dot');
  let idx = 0;

  function showSlide(i){
    slides.forEach((s,k)=> s.classList.toggle('active', k===i));
    dots.forEach((d,k)=> d.classList.toggle('active', k===i));
    idx = i;
  }

  setInterval(()=> showSlide((idx + 1) % slides.length), 5000);
  dots.forEach((dot,i)=> dot.addEventListener('click', ()=> showSlide(i)));
});