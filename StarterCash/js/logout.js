document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutOverlay = document.getElementById("logoutOverlay");
  const cancelLogout = document.getElementById("cancelLogout");
  const confirmLogout = document.getElementById("confirmLogout");
  const logoutMessage = document.getElementById("logoutMessage");

  if (!logoutBtn) return;

  // Abre o modal de confirmação
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logoutOverlay.classList.add("show");
  });

  // Cancela o logout
  cancelLogout.addEventListener("click", () => {
    logoutOverlay.classList.remove("show");
  });

  // Confirma o logout
  confirmLogout.addEventListener("click", () => {
    logoutOverlay.classList.remove("show");
    logoutMessage.classList.add("show");

    // Limpa dados locais
    localStorage.clear();
    sessionStorage.clear();

    // Redireciona após 2 segundos
    setTimeout(() => {
      window.location.href = "/StarterCash/index.html";
    }, 2000);
  });
});
