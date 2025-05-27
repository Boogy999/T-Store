// Header scroll effect
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll event
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                mainNav.classList.remove('active');
                const menuIcon = document.querySelector('.mobile-menu-btn i');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
            
            // Update active class
            document.querySelectorAll('#main-nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Update cart count from localStorage
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Initial cart count update
    updateCartCount();

    // Listen for storage events to update cart count across tabs
    window.addEventListener('storage', function(event) {
        if (event.key === 'cart') {
            updateCartCount();
        }
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'HomePage.html';
    document.querySelectorAll('#main-nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && linkHref === 'HomePage.html') ||
            (currentPage === 'HomePage.html' && linkHref === 'index.html')) {
            link.classList.add('active');
            // Add animation to active link
            link.style.animation = 'pulse 2s infinite';
        }
    });

    // Add animation for cart icon
    const cartIcon = document.querySelector('.cart-icon a');
    if (cartIcon) {
        setInterval(() => {
            cartIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }
});
