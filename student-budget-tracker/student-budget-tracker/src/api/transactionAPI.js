// Transaction API — uses Vite dev proxy to hit http://localhost:18080
const BASE = '';

async function http(path, init = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Transactions request failed: ${res.status} ${res.statusText}`);
  }
  return res.status === 204 ? null : res.json();
}

export function getTransactions() {
  return http('/transactions');
}

export function createTransaction(tx) {
  // backend route: POST /transactions/add
  return http('/transactions/add', {
    method: 'POST',
    body: JSON.stringify(tx),
  });
}

export function undoTransaction(id) {
  // backend route: POST /transactions/undo
  return http('/transactions/undo', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

// Export alias for backward compatibility
export { createTransaction as addTransaction };