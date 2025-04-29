import api from "@/utils/api";

export default async function Login(email: string, password: string) {
  await api.get("/sanctum/csrf-cookie");

  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  if (csrfToken) {
    api.defaults.headers.common["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
  }

  return api.post("/login", { email, password });
}
