export function getAuth() {
  const raw = window.localStorage.getItem("auth");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setAuth(auth) {
  window.localStorage.setItem("auth", JSON.stringify(auth));
}

export function clearAuth() {
  window.localStorage.removeItem("auth");
}

