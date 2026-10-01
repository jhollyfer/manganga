import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
  withCredentials: true,
  headers: {
    "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
});

API.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export { API };
