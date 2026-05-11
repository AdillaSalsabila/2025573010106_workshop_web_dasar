// 1. Data Produk
const products = [
    { id: 1, name: "IBook", price: 15000000, img: "https://i.pinimg.com/736x/1d/67/de/1d67de17fa53d626e1ca562eb3159df3.jpg" },
    { id: 2, name: "Mouse Aero", price: 250000, img: "https://i.pinimg.com/736x/fd/ee/2b/fdee2b2edf4a32eef4669722a51df99a.jpg" },
    { id: 3, name: "Keyboard ", price: 850000, img: "https://i.pinimg.com/736x/c9/8a/06/c98a06b7ed0177b7558d9e478f2f93e3.jpg" },
    { id: 4, name: "Monitor PXC279 Wave", price: 4500000, img: "https://i.pinimg.com/736x/ae/f4/b7/aef4b724f05fd8e64de84e9083653781.jpg" },
    { id: 5, name: "Headset Studio", price: 1200000, img: "https://i.pinimg.com/736x/34/3c/2f/343c2f918602d5c9734753b7301a10d3.jpg" }
];

// 2. State Keranjang
let cart = [];

// 3. Render Daftar Produk
const renderProducts = () => {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = products.map(p => `
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <img src="${p.img}" alt="${p.name}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg">${p.name}</h3>
                <p class="text-blue-600 font-semibold mb-4">Rp ${p.price.toLocaleString()}</p>
                <button onclick="addToCart(${p.id})" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Tambah ke Keranjang</button>
            </div>
        </div>
    `).join('');
};

// 4. Fungsi Utama Keranjang
window.addToCart = (id) => {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
};

window.updateQty = (id, change) => {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeItem(id);
    }
    renderCart();
};

window.removeItem = (id) => {
    cart = cart.filter(c => c.id !== id);
    renderCart();
};

// 5. Render Ulang Tampilan Keranjang (Requirement 5)
const renderCart = () => {
    const cartContainer = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const totalDisplay = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-gray-500 text-sm italic">Keranjang kosong.</p>';
        badge.classList.add('hidden');
        totalDisplay.innerText = "Rp 0";
        return;
    }

    // Update Badge
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    badge.innerText = totalItems;
    badge.classList.remove('hidden');

    // Render Items
    cartContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center border-b pb-2">
            <div class="flex-1">
                <h4 class="text-sm font-bold">${item.name}</h4>
                <p class="text-xs text-gray-500">Rp ${item.price.toLocaleString()} x ${item.qty}</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="updateQty(${item.id}, -1)" class="bg-gray-200 px-2 rounded">-</button>
                <button onclick="updateQty(${item.id}, 1)" class="bg-gray-200 px-2 rounded">+</button>
                <button onclick="removeItem(${item.id})" class="text-red-500 ml-2">🗑️</button>
            </div>
        </div>
    `).join('');

    // Update Total Price
    const totalValue = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    totalDisplay.innerText = `Rp ${totalValue.toLocaleString()}`;
};

// 6. Checkout (Requirement 6)
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    
    const summary = cart.map(i => `${i.name} (x${i.qty})`).join('\n');
    const total = document.getElementById('total-price').innerText;
    
    alert(`Ringkasan Pesanan:\n\n${summary}\n\nTotal Bayar: ${total}`);
    cart = [];
    renderCart();
});

// Jalankan saat load
renderProducts();