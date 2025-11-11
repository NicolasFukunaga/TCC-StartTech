/* ============================================================
   APP.JS - FUNCIONALIDADES PRINCIPAIS DO SITE STARTERCASH
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     MODAL DE LOGIN (botão "Entrar")
     ============================================================ */

  const overlay = document.getElementById("overlay");
  const fecharModal = document.getElementById("fecharModal");
  const botaoLogin = document.querySelector('a[data-modal="login"]');

  if (overlay && fecharModal && botaoLogin) {
    // Abre o modal ao clicar no botão "Entrar"
    botaoLogin.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.classList.add("ativo");

      // Foca automaticamente no primeiro input dentro do modal
      const primeiroInput = overlay.querySelector("input");
      if (primeiroInput) primeiroInput.focus();
    });

    // Fecha o modal ao clicar no botão X
    fecharModal.addEventListener("click", () => overlay.classList.remove("ativo"));

    // Fecha o modal ao clicar fora dele
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("ativo");
    });

    // Fecha o modal ao pressionar a tecla "Esc"
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("ativo");
    });
  }

  /* ============================================================
     MATRÍCULA / FORMULÁRIO DE CADASTRO
     ============================================================ */
  const form = document.querySelector(".formulario");
  const confirmarBtn = document.querySelector(".confirmar");

  // Caso não existam os elementos, interrompe o script
  if (!form || !confirmarBtn) return;

  const modalSucesso = document.getElementById("modalSucesso");
  const modalErro = document.getElementById("modalErro");
  const fecharModais = document.querySelectorAll(".fechar-modal");

  // Função para exibir o modal de sucesso ou erro
  function mostrarModal(modal) {
    modal.classList.add("ativo");
  }

  // Função para fechar todos os modais
  function fecharTodosModais() {
    modalSucesso.classList.remove("ativo");
    modalErro.classList.remove("ativo");
  }

  // Eventos para fechar os modais (botão X e clique fora)
  fecharModais.forEach((btn) =>
    btn.addEventListener("click", fecharTodosModais)
  );

  window.addEventListener("click", (e) => {
    if (e.target === modalSucesso || e.target === modalErro) fecharTodosModais();
  });

  /* ============================================================
     VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
     ============================================================ */
  confirmarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Captura os valores dos campos
    const nome = form.querySelector('input[placeholder="Nome completo"]').value.trim();
    const cpf = form.querySelector('input[placeholder="CPF"]').value.trim();
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const senha = form.querySelector('input[placeholder="Crie uma senha"]').value.trim();
    const confirmarSenha = form.querySelector('input[placeholder="Confirme sua senha"]').value.trim();

    // Expressões regulares para validação
    const cpfValido = /^\d{11}$/.test(cpf.replace(/\D/g, ""));
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Verifica campos vazios e validações
    if (!nome || !cpf || !email || !senha || !confirmarSenha || !cpfValido || !emailValido || senha !== confirmarSenha) {
      mostrarModal(modalErro);
      return;
    }

    // Exibe modal de sucesso se tudo estiver correto
    mostrarModal(modalSucesso);

    // Fecha o modal e redireciona para o lobby após 2 segundos
    setTimeout(() => {
      fecharTodosModais();
      window.location.href = "/StarterCash/docs/lobby.html";
    }, 2000);
  });
});

/* ============================================================
   MODAL DE LOGIN - INTERAÇÃO GERAL (fora do DOMContentLoaded)
   ============================================================ */
const overlay = document.getElementById('overlay');
const fecharModal = document.getElementById('fecharModal');
const formLogin = document.querySelector('.formulario');

// Abre o modal ao clicar em qualquer botão com atributo data-modal="login"
document.querySelectorAll('[data-modal="login"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'flex';
  });
});

// Fecha o modal ao clicar no X
fecharModal.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Redireciona para o lobby ao enviar o formulário de login
formLogin.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita o recarregamento da página
  window.location.href = '/StarterCash/docs/lobby.html';
});

/* ============================================================
   FEEDBACK - CARROSSEL DE DEPOIMENTOS
   ============================================================ */
const feedbackCards = document.querySelectorAll('.feedback-card');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentIndex = 0;

