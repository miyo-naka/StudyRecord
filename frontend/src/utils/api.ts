import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80",
  withCredentials: true,
});

export default api;
