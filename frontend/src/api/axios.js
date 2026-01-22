import axios from "axios"

const api = axios.create({
  baseURL: "https://admin-dashboard-vite-t14x.onrender.com"
})

// AUTO TOKEN ATTACH
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
