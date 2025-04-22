import api from "@/utils/api";

export default function logout() {
  return api.post("/logout");
}
