// ======== LOBBY.JS ========

// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  const inputNome = document.querySelector("#nomeAvatar");
  const btnSalvar = document.querySelector("#saveAvatarName"); // Corrigido ID
  const avatarNome = document.querySelector(".avatar-name");

  // ======== MOSTRAR OU NÃO O MODAL ========
  let nomeSalvo = localStorage.getItem("avatarNome");

  if (!nomeSalvo) {
    overlay.classList.add("show");
  } else {
    avatarNome.textContent = nomeSalvo;
  }

  // ======== SALVAR O NOME DO AVATAR ========
  btnSalvar.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    if (nome.length < 2) {
      alert("Escolha um nome com pelo menos 2 letras!");
      return;
    }

    // Salva o nome
    localStorage.setItem("avatarNome", nome);

    // Mostra o nome no lobby
    avatarNome.textContent = nome;

    // Fecha o modal
    overlay.classList.remove("show");
  });

  // ======== THREE.JS CONFIG ========
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    320 / 400,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  const canvasContainer = document.querySelector(".avatar-canvas");
  const width = canvasContainer.clientWidth;
  const height = canvasContainer.clientHeight;
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasContainer.appendChild(renderer.domElement);

  // ======== ILUMINAÇÃO ========
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(2, 2, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040, 1.5);
  scene.add(ambient);

  // ======== AVATAR 3D TEMPORÁRIO ========
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    roughness: 0.3,
    metalness: 0.7,
  });
  const avatar = new THREE.Mesh(geometry, material);
  scene.add(avatar);

  camera.position.z = 3;

  // ======== ANIMAÇÃO ========
  function animate() {
    requestAnimationFrame(animate);
    avatar.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // ======== REDIMENSIONAMENTO ========
  window.addEventListener("resize", () => {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
