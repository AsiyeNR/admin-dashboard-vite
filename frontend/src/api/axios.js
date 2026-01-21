import axios from "axios"

const api = axios.create({
  baseURL: "https://RENDER_BACKEND_URL.onrender.com"
})

export default api
