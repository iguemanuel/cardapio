const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCount = document.getElementById('cart-count');
const adressInput = document.getElementById('address');
const adressWarn = document.getElementById('address-warn');

//abrir modal de carrinho
cartBtn.addEventListener('click', function() {
    cartModal.style.display = 'flex';    
});

cartModal.addEventListener('click', function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = 'none';
    }
})  