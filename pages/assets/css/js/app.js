/* app.js - inicializa e conecta módulos simples */
importScripts = () => { }; // (no-op if environment doesn't support)

const storage = {
    get(k, fallback = null) { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : fallback } catch (e) { return fallback } },
    set(k, v) { localStorage.setItem(k, JSON.stringify(v)) },
    remove(k) { localStorage.removeItem(k) }
};

// ensure user exists
function ensureUser() {
    let u = storage.get('sc_user');
    if (!u) {
        u = { name: 'Jogador', email: '', avatar: 'assets/img/userDefault.png', coins: 12900, xp: 120, level: 1, owned: [], battlepassLevel: 1 };
        storage.set('sc_user', u);
    }
    return u;
}

// update header info if present
function populateHeader() {
    const u = ensureUser();
    document.querySelectorAll('.user-name').forEach(el => el.textContent = u.name || 'Jogador');
    document.querySelectorAll('.user-coins').forEach(el => el.textContent = u.coins);
    document.querySelectorAll('.user-xp').forEach(el => el.textContent = u.xp);
    document.querySelectorAll('.user-level').forEach(el => el.textContent = u.level);
    document.querySelectorAll('.pfp').forEach(i => i.src = u.avatar || 'assets/img/userDefault.png');
}

// init
document.addEventListener('DOMContentLoaded', () => {
    ensureUser();
    populateHeader();
    try { // load modules if exist
        if (window.setupAccessibility) window.setupAccessibility();
        if (window.handleAuthForms) window.handleAuthForms();
        if (window.setupCoursePage) window.setupCoursePage();
        if (window.renderShop) window.renderShop();
        if (window.renderBattlepass) window.renderBattlepass();
        if (window.setupLobbyPlay) window.setupLobbyPlay();
        if (window.setupAvatarUpload) window.setupAvatarUpload();
    } catch (e) { console.error(e) }
});
