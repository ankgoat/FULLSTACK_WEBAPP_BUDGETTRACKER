import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:18080';

export const getCategorySummary = async () => {
  try {
    const response = await axios.get(`${API_BASE}/summary/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category summary:', error);
    throw error;
  }
};