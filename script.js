// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// Cart Sidebar Toggle
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.add('hidden');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    if (e.target === cartSidebar) {
        cartSidebar.classList.add('hidden');
    }
});

// Add to cart animation
const addToCartButtons = document.querySelectorAll('.product-card button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cartBadge = document.querySelector('.cart-badge');
        let count = parseInt(cartBadge.textContent);
        cartBadge.textContent = count + 1;
        
        // Create flying item effect
        const productCard = this.closest('.product-card');
        const productImg = productCard.querySelector('img').cloneNode(true);
        productImg.style.position = 'fixed';
        productImg.style.width = '50px';
        productImg.style.height = '50px';
        productImg.style.objectFit = 'contain';
        productImg.style.borderRadius = '4px';
        productImg.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        productImg.style.zIndex = '1000';
        
        const rect = productCard.getBoundingClientRect();
        productImg.style.left = rect.left + 'px';
        productImg.style.top = rect.top + 'px';
        
        document.body.appendChild(productImg);
        
        const cartRect = cartBtn.getBoundingClientRect();
        const cartX = cartRect.left + cartRect.width/2 - 25;
        const cartY = cartRect.top + cartRect.height/2 - 25;
        
        const animation = productImg.animate([
            { 
                left: rect.left + 'px',
                top: rect.top + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            { 
                left: cartX + 'px',
                top: cartY + 'px',
                opacity: 0.5,
                transform: 'scale(0.5)'
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
        });
        
        animation.onfinish = () => {
            productImg.remove();
            cartBadge.classList.add('animate-ping');
            setTimeout(() => {
                cartBadge.classList.remove('animate-ping');
            }, 500);
        };
    });
});