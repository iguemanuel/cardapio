const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('chekout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const adressInput = document.getElementById('address');
const adressWarn = document.getElementById('address-warn');

let cart = [];

//abrir modal de carrinho
cartBtn.addEventListener('click', function() {
    cartModal.style.display = 'flex';   
    updateCartModal(); 
});

cartModal.addEventListener('click', function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = 'none';
    }
})  

closeModalBtn.addEventListener('click', function() {
    cartModal.style.display = 'none';
})

menu.addEventListener('click', function(event) {
    let parentButton = event.target.closest('.add-to-cart-btn');

    if(parentButton){
        const name = parentButton.getAttribute('data-name');
        const price = parseFloat(parentButton.getAttribute('data-price'));

        addToCart(name, price);
    }
})

function addToCart(name, price) {
    const exitingItem = cart.find(item => item.name === name);

    if(exitingItem) {
        exitingItem.quantidade += 1;
        return;
    }else {
    
    cart.push({
        name: name,
        price: price,
        quantidade: 1
    })
    }

    updateCartModal();

}


function updateCartModal(){
 
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemELemnt = document.createElement('div');
        cartItemELemnt.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemELemnt.innerHTML = `
        <div class='flex items-center justify-between'>
            <div>
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantidade}</p>
                    <p class="font-medium">R$ ${item.price.toFixed(2)}</p>
                </div>
                
                <button class="remove-btn text-red-500" data-name="${item.name}">Remover</button>

            </div>
        </div>    
        `

        total += item.price * item.quantidade;

        cartItemsContainer.appendChild(cartItemELemnt);

    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    cartCounter.innerText = cart.length;

}

cartItemsContainer.addEventListener('click', function(event) {
    if(event.target.classList.contains('remove-btn')) {
        const name = event.target.getAttribute('data-name');
        const item = cart.find(item => item.name === name);
        item.quantidade -= 1;

        if(item.quantidade === 0) {
            cart = cart.filter(item => item.name !== name);
        }

        updateCartModal();
    }
})

adressInput.addEventListener('input', function(event) {
    let inputValue = event.target.value;

    if(inputValue !== '') {
        adressWarn.classList.add('hidden');
    }

}) 

checkoutBtn.addEventListener('click', function() {

 const isOpen = checkIsOpen();
    if(!isOpen) {
     Toastify({
         text: "Restaurante Fechado, volte mais tarde!",
         duration: 3000,
         close: true,
         gravity: "top", // `top` or `bottom`
         position: "right", // `left`, `center` or `right`
         stopOnFocus: true, // Prevents dismissing of toast on hover
         style: {
           background: "#ee4444",
         },
       }).showToast();
     return;
    }

    if(cart.length === 0) return;
    if(adressInput.value === '') {
        adressWarn.classList.remove('hidden');
        return;
    }

    const cartItems = cart.map((item) => {
        return `${item.name} - Qtd: ${item.quantidade} Preço: R$ ${item.price.toFixed(2)} `;
    }).join('\n');
    
    // Obtém o total do carrinho
    const total = cartTotal.textContent;

    // Concatena a mensagem e os itens do carrinho, com quebras de linha
    const message = encodeURIComponent(`Boa noite! gostaria de fazer um pedido: \n${cartItems}\nEndereço: ${adressInput.value}\nTotal: ${total}`);
    const phone = "5542991583814";
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    cart = [];
    updateCartModal();
});



function checkIsOpen(){
    const data = new Date();
    const hour = data.getHours();

    return hour >= 18 && hour <= 23;

}

const spanItem = document.getElementById('date-span');
const isOpen = checkIsOpen();

if(isOpen) {
    spanItem.classList.remove('bg-red-500');
    spanItem.classList.add('bg-green-500');
} else {
    spanItem.classList.remove('bg-green-500');
    spanItem.classList.add('bg-red-500');
}