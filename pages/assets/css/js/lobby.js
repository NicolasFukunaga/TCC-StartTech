// lobby.js - lobby helpers
window.setupAvatarUpload = function () {
    const input = document.getElementById('avatarUpload');
    if (!input) return;
    input.addEventListener('change', e => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const u = ensureUser();
            u.avatar = ev.target.result;
            storage.set('sc_user', u);
            populateHeader();
        };
        reader.readAsDataURL(f);
    });
};

window.setupLobbyPlay = function () {
    const play = document.getElementById('playBtn');
    if (!play) return;
    const done = storage.get('sc_done') || [];
    if (done.length > 0) {
        play.disabled = false;
    } else {
        play.disabled = true;
    }
};
