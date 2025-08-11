// src/api/client.js
export const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function http(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${path}: ${text}`)
  }

  return res.status === 204 ? null : res.json()
}
