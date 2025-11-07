// shop.js
window.SHOP_ITEMS = [
    { id: 'shirt-red', title: 'Camiseta Vermelha', price: 1200, slot: 'top', img: 'assets/img/shop-items/shirt-red.png' },
    { id: 'jeans-blue', title: 'Calça Jeans', price: 900, slot: 'bottom', img: 'assets/img/shop-items/jeans-blue.png' },
    { id: 'headset', title: 'Fone Neon', price: 3200, slot: 'access', img: 'assets/img/shop-items/headset.png' }
];

window.renderShop = function () {
    const cont = document.getElementById('shopList'); if (!cont) return;
    cont.innerHTML = '';
    const user = ensureUser();
    SHOP_ITEMS.forEach(item => {
        const owned = (user.owned || []).includes(item.id);
        const card = document.createElement('div'); card.className = 'shop-card';
        card.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center">
        <img src="${item.img}" alt="${item.title}" style="width:68px;height:68px;object-fit:cover;border-radius:8px">
        <div>
          <div style="font-weight:700">${item.title}</div>
          <div class="price">Preço: ${item.price} Coins</div>
        </div>
      </div>
      <div class="shop-actions">
        <button class="btn btn-primary" ${owned ? 'disabled' : ''} data-buy="${item.id}">${owned ? 'Comprado' : 'Comprar'}</button>
      </div>
    `;
        cont.appendChild(card);
    });
    cont.querySelectorAll('[data-buy]').forEach(b => {
        b.addEventListener('click', e => {
            const id = e.currentTarget.getAttribute('data-buy');
            purchaseItem(id);
        });
    });
};

function purchaseItem(id) {
    const user = ensureUser();
    const item = SHOP_ITEMS.find(i => i.id === id);
    if (!item) return alert('Item inválido');
    if (user.coins < item.price) return alert('Moedas insuficientes');
    user.coins -= item.price;
    user.owned = user.owned || [];
    if (!user.owned.includes(id)) user.owned.push(id);
    storage.set('sc_user', user);
    populateHeader();
    renderShop();
    alert('Comprado com sucesso!');
}
