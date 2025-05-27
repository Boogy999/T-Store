// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showNewsletterMessage('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNewsletterMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            // Success response
            showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            
            // Store subscription in localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
            }
        }, 1000);
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNewsletterMessage(message, type) {
    const container = document.querySelector('.newsletter');
    if (!container) return;

    // Remove any existing message
    const existingMessage = container.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `newsletter-message ${type}`;
    messageElement.textContent = message;

    // Add message to container
    container.appendChild(messageElement);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => messageElement.remove(), 300);
    }, 3000);
}