// Função para exibir o card ativo
function showCard(index) {
  feedbackCards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === index) {
      card.classList.add('active');
    }
  });
}

// Botão "próximo"
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % feedbackCards.length;
  showCard(currentIndex);
});

// Botão "anterior"
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + feedbackCards.length) % feedbackCards.length;
  showCard(currentIndex);
});

// Alternância automática de feedbacks a cada 6 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % feedbackCards.length;
  showCard(currentIndex);
}, 6000);

/* ============================================================
   TEMA ESCURO / CLARO
   ============================================================ */

   /* ============================================================
   EFEITO DE PARTÍCULAS GALÁCTICAS
   ============================================================ */
const canvas = document.createElement("canvas");
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.width = "100%";
canvas.style.height = "100%";

function ajustarTamanho() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();

const estrelas = Array.from({ length: 120 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  v: Math.random() * 0.3 + 0.2
}));

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  estrelas.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
    e.y += e.v;
    if (e.y > canvas.height) e.y = 0;
  });
  requestAnimationFrame(animar);
}
animar();

/* ============================================================
   MINI CHAT SIMULADO - "AURY"
   ============================================================
   📌 Função:
   Cria um chat flutuante no canto da tela com a personagem Aury.
   O usuário pode digitar mensagens e receber respostas simuladas.

   💡 Destaques:
   - Animações suaves
   - Mensagens alternadas (usuário / Aury)
   - Respostas automáticas com delay
   - Totalmente estilizado via CSS
   ============================================================ */

// Criação da estrutura do chat
const chatContainer = document.createElement("div");
chatContainer.classList.add("aury-chat-container");
chatContainer.innerHTML = `
  <div class="aury-chat-header">
    <span>💫 Aury</span>
    <button class="aury-close">×</button>
  </div>
  <div class="aury-chat-body">
    <div class="aury-message aury">
      Olá! Eu sou a <strong>Aury</strong> 💫<br>Como posso te ajudar hoje?
    </div>
  </div>
  <div class="aury-chat-input">
    <input type="text" placeholder="Digite sua mensagem..." maxlength="120">
    <button class="aury-send">➤</button>
  </div>
`;

// Botão flutuante para abrir o chat
const chatButton = document.createElement("div");
chatButton.classList.add("aury-chat-button");
chatButton.textContent = "💬";

// Adiciona tudo no body
document.body.appendChild(chatContainer);
document.body.appendChild(chatButton);

// Funções de controle
const chatBody = chatContainer.querySelector(".aury-chat-body");
const chatInput = chatContainer.querySelector("input");
const chatSend = chatContainer.querySelector(".aury-send");
const chatClose = chatContainer.querySelector(".aury-close");

// Abre e fecha o chat
chatButton.addEventListener("click", () => {
  chatContainer.classList.add("active");
  chatButton.style.display = "none";
  chatInput.focus();
});

chatClose.addEventListener("click", () => {
  chatContainer.classList.remove("active");
  chatButton.style.display = "flex";
});

// Envia mensagem
function enviarMensagem() {
  const texto = chatInput.value.trim();
  if (texto === "") return;

  // Mensagem do usuário
  const msgUser = document.createElement("div");
  msgUser.classList.add("aury-message", "usuario");
  msgUser.textContent = texto;
  chatBody.appendChild(msgUser);
  chatInput.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Resposta da Aury com atraso
  setTimeout(() => {
    const msgAury = document.createElement("div");
    msgAury.classList.add("aury-message", "aury");

    // Respostas básicas (pode expandir com IA depois)
    const respostas = [
      "Interessante! Me conte mais sobre isso 💭",
      "Haha, adorei isso 😄",
      "Hmm... parece importante. Quer que eu te ajude com isso?",
      "Posso te mostrar algo legal no site se quiser 😉",
      "Adoro conversar com você 💫",
    ];

    const resposta = respostas[Math.floor(Math.random() * respostas.length)];
    msgAury.textContent = resposta;
    chatBody.appendChild(msgAury);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

// Eventos de envio
chatSend.addEventListener("click", enviarMensagem);
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") enviarMensagem();
});
