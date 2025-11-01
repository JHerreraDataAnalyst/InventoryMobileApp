import axios from 'axios';

// ✅ USA ESTA IP QUE ENCONTRASTE
const API_BASE_URL = 'http://192.168.1.100:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// El resto del código permanece igual...
export const productAPI = {
  getProducts: () => api.get('/products/'),
  searchProducts: (query) => api.get(`/products/search/?q=${query}`),
  searchByBarcode: (barcode) => api.get(`/products/search/?barcode=${barcode}`),
  getLowStock: () => api.get('/products/low_stock/'),
};

export const saleAPI = {
  getTodaySales: () => api.get('/sales/today_sales/'),
  quickSale: (saleData) => api.post('/sales/quick_sale/', saleData),
  getTopProducts: (days = 30) => api.get(`/sales/top_products/?days=${days}`),
};

export const clientAPI = {
  searchClients: (query) => api.get(`/clients/search/?q=${query}`),
};

export default api;