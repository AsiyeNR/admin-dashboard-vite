import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000"
})

// REQUEST TOKEN
api.interceptors.request.use(config => {

  const token = localStorage.getItem("accessToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// RESPONSE AUTO REFRESH
api.interceptors.response.use(

  response => response,

  async error => {

    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refreshToken")

      try {

        const res = await axios.post("http://localhost:5000/api/auth/refresh", {
          refreshToken
        })

        localStorage.setItem("accessToken", res.data.accessToken)

        api.defaults.headers.common["Authorization"] =
          `Bearer ${res.data.accessToken}`

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        return api(originalRequest)

      } catch {

        localStorage.clear()
        window.location.href = "/login"

      }

    }

    return Promise.reject(error)
  }
)

export default api
