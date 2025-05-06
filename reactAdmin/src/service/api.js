const API_URL = 'http://localhost:4000/api';

export const getTotals = async () => {
    const responses = await Promise.all([
        fetch(`${API_URL}/products`).then(res => res.json()),
        fetch(`${API_URL}/users`).then(res => res.json()),
        fetch(`${API_URL}/categories`).then(res => res.json())
    ]);
    return {
        totalProducts: responses[0].count,
        totalUsers: responses[1].count,
        totalCategories: responses[2].count
    };
};

export const getLastCreated = async () => {
    const responses = await Promise.all([
        fetch(`${API_URL}/products/last`).then(res => res.json()),
        fetch(`${API_URL}/users/last`).then(res => res.json())
    ]);
    return { lastProduct: responses[0], lastUser: responses[1] };
};

export const getProductsList = async () => {
    const response = await fetch(`${API_URL}/products`).then(res => res.json());
    return response.products;
};
