document.addEventListener("DOMContentLoaded", () => {
  const rpmAvatar = document.querySelector("#rpmAvatar");
  const overlay = document.querySelector("#nameOverlay");
  const inputNome = document.querySelector("#nomeAvatar");
  const btnSalvar = document.querySelector("#saveAvatarName");

  // ======== CRIAR ELEMENTO DE NOME SOBRE O AVATAR ========
  const nomeEl = document.createElement("h2");
  nomeEl.className = "avatar-nome";
  document.body.appendChild(nomeEl);

  // ======== FUNÇÃO PARA ATUALIZAR NOME ========
  const atualizarNome = (nome) => {
    nomeEl.textContent = nome;
    localStorage.setItem("avatarNome", nome);
  };

  // ======== MOSTRAR OU PEDIR NOME ========
  const nomeSalvo = localStorage.getItem("avatarNome");
  if (nomeSalvo) {
    atualizarNome(nomeSalvo);
  } else {
    overlay.classList.add("show");
  }

  // ======== SALVAR NOME NO MODAL ========
  const salvarNome = () => {
    const nome = inputNome.value.trim();
    if (nome.length < 2) {
      alert("Escolha um nome com pelo menos 2 letras!");
      return;
    }
    atualizarNome(nome);
    overlay.classList.remove("show");
  };

  btnSalvar.addEventListener("click", salvarNome);
  inputNome.addEventListener("keydown", (e) => {
    if (e.key === "Enter") salvarNome();
  });

  // ======== EDITAR NOME AO CLICAR ========
  nomeEl.addEventListener("click", () => {
    inputNome.value = nomeEl.textContent;
    overlay.classList.add("show");
    inputNome.focus();
  });

  // ======== READY PLAYER ME ========
  const avatarSalvo = localStorage.getItem("avatarURL");
  if (avatarSalvo) {
    rpmAvatar.src = `https://readyplayer.me/render?model=${encodeURIComponent(avatarSalvo)}&scene=fullbody`;
  } else {
    abrirEditor();
  }

  function abrirEditor() {
    rpmAvatar.src = "https://readyplayer.me/avatar?frameApi";
    rpmAvatar.style.display = "block";
  }

  // ======== EVENTOS DO READY PLAYER ME ========
  window.addEventListener("message", (event) => {
    if (event.origin !== "https://readyplayer.me") return;
    const data = event.data;

    if (data.eventName === "v1.frame.ready") {
      rpmAvatar.contentWindow.postMessage(
        JSON.stringify({
          target: "readyplayerme",
          type: "subscribe",
          eventName: "v1.avatar.exported",
        }),
        "https://readyplayer.me"
      );
    }

    if (data.source === "readyplayerme" && data.eventName === "v1.avatar.exported") {
      const avatarURL = data.data.url;
      localStorage.setItem("avatarURL", avatarURL);
      rpmAvatar.src = `https://readyplayer.me/render?model=${encodeURIComponent(avatarURL)}&scene=fullbody`;
    }
  });
});
