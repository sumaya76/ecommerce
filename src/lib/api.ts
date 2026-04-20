const API_BASE = 'http://localhost:3000';

// Fetch products
export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

// Fetch single product
export const fetchProduct = async (id: string) => {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
};

// Add to cart (mock)
export const addToCart = async (productId: string, quantity: number) => {
  // POST to /carts endpoint
};

// Auth endpoints
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const registerUser = async (email: string, password: string, name: string) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return res.json();
};

