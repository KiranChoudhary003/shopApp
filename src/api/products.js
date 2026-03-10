import { api } from "./client";

export async function readProducts(params) {
  const { data } = await api.get("/api/products", { params });
  // New backend returns { items, meta } for paginated listing.
  // Some older callers might still expect an array.
  return Array.isArray(data) ? data : data?.items || [];
}

export async function readProductsPaged(params) {
  const { data } = await api.get("/api/products", { params });
  return data;
}

export async function findProduct(id) {
  const { data } = await api.get(`/api/products/${encodeURIComponent(id)}`);
  return data;
}

export async function removeProduct(id) {
  const { data } = await api.delete(`/api/products/${encodeURIComponent(id)}`);
  return data;
}

export async function addProduct(payload) {
  const { data } = await api.post("/api/products", payload);
  return data;
}

export async function updateProduct(id, payload) {
  const { data } = await api.put(`/api/products/${encodeURIComponent(id)}`, payload);
  return data;
}

