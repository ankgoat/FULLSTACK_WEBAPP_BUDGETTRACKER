// src/api/summaryAPI.js
const BASE = '';

export async function getSummary() {
  const res = await fetch(`${BASE}/summary`);
  if (!res.ok) throw new Error(`Summary request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

// Some pages import getCategorySummary. Provide it as a thin wrapper.
export async function getCategorySummary() {
  const data = await getSummary();
  return data?.byCategory ?? [];
}
