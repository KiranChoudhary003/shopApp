import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const raw = window.localStorage.getItem("auth");
  if (raw) {
    try {
      const auth = JSON.parse(raw);
      if (auth?.accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    } catch {
      // ignore
    }
  }
  return config;
});

