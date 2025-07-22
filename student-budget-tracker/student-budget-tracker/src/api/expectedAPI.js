import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:18080';

export const addExpectedExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_BASE}/expected/add`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error adding expected expense:', error);
    throw error;
  }
};

export const getUpcomingExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE}/expected/upcoming`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming expenses:', error);
    throw error;
  }
};

export const processExpectedExpenses = async () => {
  try {
    const response = await axios.post(`${API_BASE}/expected/process`);
    return response.data;
  } catch (error) {
    console.error('Error processing expected expenses:', error);
    throw error;
  }
};