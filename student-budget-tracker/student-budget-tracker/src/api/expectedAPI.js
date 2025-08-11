// src/api/expectedAPI.js
const BASE = '';

export const addExpectedExpense      = (data) => fetch(`${BASE}/expected/add`,      { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }).then(r => r.json());
export const getUpcomingExpenses     = ()      => fetch(`${BASE}/expected/upcoming`).then(r => r.json());
export const processExpectedExpenses = ()      => fetch(`${BASE}/expected/process`,  { method:'POST' }).then(r => r.json());
