import axios from "axios";

export const publicInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

export const privateInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const uploadInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

privateInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  return addTokenToHeaders(config, token);
});

uploadInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  return addTokenToHeaders(config, token);
});

const addTokenToHeaders = (config, token) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const refreshAccessToken = async () => {
  try {
    const response = await publicInstance.post("/auth/refresh", null, {
      withCredentials: true,
    });
    console.log(response);
    const newAccessToken = response.data.token;
    localStorage.setItem("token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

const retryRequest = async (error, instance) => {
  if (error.response && error.response.status === 401 && !error.config._retry) {
    error.config._retry = true;
    const newToken = await refreshAccessToken();
    if (newToken) {
      return instance.request(error.config);
    }
  }
  return Promise.reject(error);
};

privateInstance.interceptors.response.use(undefined, (error) =>
  retryRequest(error, privateInstance)
);
uploadInstance.interceptors.response.use(undefined, (error) =>
  retryRequest(error, uploadInstance)
);
