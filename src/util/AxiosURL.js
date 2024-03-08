import axios from "axios";
import Cookies from "js-cookie";
export const API_BASE_URL = "https://sportify-plyj.onrender.com"


const apiHit = axios.create({
    baseURL: API_BASE_URL,
  });

  apiHit.interceptors.request.use(
    (config) => {
      if (config.method === "get"|| config.method === "post" || config.method === "put" || config.method === "delete") {
        // Get the token from Cookies or sessionStorage
        const token = Cookies.get("userToken") || localStorage.getItem("userToken");
  
        // Attach the token to the headers if it exists
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiHit