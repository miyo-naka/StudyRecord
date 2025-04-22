import api from "@/utils/api";

export default async function Login(email: string, password: string) {
  await api.get("/sanctum/csrf-cookie"); // CSRF保護

  return api.post("/login", { email, password });
}
