// auth.js - handles form submits for login/signup (simulated)
window.handleAuthForms = function () {
    document.querySelectorAll('form').forEach(f => {
        f.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(f);
            const name = data.get('name') || data.get('nome') || 'Jogador';
            const email = data.get('email') || data.get('email-sign') || '';
            const user = ensureUser();
            user.name = name || user.name;
            if (email) user.email = email;
            storage.set('sc_user', user);
            setTimeout(() => window.location.href = 'lobby.html', 300);
        });
    });
};
