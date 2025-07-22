import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:18080';

export const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_BASE}/add`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getSummary = async () => {
  try {
    const response = await axios.get(`${API_BASE}/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
};

export const undoTransaction = async () => {
  try {
    const response = await axios.post(`${API_BASE}/undo`);
    return response.data;
  } catch (error) {
    console.error('Error undoing transaction:', error);
    throw error;
  }
};