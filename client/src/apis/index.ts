import axios from "axios";

const baseUrl = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
        "Content-Type": 'application/json',
    }
})

export default baseUrl;