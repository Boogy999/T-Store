// API Configuration
const API_CONFIG = {
    baseURL: 'https://api.trendytees.com/v1', // Replace with your actual API endpoint
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// API Error Handler
class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'APIError';
    }
}

// API Service Class
class APIService {
    static async request(endpoint, options = {}) {
        try {
            const url = `${API_CONFIG.baseURL}${endpoint}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...API_CONFIG.headers,
                    ...options.headers
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new APIError(data.message || 'API request failed', response.status, data);
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Products API
    static async getProducts(category, filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.request(`/products/${category}?${queryParams}`);
    }

    static async getProductDetails(productId) {
        return this.request(`/products/${productId}`);
    }

    // Cart API
    static async getCart() {
        return this.request('/cart');
    }

    static async addToCart(productId, quantity = 1) {
        return this.request('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity })
        });
    }

    static async updateCartItem(itemId, quantity) {
        return this.request(`/cart/items/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    }

    static async removeFromCart(itemId) {
        return this.request(`/cart/items/${itemId}`, {
            method: 'DELETE'
        });
    }

    // User API
    static async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    static async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // Orders API
    static async createOrder(orderData) {
        return this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    static async getOrders() {
        return this.request('/orders');
    }

    static async getOrderDetails(orderId) {
        return this.request(`/orders/${orderId}`);
    }

    // Newsletter API
    static async subscribeNewsletter(email) {
        return this.request('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    }

    // Contact Form API
    static async submitContactForm(formData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }

    // Product Reviews API
    static async getProductReviews(productId) {
        return this.request(`/products/${productId}/reviews`);
    }

    static async submitProductReview(productId, reviewData) {
        return this.request(`/products/${productId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }

    // Search API
    static async searchProducts(query, filters = {}) {
        const queryParams = new URLSearchParams({
            q: query,
            ...filters
        }).toString();
        return this.request(`/search?${queryParams}`);
    }

    // Wishlist API
    static async getWishlist() {
        return this.request('/wishlist');
    }

    static async addToWishlist(productId) {
        return this.request('/wishlist/add', {
            method: 'POST',
            body: JSON.stringify({ productId })
        });
    }

    static async removeFromWishlist(productId) {
        return this.request(`/wishlist/${productId}`, {
            method: 'DELETE'
        });
    }
}

// Export the API Service
export default APIService;
