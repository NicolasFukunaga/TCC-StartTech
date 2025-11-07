// battlepass.js
window.renderBattlepass = function () {
    const fill = document.getElementById('bpFill');
    const levelLabel = document.getElementById('bpLevel');
    if (!fill || !levelLabel) return;
    const u = ensureUser();
    const pct = Math.min(100, (u.xp % 200) / 2); // simple mapping
    fill.style.width = pct + '%';
    levelLabel.textContent = u.battlepassLevel || 1;
};
