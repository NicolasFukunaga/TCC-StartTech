// accessibility.js
window.setupAccessibility = function () {
    const accBtn = document.getElementById('accessibility-btn');
    const contrastBtn = document.getElementById('contrast-btn');

    if (accBtn) {
        accBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-font');
            localStorage.setItem('sc_largeFont', document.body.classList.contains('large-font'));
        });
    }
    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            localStorage.setItem('sc_highContrast', document.body.classList.contains('high-contrast'));
        });
    }
    if (localStorage.getItem('sc_largeFont') === 'true') document.body.classList.add('large-font');
    if (localStorage.getItem('sc_highContrast') === 'true') document.body.classList.add('high-contrast');
};
