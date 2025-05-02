import api from "@/utils/api";

export default function fetchUser() {
  return api.get("/api/user");
}
