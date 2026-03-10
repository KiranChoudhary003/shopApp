import { api } from "./client";

export async function signup(payload) {
  const { data } = await api.post("/api/auth/signup", payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
}

