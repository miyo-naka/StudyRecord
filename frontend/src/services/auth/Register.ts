import api from "@/utils/api";

export default async function Register(
  name: string,
  email: string,
  password: string
) {
  await api.get("/sanctum/csrf-cookie");
  return api.post("/register", { name, email, password });
}
