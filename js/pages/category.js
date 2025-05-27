// Category page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter products
            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-options');
    
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const productGrid = document.querySelector('.product-grid');
        const products = Array.from(productCards);
        
        // Sort products based on selected option
        products.sort((a, b) => {
            if (sortValue === 'price-low') {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
                return priceA - priceB;
            } else if (sortValue === 'price-high') {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
                return priceB - priceA;
            } else if (sortValue === 'newest') {
                // For demo purposes, we'll just check if it has a "New" tag
                const isNewA = a.querySelector('.product-tag')?.textContent === 'New' ? 1 : 0;
                const isNewB = b.querySelector('.product-tag')?.textContent === 'New' ? 1 : 0;
                return isNewB - isNewA;
            } else {
                // Featured - default order
                return 0;
            }
        });
        
        // Remove all products from the grid
        products.forEach(product => {
            productGrid.removeChild(product);
        });
        
        // Add sorted products back to the grid
        products.forEach(product => {
            productGrid.appendChild(product);
        });
    });
});
