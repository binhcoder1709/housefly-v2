import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const musicApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}/songs`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const suggestApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}/suggests`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseUrl;
