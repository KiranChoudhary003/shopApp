import { api } from "./client";

export async function placeOrder(payload) {
  const { data } = await api.post("/api/orders", payload);
  return data;
}

export async function myOrders() {
  const { data } = await api.get("/api/orders/my");
  return data;
}

export async function adminOrders() {
  const { data } = await api.get("/api/admin/orders");
  return data;
}

export async function adminUpdateOrderStatus(id, status) {
  const { data } = await api.put(`/api/admin/orders/${encodeURIComponent(id)}/status`, { status });
  return data;
}

