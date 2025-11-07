// course.js - course interactions
window.setupCoursePage = function () {
    const btn = document.getElementById('completeLesson');
    if (!btn) return;
    btn.addEventListener('click', () => {
        // reward
        const user = ensureUser();
        user.coins = (user.coins || 0) + 300;
        user.xp = (user.xp || 0) + 60;
        storage.set('sc_user', user);
        // mark done
        const done = storage.get('sc_done') || [];
        if (!done.includes('poupanca-1')) { done.push('poupanca-1'); storage.set('sc_done', done); }
        // feedback and redirect
        btn.disabled = true; btn.textContent = 'Concluído ✓';
        setTimeout(() => window.location.href = 'lobby.html', 900);
    });
};
