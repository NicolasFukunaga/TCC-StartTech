document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     MODAL DE LOGIN (botão Entrar)
     ============================================================ */
  const overlay = document.getElementById("overlay");
  const fecharModal = document.getElementById("fecharModal");
  const botaoLogin = document.querySelector('a[data-modal="login"]');

  if (overlay && fecharModal && botaoLogin) {
    botaoLogin.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.classList.add("ativo");

      // Foca no primeiro input do modal
      const primeiroInput = overlay.querySelector("input");
      if (primeiroInput) primeiroInput.focus();
    });

    // Fecha o modal ao clicar no X
    fecharModal.addEventListener("click", () => overlay.classList.remove("ativo"));

    // Fecha o modal ao clicar fora da área do modal
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("ativo");
    });

    // Fecha o modal ao apertar a tecla Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay.classList.remove("ativo");
    });
  }

  /* ============================================================
     MATRÍCULA / FORMULÁRIO DE CADASTRO
     ============================================================ */
  const form = document.querySelector(".formulario");
  const confirmarBtn = document.querySelector(".confirmar");

  if (!form || !confirmarBtn) return;

  const modalSucesso = document.getElementById("modalSucesso");
  const modalErro = document.getElementById("modalErro");
  const fecharModais = document.querySelectorAll(".fechar-modal");

  // Função para mostrar modal específico
  function mostrarModal(modal) {
    modal.classList.add("ativo");
  }

  // Função para fechar todos os modais de sucesso/erro
  function fecharTodosModais() {
    modalSucesso.classList.remove("ativo");
    modalErro.classList.remove("ativo");
  }

  // Eventos de fechar modais
  fecharModais.forEach((btn) =>
    btn.addEventListener("click", fecharTodosModais)
  );

  window.addEventListener("click", (e) => {
    if (e.target === modalSucesso || e.target === modalErro) fecharTodosModais();
  });

  /* ============================================================
     VALIDAÇÃO DO FORMULÁRIO
     ============================================================ */
  confirmarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = form.querySelector('input[placeholder="Nome completo"]').value.trim();
    const cpf = form.querySelector('input[placeholder="CPF"]').value.trim();
    const email = form.querySelector('input[placeholder="Email"]').value.trim();
    const senha = form.querySelector('input[placeholder="Crie uma senha"]').value.trim();
    const confirmarSenha = form.querySelector('input[placeholder="Confirme sua senha"]').value.trim();

    // Validações
    const cpfValido = /^\d{11}$/.test(cpf.replace(/\D/g, ""));
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !cpf || !email || !senha || !confirmarSenha || !cpfValido || !emailValido || senha !== confirmarSenha) {
      mostrarModal(modalErro);
      return;
    }

    // Se tudo estiver correto, mostra modal de sucesso
    mostrarModal(modalSucesso);

    // Redireciona após 2s
    setTimeout(() => {
      fecharTodosModais();
      window.location.href = "/StarterCash/pages/home.html";
    }, 2000);
  });
});
