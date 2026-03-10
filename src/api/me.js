import { api } from "./client";

export async function getMe() {
  const { data } = await api.get("/api/me");
  return data;
}

export async function getAddresses() {
  const { data } = await api.get("/api/me/addresses");
  return data;
}

export async function addAddress(payload) {
  const { data } = await api.post("/api/me/addresses", payload);
  return data;
}

export async function setDefaultAddress(addressId) {
  const { data } = await api.put(`/api/me/addresses/${encodeURIComponent(addressId)}/default`);
  return data;
}

export async function removeAddress(addressId) {
  const { data } = await api.delete(`/api/me/addresses/${encodeURIComponent(addressId)}`);
  return data;
}

export async function getWishlist() {
  const { data } = await api.get("/api/me/wishlist");
  return data;
}

export async function toggleWishlist(productId) {
  const { data } = await api.post("/api/me/wishlist/toggle", { productId });
  return data;
}

