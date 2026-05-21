


/* ── 1. NAVBAR ENCOLHE AO ROLAR ──────────────────────────
   Quando o usuário rola a página, a navbar fica menor.
   Isso dá um visual mais profissional. */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');

  // Se rolou mais de 50px: adiciona classe "scrolled" (ativa o CSS menor)
  // Se não: remove a classe
  nav.classList.toggle('scrolled', window.scrollY > 50);
});


/* ── 2. PARTÍCULAS ANIMADAS NO HERO ──────────────────────
   Cria bolinhas coloridas que sobem pela tela de entrada.
   São criadas pelo JS e estilizadas pelo CSS. */
(function createParticles() {
  const container = document.getElementById('particles'); // Onde as bolinhas ficam
  const colors = ['#3cc2c2', '#795c00', '#ffffff', '#c49a00']; // Cores possíveis

  // Cria 20 bolinhas
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span'); // Cria um elemento <span>
    const size = Math.random() * 20 + 6;         // Tamanho aleatório entre 6px e 26px

    span.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;

    container.appendChild(span); // Coloca a bolinha dentro do container
  }
})(); // Os () no final fazem a função rodar imediatamente


/* ── 3. SCROLL REVEAL (APARECER AO ROLAR) ────────────────
   Elementos com a classe .reveal ficam invisíveis no início.
   Quando o usuário rola e eles aparecem na tela,
   o JS adiciona a classe .visible (que os mostra com animação). */
const reveals = document.querySelectorAll('.reveal'); // Pega todos os elementos .reveal

// IntersectionObserver = "avisa quando o elemento aparece na tela"
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {          // Se apareceu na tela...
      setTimeout(() => {
        entry.target.classList.add('visible'); // ...adiciona .visible com delay
      }, i * 100);                             // Cada elemento aparece 100ms depois do anterior
      observer.unobserve(entry.target);        // Para de observar (não precisa mais)
    }
  });
}, { threshold: 0.12 }); // Dispara quando 12% do elemento está visível

reveals.forEach(el => observer.observe(el)); // Começa a observar cada elemento


/* ── 4. CONTADOR ANIMADO NOS NÚMEROS ─────────────────────
   Os números "500+", "30", "5" não aparecem prontos.
   Eles contam do zero até o valor final quando aparecem na tela.
   Isso chama atenção! */
function animateCounter(el) {
  const target = +el.dataset.target; // Pega o valor do atributo data-target no HTML
  const duration = 1800;             // Duração da contagem em milissegundos
  const step = target / (duration / 16); // Quantos pontos adicionar a cada frame (60fps)
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target); // Incrementa, mas não passa do limite
    el.textContent = Math.floor(current) + (target >= 100 ? '+' : ''); // Mostra o número
    if (current >= target) clearInterval(timer); // Para o timer quando chegar ao fim
  }, 16); // Roda a cada 16ms (~60 frames por segundo)
}

// Só começa o contador quando a seção de stats aparecer na tela
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObs.unobserve(entry.target); // Roda só uma vez
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats').forEach(el => counterObs.observe(el));


/* ── 5. SCROLL SUAVE AOS CLIQUES DO MENU ─────────────────
   Quando clica em "Serviços" ou "Sobre Nós" no menu,
   a página rola suavemente até lá, em vez de pular. */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href')); // Acha o destino

    if (target) {
      e.preventDefault(); // Impede o comportamento padrão (pular)
      target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Rola suavemente
    }
  });
});


/* ── 6. EFEITO 3D NOS CARDS DE PRODUTO ───────────────────
   Ao mover o mouse sobre um card, ele inclina levemente
   na direção do cursor. Parece que ele está "seguindo" você!
   Isso é um efeito chamado "tilt" (inclinação). */
document.querySelectorAll('.produto-card').forEach(card => {

  // Quando o mouse move sobre o card
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect(); // Pega a posição do card na tela

    // Calcula quanto o mouse está deslocado do centro do card
    const x = e.clientX - rect.left  - rect.width  / 2;
    const y = e.clientY - rect.top   - rect.height / 2;

    // Aplica a rotação (dividir por 20 deixa o efeito mais sutil)
    card.style.transform = `
      translateY(-8px)
      rotateY(${x / 20}deg)
      rotateX(${-y / 20}deg)
    `;
  });

  // Quando o mouse sai do card, volta ao normal
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
