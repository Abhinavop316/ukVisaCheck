import axios from "axios";

const getBaseUrl = () => {
  let url = (import.meta.env.VITE_API_URL || "http://localhost:3000/api").trim();
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  if (!url.endsWith("/api")) {
    url = `${url}/api`;
  }
  return url;
};

export const API_BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
